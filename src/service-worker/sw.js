import workbox from 'workbox-sw';

workbox.routing.registerRoute(
  new RegExp('/index.html'),
  workbox.strategies.networkFirst(),
);
