---
slug: tcp-load-balancer-with-nginx
title: TCP load balancer with nginx
description: TCP load balancer with nginx
image: "https://miro.medium.com/max/3840/1*U-R58ahr5dtAvtSLGK2wXg.png"
author: Julian Tellez
author_title: Software Engineer
author_url: https://juliantellez.com/
author_image_url: https://avatars3.githubusercontent.com/u/4896851?s=460&u=dbdb682f65762bc117c0b6b330a6942798d80205&v=4
tags: ['tcp', 'load balancer', 'nginx', 'terraform', 'k8s', 'kubernetes']
---

<Section
    img={{
        src: "/img/docs/lb-architecture.png",
        alt: "secret"
    }}
    width="600"
    caption="Basic Load Balancer architecture"
/>

## Introduction

There are various ways one can scale out application servers horizontally, if you are using kubernetes, for example, then horizontal replication is abstracted away in the form of deployments.
Once your replicas are in place, the next step would be to make the application available to the world, this is typically done by exposing a load balancer with an static IP.

:::note
Scaling out it better than up!

**Scaling up**: add more "power" to the existing "machine"

**Scaling out**: add more "machines" to the existing network
:::

## The Problem
Outsourcing load balancers (LBs) is generally the right choice, not only they are resilient and robust but also very safe and secure!
However they come at a cost, and by cost I mean some substantial investment.
if your application isn't delivering rich media or your throughput (both ingress and egress) is low, then outsource the LB to a vendor. if on the other hand,
you are planning for delivering Terabytes and more then you are looking at owning
a built in LB vs spending thousands a month.

As a reference:
 - Streaming a video of OK quality on your phone averages at 320 Kbs/s
 - An episode of a series is around 45 mins
    ```
        (320Kbs * 60seconds * 45minutes) = 864000 Kbs = 864 Mbs
    ```
 - A thousand users streaming said episode (either in parallel or concurrently)
    ```
        (864Mbs * 1000users) = 864000Mbs = 864Gbs
    ```
 - Same users watching at least 3 episodes a day over the course of a month

    ```
        864Gbs * 28days * 3episodes = 72576 Gbs
    ```

### GCP pricing example
<Section
    img={{
        src: "/img/docs/lb-pricing-gcp.png",
        alt: "secret"
    }}
    width="600"
    caption="Basic Load Balancer architecture"
/>

### AWS pricing example
<Section
    img={{
        src: "/img/docs/lb-pricing-aws.png",
        alt: "secret"
    }}
    width="1000"
    caption="Basic Load Balancer architecture"
/>


## The solution
Since we have decided not to outsource a load balancer solution, the next logical
step is to look for open source solutions, enter [Nginx](https://www.nginx.com/).
Nginx is well known as a high‑performance load balancer, cache, and web server, powering over 40% of the busiest websites.

:::note
Nginx leverages the [event loop pattern](https://en.wikipedia.org/wiki/Event_loop) to create a non-blocking I/O

Other examples of event loops in the wild are 
Chromium: [Libevent](https://libevent.org/),
NodeJS: [Libuv](http://docs.libuv.org/en/v1.x/design.html) and
Python: [Event loop](https://docs.python.org/3/library/asyncio-eventloop.html).
:::


## Show me the code

This how to will use:
 - gcp as a cloud provider
 - terraform for resource provisioning
 - kubernetes for application and container provisioning

### Provision a virtual machine

```bash
resource "google_compute_instance" "load-balancer" {
  project        = google_project.k8s_project.project_id
  zone           = var.gcp_zone_backup
  name           = "${var.namespace}-load-balancer"
  machine_type   = "e2-micro"
  description    = "k8s load balancer node"
  can_ip_forward = true

  boot_disk {
    auto_delete = true
    mode        = "READ_WRITE"
    initialize_params {
      image = "ubuntu-2004-focal-v20201211"
      size  = 50
    }
  }

  network_interface {
    network = "default"

    access_config {
      network_tier = "STANDARD"
    }
  }

  service_account {
    scopes = [
      "compute-rw",
      "storage-ro",
      "logging-write",
      "monitoring",
    ]
  }

  tags = [
    "${var.namespace}-load-balancer"
  ]
}
```

### Provision a firewall to grant external access 

```bash
resource "google_compute_firewall" "load-balancer" {
  name        = "${var.namespace}-load-balancer"
  description = "load balancer firewall"
  project     = google_project.k8s_project.project_id
  network     = "default"

  allow {
    protocol = "tcp"
    ports    = ["443"]
  }

  direction     = "INGRESS"
  source_ranges = ["0.0.0.0/0"]
  target_tags = [
    google_compute_instance.load-balancer.name
  ]
}
```

Apply the resources `terraform apply` and wait a few minutes for the instance to be up. I'll be back in a few minutes too :)

<Section
    img={{
        src: "https://media.giphy.com/media/xThtakPUrqAuOeqVZ6/giphy.gif",
        alt: "coffee"
    }}
    width="300"
    caption="Coffee Time!"
/>

## Install Nginx
The following is a manual installation, please automate this step.
I am still thinking about a nice way to automate this dynamic configuration.

1. ssh into the box
```bash
gcloud compute ssh xx-load-balancer
```

2. nginx
```bash
sudo apt-get update
sudo apt-get install nginx
sudo systemctl restart nginx
```

3. configure the as a load balancer
```bash
sudo nano /etc/nginx/conf.d/load-balancer.conf
______

stream {
  upstream upstream_backend {
      server x.x.x.x:30343;
      server x.x.x.x:30343;
      server x.x.x.x:30343;
   }

    server {
        listen 443;
        proxy_pass upstream_backend;
    }
}
```

4. Move conf.d to a top level directive

As you can see from the balancer configuration we are using the stream directive
to forward at a TCP level. nginx is configured to work on http by default
so we would need to move up our configuration one level.

```bash
sudo nano nginx.conf
----

+ include /etc/nginx/conf.d/*.conf;

http {
- include /etc/nginx/conf.d/*.conf;
}
```

5. restart nginx

```bash
sudo systemctl restart nginx
```

## Make kubernetes services discoverable to the load balancer

```yaml
apiVersion: v1
kind: Service
metadata:
  name: &service service
  labels:
    app: *service
    namespace: namespace

spec:
  selector:
    app: app
    purpose: namespace
  type: NodePort
  ports:
    - name: service-socket
      port: 443
      nodePort: 30343
      protocol: TCP
```

And Bob's your uncle! 🎉 🎉 

## FAQ
- Is it secure?
we are only exposing the load balancer IP to the internet, and only secure connections (SSL) are allowed.

- Does it scale?
Auto scaling the application is delegated to kubernetes, our load balancer
could become a single point of failure, but such is the case with all load balancers. I will be releasing metrics on the performance of nginx as a load balancer at some point too.

- what's next?
  - [Tune for performance](https://www.nginx.com/blog/tuning-nginx/)
  - [TCP health checks](https://docs.nginx.com/nginx/admin-guide/load-balancer/tcp-health-check/)
  - [Logging](https://www.nginx.com/blog/logging-upstream-nginx-traffic-cdn77/)


## Conclusion

Its all about tradeoffs. Understand your I/O before owning
another in house solution, outsourcing its usually the right choice!


export const Section = (props) => (
<section align="center">
  <img
    width={props.width}
    {...props.img}
    />
  <p align="center" style={
      {
          fontSize: "10px",
          color: "gray"
      }
  }>
    {props.caption}
  </p>
</section>
)
