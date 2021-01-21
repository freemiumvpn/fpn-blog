---
slug: runtime-configs-with-webpack-and-docker-v2
title: Runtime configs with webpack and docker v2
description: Runtime configs with webpack and docker v2
image: "https://miro.medium.com/max/3840/1*U-R58ahr5dtAvtSLGK2wXg.png"
author: Julian Tellez
author_title: Software Engineer
author_url: https://juliantellez.com/
author_image_url: https://avatars3.githubusercontent.com/u/4896851?s=460&u=dbdb682f65762bc117c0b6b330a6942798d80205&v=4
tags: ['webpack', 'docker', 'be', 'web', 'nodejs']
---

## Introduction

If you are looking for the FE solution and a description of the problem [see part 1](/docs/developer/how-to/web/runtime-configs-with-webpack-and-docker).

Configurations should be provided at runtime, and there should be a clear separation of configuration at code, as prescribed by the [12 factor app guideline](https://12factor.net/).


## The problem

If you are looking at bundling your BE with webpack, the current approach dictates that your configurations are defined as constants, and inside your bundle.
Since webpack creates and isolated scope; user environments through [process.env](https://nodejs.org/dist/latest-v8.x/docs/api/process.html#process_process_env) become inaccessible.



## The Solution

Make process.env available through webpack externals.


```javascript
// webpack.config.js
const config = {
  externals: [{ processEnv: 'process.env' }, nodeExternals({})],
}
```

The line above tells webpack that there is a dependency called processEnv and should be resolved by referencing `process.env`. It outputs a small commonjs module.

```javascript
// WEBPACK'S BUILD
/***/ "processEnv":
/*!******************************!*\
  !*** external "process.env" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = process.env;

/***/ }),
```

In your code, you can then require this shim by doing.

```javascript
const processEnv = require('processEnv')
```

## Conclusion

You can now dynamically add variables to your builds. Making them fit for any environment!

```bash
docker run -p 3000:3000 -e MY_VAR=xxx app:latest
```

## Gotchas
- Please, please, please do not include authentication credentials or secrets in your `.env` configs!

<br />

<Section
    img={{
        src: "https://media.giphy.com/media/hj8eOHrXqoLntsCyWz/giphy.gif",
        alt: "secret"
    }}
    caption="From giphy.com"
/>


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

