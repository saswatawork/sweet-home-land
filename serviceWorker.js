const cacheName = "1.0.2";

const cacheAssets = [
    "./",
  //   "index.html",
  //   "assets/css/normalize.css",
  //   "assets/css/style.css",
  //   "assets/js/main.js",
  //   "assets/image/gallery/1.jpeg",
  //   "assets/image/gallery/2.jpeg",
  //   "assets/image/gallery/3.jpeg",
  //   "assets/image/gallery/4.jpeg",
  //   "assets/image/gallery/5.jpg",
  //   "assets/image/gallery/6.jpg",
  //   "assets/image/gallery/7.jpeg",
  //   "assets/image/gallery/8.jpg",
  //   "assets/image/news/1.jpg",
  //   "assets/image/news/2.jpg",
  //   "assets/image/news/3.jpg",
  //   "assets/image/news/4.jpg",
  //   "assets/image/projects/1.jpg",
  //   "assets/image/projects/2.jpg",
  //   "assets/image/projects/3.jpg",
  //   "assets/image/projects/4.jpg",
  //   "assets/image/projects/5.jpg",
  //   "assets/image/projects/6.jpg",
  //   "assets/image/logo.png",
  "assets/video/banner.mp4",
];

//install event
self.addEventListener("install", (e) => {
  console.log("Service worker: Installed");

  e.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        console.log("Service worker: Caching files");
        cache.addAll(cacheAssets);
      })
      .catch((err) => console.warn(`Service worker error: ${err}`))
      .then(() => self.skipWaiting())
  );
});

//activate event
self.addEventListener("activate", (e) => {
  console.log("Service worker: Activated");

  //remove unwanted caches
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      cacheNames.map((cache) => {
        if (cache != cacheName) {
          console.log(`Service worker: Clearing old caches`);
          return caches.delete(cache);
        }
      });
    })
  );
});

// cal fetch event
self.addEventListener("fetch", (e) => {
  console.log("Service worker: Fetching");

  e.respondWith(
    fetch(e.request)
      .then((res) => {
        // make a copy of respobe
        const resClone = res.clone();

        // open cache
        caches.open(cacheName).then((cache) => {
          // add response to cache
          resClone.status === "200" && cache.put(e.request, resClone);
        });
        return res;
      })
      .catch(() => caches.match(e.request).then((res) => res))
  );
});
