---
slug: who-needs-a-vpn-anyway
title: Who needs a VPN anyway?
description: MVP description
author: Julian Tellez
author_title: Software Engineer
author_url: https://juliantellez.com/
author_image_url: https://avatars3.githubusercontent.com/u/4896851?s=460&u=dbdb682f65762bc117c0b6b330a6942798d80205&v=4
tags: [VPN]
---

As [previously](https://blog.freemiumpn.com/posts/what-is-a-vpn) discussed; the internet
is a collection of interconnected computers, commonly referred as nodes.
When your computer requests data the sender must dispatch it (over the wire) through many
intermediate nodes until it reaches you. This strategy for dispatching data is commonly referred as the [store and forward model](https://en.wikipedia.org/wiki/Store_and_forward). But how do all these intermediate nodes know where to redirect the data so it gets to you?
Well, there are a [few rules to this game](https://en.wikipedia.org/wiki/Internet_Protocol).

<!--truncate-->

<Section
    img={{
        src: "https://user-images.githubusercontent.com/4896851/113768422-be703a00-9717-11eb-9e0a-8c36a6d8d607.gif",
        alt: "Store and forward model"
    }}
    width="500"
    caption="From wikipedia.com"
/>


There is a limit to how big the sent data can be, this is because there's an actual physical limit
which is why an optimal size has been established. To overcome this limitation, data is split into
smaller packets. Each packet or [IP Packet](https://en.wikipedia.org/wiki/IP_packet) contains a source
and a destination address. Sounds familiar? This is how a postal service may implement their dispatching model.

The relay between sender to receiver may involve several intermediate nodes,
where each node will inspect the packet and forward it closer to its final destination. When the requested data
finally arrives to you it has been inspected by many different nodes.

But why should we care about middlemen glancing over our data? As we mentioned in our [previous article](https://blog.freemiumpn.com/posts/what-is-a-vpn);
The internet isn't trusted because of its architecture, but because of its users.
Allowing third parties to inspect even just the route of your data can have several ripple effects:

- **Gain commercial advantage**. If a third party or ISP is affiliated to a certain vendor and you purchase from
  its competitor, said party may slow down ('throttle') or even block access to it.
  Since your overall experience with the vendor was poor, next time you purchase the same or similar item you will consider its competitor.

- **Build a commercial profile**. By analysing your data, a third party may build a profile of your preferences,
  correlate them with your local peers and sell the findings to a vendor.
  Ever wondered why everybody gets the same kind of adverts in the same area?

- **Censoring Information** A third party could have an affinity for a certain topic and could therefore
  block access to the opposition.

Small misdirections such as throttling would ultimately change your behaviour.
I will leave you with this reflection: 20% of the causes are responsible for 80% of the effects.
The law of the vital few or [Pareto Principle](https://en.wikipedia.org/wiki/Pareto_principle) can be traced down
to human behaviour in the form of habits. Allowing others to determine how you interact with the world
will ultimately change you, only you won't be able to notice.

There are other reasons to use a VPN, such as privacy (not secrecy) and net-neutrality.
I will be writing about them as they all deserve attention, until then. 👋

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
