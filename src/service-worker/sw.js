
workbox.skipWaiting();
workbox.clientsClaim();

workbox.routing.registerRoute(
  new RegExp('.*\.js'),
  workbox.strategies.networkFirst(),
);

workbox.routing.registerRoute(
  new RegExp('.*\.css'),
  workbox.strategies.networkFirst(),
);

workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

