---
slug: install-fpn
title: Install FPN
description: Install FPN
author: Julian Tellez
author_title: Software Engineer
author_url: https://juliantellez.com/
author_image_url: https://avatars3.githubusercontent.com/u/4896851?s=460&u=dbdb682f65762bc117c0b6b330a6942798d80205&v=4
tags: [VPN]
---

<iframe width="675" height="380" src="https://www.youtube.com/embed/WA5opJh7ZZ0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

A Video walkthrough of FPN connectivity https://freemiumpn.com

- Install Client: https://youtu.be/WA5opJh7ZZ0?t=5
- Download Configuration: https://youtu.be/WA5opJh7ZZ0?t=29
- Connect: https://youtu.be/WA5opJh7ZZ0?t=41


## What features does this VPN include?

This VPN showcases a [Libre](https://en.wikipedia.org/wiki/Free_software) version for all, with an installation process that takes under a minute!

<Section
    img={{
        src: "https://media.giphy.com/media/CggoHW4h87Ktq/giphy.gif",
        alt: "really?"
    }}
    caption="From giphy.com"
/>

This libre version additionally includes:
 - ⬇️ Download rate of 3Mbs/s
 - ⬆️ Upload rate of 1Mb/s
 - 🇨🇭 A distributed VPN Server, initially located in [Switzerland](https://en.wikipedia.org/wiki/Switzerland) 
 - Sing on with Google and/or Twitter, old fashioned email and password combinations are accepted too.

You can expect all the usual low-tier features that you may expect from a VPN provider
- 1 connection
- No Logs
- No Adds
- [AES encryption](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard) or Military grade encryption (this is a given, it is 2021 after all)

## Links:
- What is a VPN? https://blog.freemiumpn.com/posts/what-is-a-vpn


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
