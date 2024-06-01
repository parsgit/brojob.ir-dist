importScripts('/workbox/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
//   workbox.core.skipWaitingWithReply('precache');
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

workbox.routing.registerRoute(
  'https://brojob.ir',
  workbox.strategies.staleWhileRevalidate()
)

workbox.routing.registerRoute(
  /\.(?:js|css|html|woff2|ico|ttf)$/,
  workbox.strategies.networkFirst(),
)
// workbox.routing.registerRoute(
//   'http://localhost:3000',
// //   workbox.strategies.networkFirst()
//   workbox.strategies.staleWhileRevalidate()
// )

// workbox.routing.registerRoute(
//   new RegExp('https://randomuser.me/api'),
//   workbox.strategies.staleWhileRevalidate()
// )

/*
workbox.routing.registerRoute(
  new RegExp('https://randomuser.me/api'),
  workbox.strategies.cacheFirst()
)
*/