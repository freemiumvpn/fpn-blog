---
slug: runtime-configs-with-webpack-and-docker
title: Runtime configs with webpack and docker
description: Runtime configs with webpack and docker
image: "https://miro.medium.com/max/3840/1*U-R58ahr5dtAvtSLGK2wXg.png"
author: Julian Tellez
author_title: Software Engineer
author_url: https://juliantellez.com/
author_image_url: https://avatars3.githubusercontent.com/u/4896851?s=460&u=dbdb682f65762bc117c0b6b330a6942798d80205&v=4
tags: ['webpack', 'docker', 'fe', 'web']
---

## Introduction

If you are looking for the BE solution [see part 2](/docs/developer/how-to/web/runtime-configs-with-webpack-and-docker-v2).

Following the [12 Factor apps](https://12factor.net/) methodology, we would like to configure anything that may vary between deploys separately. The goal si to be able to build one docker image that can be dynamically configured depending on the environment, such as dev, staging, prod, etc...

## The problem

If you are building your application with [react](https://reactjs.org/), bundling your assets with [webpack](https://webpack.js.org/) and provisioning deliverables with [docker](https://www.docker.com/); you will soon realise that the current approach dictates that your configurations are defined as constants. This is a violation of twelve-factor which specifies strict separation of configuration and code.

## The Current Approach

Environment variables are fed into webpack via the [Define Plugin](https://webpack.js.org/plugins/define-plugin/) which allows you to create constants at compile time.

```js
new webpack.DefinePlugin({
  // Definitions...
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
});
```

:::note
The [EnvironmentPlugin](https://webpack.js.org/plugins/environment-plugin) and the [DotenvPlugin](https://webpack.js.org/plugins/environment-plugin/#dotenvplugin) are built on top of Define Plugin
:::

## The solution

[Javascript](https://www.javascript.com/) is dynamic by nature, which means that nothing is stopping us from injecting these variables at runtime! The implementation would create a separate env file that would be created
dynamically when the server starts.

### HTML
```html
<!-- index.html -->
<!-- Runtime environment -->
<script src="/env.js"></script>
```

### ENV GENERATION

```typescript
// createEnvVars.ts
import dotenv from 'dotenv'

const parseEnv = (env: NodeJS.ProcessEnv, keys: string[]) => {
  return keys.reduce((current, nextKey) => {
    if (!env[nextKey]) {
      return current
    }

    return {
      ...current,
      [nextKey]: env[nextKey],
    }
  }, {})
}

const createEnvVars = (rootPath: string): string => {
  const envConfig =
    dotenv.config({
      path: `${rootPath}/.env`,
    }).parsed || {}

  const parsedEnv = parseEnv(process.env, Object.keys(envConfig))

  const env = JSON.stringify({
    ...envConfig,
    ...parsedEnv,
  })

  const buff = Buffer.from(env)
  const base64data = buff.toString('base64')

  return base64data
}

const createEnvFile = (envVars: string): string => `
/**
  This is an auto generated file!
*/
window.__ENV__ = "${envVars}"
`

export { createEnvFile, createEnvVars as default }

```

```typescript
// writeEnvFile.ts
import fs from 'fs'
import path from 'path'

import createEnvVars from './createEnvVars'
import { createEnvFile } from './createEnvVars'

const writeEnvFile = async (path: string): Promise<void> => {
  const envVars = createEnvVars(path)
  await fs.promises.writeFile(`${path}/env.js`, createEnvFile(envVars))
}

const PATH_ROOT = path.resolve(__dirname, '..')

writeEnvFile(PATH_ROOT)

```

### DEV SERVER
```js
// webpack.config.js
devServer: {
  before: (app): void => {
    app.get('/env.js', (_, resp) => {
      const envVars = createEnvVars(paths.root)
      resp.send(createEnvFile(envVars))
    })
  },
}
```

### APP
```typescript
// env.ts

/***
 * Attempts to retrieve env variables from process.env
 * or injected as a base64 argument in the window
 */
const parseEnv = (): Record<EnvKey, string> => {
  let injectedEnv = {}
  try {
    injectedEnv = JSON.parse(window.atob((window as any).__ENV__))
  } catch (error) {
    console.log('Failed to parse env vars')
  }

  /**
   * Setting a reference allows us to use
   * runtime variables by circumventing
   * Webpack's DefinePlugin
   */
  const processEnv = process['env']

  return {
    ...processEnv,
    ...injectedEnv,
  } as Record<EnvKey, string>
}
```

### INIT HELPER

```bash
# init.sh
#!/bins/sh

#
# This init file is used by docker
# in order to dynamically inject variables
#

node build/writeEnvFile.js
mv env.js dist/env.js

```

### DOCKERFILE

```bash
FROM node:12-alpine AS STAGE_BUILD
RUN apk --no-cache add git

WORKDIR /work_dir/

ADD package*.json /work_dir/

RUN npm ci

ADD . /work_dir/

RUN npm run lint
RUN npm test

ENV NODE_ENV production

RUN npm run build
RUN npm run build:server
RUN npm run test:bundlesize

FROM node:12-alpine AS STAGE_SERVE

WORKDIR /work_dir/

ENV NODE_ENV production

ADD package*.json /work_dir/

RUN npm ci --production &&  npm cache clean -f

COPY --from=STAGE_BUILD /work_dir/dist /work_dir/dist
COPY --from=STAGE_BUILD /work_dir/build /work_dir/build

# Dynamic Env injection
COPY --from=STAGE_BUILD /work_dir/.env /work_dir/.env
COPY --from=STAGE_BUILD /work_dir/init.sh /work_dir/init.sh
RUN chmod +x ./init.sh

CMD [ "/bin/sh", "-c", "./init.sh && node build/server.js" ]
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
        src: "https://media.giphy.com/media/yow6i0Zmp7G24/giphy.gif",
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

