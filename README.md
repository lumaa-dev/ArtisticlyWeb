# Artisticly Web
![Vue Badge](https://img.shields.io/badge/built_with-vue.js-brightgreen?style=for-the-badge)
![PWA Badge](https://img.shields.io/badge/compatible-PWA-blue?style=for-the-badge)\
Discover anyone's [Artisticly library](https://github.com/lumaa-dev/ArtisticlyServer) via the web, on your phone or on a computer.

## How it works
When you first arrive on the website, you will be directly redirect to `/settings` with a server URL and an access code. Once entered, press **Update**.

If the entered server is an online [Artisticly server](https://github.com/lumaa-dev/ArtisticlyServer), the button should say **Updated**. Now you can tap/click back on the Artisticly logo in the top left, and the song library should appear!

There is also an alternative way of doing so, that is quicker and used by the [*default Artisticly app*](https://apps.lumaa.fr/app/artisticly)<sup>1</sup>, that is to send the root URL with the query `url`, that would be like so: `https://example.com/?url=https://artisticly.example.com/`, and if needed, there is also a `code` query to provide anyone a default access code.\
If the URL isn't an Artisticly server, users will be redirected in the `/settings` page.

*<sup>1</sup> This is an upcoming feature.*

## Vue.JS instructions
### Project setup
```bash
npm install
```

#### Compiles and hot-reloads for development
```bash
npm run serve
```

#### Compiles and minifies for production
```bash
npm run build
```