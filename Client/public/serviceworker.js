// var staticCacheName = "pwa";
// const assets_to_cache = [
//   "/",
//   "manifest.json",
//   "src/index.js",
//   "/favicon.ico",
//   "src/index.css",
// ];

// self.addEventListener("install", function (e) {
//   e.waitUntil(
//     caches.open(staticCacheName).then(function (cache) {
//       return cache.addAll(assets_to_cache);
//     })
//   );
// });

// self.addEventListener("fetch", function (event) {
//   event.respondWith(
//     checkResponse(event.request).catch(function () {
//       return returnFromCache(event.request);
//     })
//   );
//   event.waitUntil(addToCache(event.request));
// });

// var checkResponse = function (request) {
//   return new Promise(function (fulfill, reject) {
//     fetch(request).then(function (response) {
//       if (response.status !== 404) {
//         fulfill(response);
//       } else {
//         reject();
//       }
//     }, reject);
//   });
// };

// var addToCache = function (request) {
//   return caches.open(staticCacheName).then(function (cache) {
//     return fetch(request).then(function (response) {
//       return cache.put(request, response);
//     });
//   });
// };

// var returnFromCache = function (request) {
//   return caches.open(staticCacheName).then(function (cache) {
//     return cache.match(request).then(function (matching) {
//       if (!matching || matching.status == 404) {
//         return cache.match("pwa.html");
//       } else {
//         return matching;
//       }
//     });
//   });
// };


self.addEventListener("install", function (event) {
  event.waitUntil(preLoad());
});

var filesToCache = ["/", "/menu", "/contactUs", "/offline.html"];
// var filesToCache = ["/"];

var preLoad = async function () {
  const cache = await caches.open("offline");
  return await cache.addAll(filesToCache);
};

self.addEventListener("fetch", function (event) {
  event.respondWith(
    checkResponse(event.request).catch(function () {
      console.log("Fetch from cache successfull");
      return returnFromCache(event.request);
    })
  );
  console.log("Fetch successful");
  event.waitUntil(addToCache(event.request));
});

var checkResponse = function (request) {
  return new Promise(function (fulfill, reject) {
    fetch(request).then(function (response) {
      if (response.status !== 404) {
        fulfill(response);
      } else {
        reject();
      }
    }, reject);
  });
};

var addToCache = async function (request) {
  const cache = await caches.open("offline");
  const response = await fetch(request);
  return await cache.put(request, response);
};

var returnFromCache = async function (request) {
  const cache = await caches.open("offline");
  const matching = await cache.match(request);
  if (!matching || matching.status == 404) {
    return cache.match("offline.html");
  } else {
    return matching;
  }
};

self.addEventListener("sync", (e) => {
  console.log(e.tag);
  if (e.tag == "helloSync") {
    console.log("Sync successful");
  }
});

self.addEventListener("push", (e) => {
  // console.log(e.data);
  if (e && e.data) {
    const data = e.data.json();
    // console.log(data);
    // console.log(data.method);
    if (data.method === "pushMessage") {
      console.log("push notification");
      e.waitUntil(
        self.registration.showNotification("Welcome to Chill-Pill!", {
          body: "Hey, there make your first medical item purchase.",
        })
      );
    }
  }
});