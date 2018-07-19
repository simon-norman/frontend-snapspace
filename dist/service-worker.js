importScripts("/precache-manifest.34fe43b00863545e5c877b3cff64e9de.js", "https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js");

import workbox from 'workbox-sw';

workbox.routing.registerRoute(
  new RegExp('/index.html'),
  workbox.strategies.networkFirst(),
);

