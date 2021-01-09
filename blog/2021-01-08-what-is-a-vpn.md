---
slug: what-is-a-vpn
title: What is a VPN
description: VPN stands for Virtual Private Network...
author: Julian Tellez
author_title: Software Engineer
author_url: https://juliantellez.com/
author_image_url: https://avatars3.githubusercontent.com/u/4896851?s=460&u=dbdb682f65762bc117c0b6b330a6942798d80205&v=4
tags: [VPN]
---

[VPN](https://en.wikipedia.org/wiki/Virtual_private_network) stands for Virtual Private Network. From a very high level, a network is simply 
a group of computers (commonly referred as nodes) that share resources, such as
pictures, media, data, etc. These networks are said to be private when no external
nodes have access to its resources.

<!--truncate-->

You can create a small network at home by connecting two computers to each other
with say, an ethernet cable. In fact, you can connect as many nodes as you like;
you will need a [network switch](https://en.wikipedia.org/wiki/Network_switch)
and a lot of patience. It's quiet fun! provided you don't mind thousands of cables 
lying around the house.

<Section
    img={{
        src: "https://i.pinimg.com/564x/1f/ea/3f/1fea3fe85bfd92a096d812595112eddb.jpg",
        alt: "network"
    }}
    caption="From pinterest.co.uk"
/>

As you can imagine, having every node hard-wired to its peers alone just doesn't scale.
What happens when you run out of room? what if you would like to connect thousands,
millions or even billions of nodes? How about making their resources accessible in
different locations? To overcome this problem, nodes connect to an specialised node
called a [router](https://en.wikipedia.org/wiki/Router_(computing)),
thanks [William 'Bill' Yeager](https://en.wikipedia.org/wiki/William_Yeager)! 🚀

Since routers are nodes themselves, they can connect smaller networks; allowing
the parent network to scale infinitely. Sounds familiar? This is a very simplified
version of how the [internet](https://en.wikipedia.org/wiki/Internet) works.

<Section
    img={{
        src: "https://mdn.mozillademos.org/files/8449/internet-schema-5.png",
        alt: "routers"
    }}
    caption="From developer.mozilla.org"
/>

When your computer connects to the internet, it becomes accessible on the network.
In order to retrieve and send information on the web, it has to go through many routers
and the information flowing back and forth isn't guaranteed to be private.
The internet is an untrusted network, of course safety measures have been placed,
such as [SSL](https://en.wikipedia.org/wiki/Transport_Layer_Security); However the internet
isn't trusted because of its network architecture, but because of its users.

So we know that for networks to be private, no external nodes should have access
to its resources. But what about the word virtual? what are we referring to?
Well, a virtual network is a sub network of geographically unrelated nodes;
connected through the parent network, such as the internet. It simply means that
these nodes aren't connected physically.

We now know what it means to be Virtual, to be Private and what a Network is.

<Section
    img={{
        src: "https://media.giphy.com/media/pNpONEEg3pLIQ/giphy.gif",
        alt: "yes!"
    }}
    caption="From giphy.com"
/>


## Links

- [VPN](https://en.wikipedia.org/wiki/Virtual_private_network)
- [Network switch](https://en.wikipedia.org/wiki/Network_switch)
- [Router](https://en.wikipedia.org/wiki/Router_(computing))
- [William 'Bill' Yeager](https://en.wikipedia.org/wiki/William_Yeager)
- [Internet](https://en.wikipedia.org/wiki/Internet)
- [SSL](https://en.wikipedia.org/wiki/Transport_Layer_Security)


export const Section = (props) => (
<section align="center">
  <img
    width="300"
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
