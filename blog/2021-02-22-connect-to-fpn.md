---
slug: fpn-mvp
title: MVP
description: MVP description
author: Julian Tellez
author_title: Software Engineer
author_url: https://juliantellez.com/
author_image_url: https://avatars3.githubusercontent.com/u/4896851?s=460&u=dbdb682f65762bc117c0b6b330a6942798d80205&v=4
tags: [VPN, MVP]
---

MVP stands for Minimum Viable Product. The goal is to **publish** a lean version of the product in order to establish a conversation with you, the customer, **as early as possible**.

[Freemiumpn](https://freemiumpn.com)'s MVP is no exception. It is only by exposing our ideas that we can assess their desirability and gain knowledge of what might be expected in the near future. Communication is key, we are actively listening and adapting based on your feedback 🔥 

<!--truncate-->

## What features does this MVP include?

This MVP showcases a [Libre](https://en.wikipedia.org/wiki/Free_software) version for all, with an installation process that takes under a minute!

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


## Showcase

<section
     style={{
        position: "relative",
        paddingBottom: "56.25%",
        height: "0",
    }}
>
<iframe
    style={{
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
    }}
    src="https://www.youtube.com/embed/WA5opJh7ZZ0"
    frameborder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    />
</section>

## What's next?

We have a rough road map and are constantly adding new features. However, they are not set in stone and we will allow the collected feedback to shape the future of FPN.

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
