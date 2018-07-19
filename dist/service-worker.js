importScripts("/precache-manifest.1506c2b0226a0e4d2b8e2d5101c32c80.js", "/workbox-v3.4.1/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "/workbox-v3.4.1"});

workbox.skipWaiting();
workbox.clientsClaim();

workbox.routing.registerRoute(
  new RegExp('.*\.js'),
  workbox.strategies.networkFirst(),
);

workbox.precaching.precacheAndRoute(self.__precacheManifest || []);


