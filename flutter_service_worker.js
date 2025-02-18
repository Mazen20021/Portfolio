'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "a77feb9508e0e574727c5be2959fb625",
"assets/AssetManifest.bin.json": "e4eab5c779ff2b400a80fb27c693c440",
"assets/AssetManifest.json": "0ab397eef2d557c11d63a920effe1cbe",
"assets/assets/cubit.png": "32055111bac96b420390d192a627ecf8",
"assets/assets/dart.png": "1c7158d00dc6f30155d50cf0a534de21",
"assets/assets/desktop.png": "507553ed2ce8da79be41bd7cd74f6d09",
"assets/assets/desktopApplicaitons.png": "610fe475b1bbb63afc053c007e9f79e7",
"assets/assets/desktopblur.png": "cfbae0af128ce2f18f8412b4189a0bbd",
"assets/assets/firebase.png": "0106ae3a20baa50d8b9363f2f3e9cc0a",
"assets/assets/git.png": "042664999475fd8cc3672db6567e2e53",
"assets/assets/icons/fonts/CustomIcons.ttf": "5ec101c83e1adc3b20832c7410f847a4",
"assets/assets/icons/fonts/Talk.ttf": "b622f33edf0d871d04f6d5fd14a55ab5",
"assets/assets/mobApplicaitons.png": "db29a536db0b30e5d312e281cbc86ee1",
"assets/assets/mobprojects.png": "809694117c1660480caec9520bd889a6",
"assets/assets/mobprojectsblur.png": "3949d75133c9046a967f6a62d448982a",
"assets/assets/mypic.jpg": "a20c38ce8f4f765afdddb85917956aea",
"assets/assets/mypicblured.png": "2b6778567bfa0b8cc8664e5afa9f5f72",
"assets/assets/mysql.png": "1ffd33f27d90ff4a1338a44f9ca1d7b5",
"assets/assets/wallpaper.jpeg": "5531111baf9eac51d20b9ebe2708a74a",
"assets/assets/wallpaper1.jpg": "697d67b5428da352b806d46ddda19ae8",
"assets/assets/wallpaper1blur.png": "9408349089f86af87111cc04fbff3933",
"assets/assets/wallpaper2.jpeg": "fb5eef94c9457c0718f328833e059bcc",
"assets/assets/wallpaper2blur.png": "b3de058a0542e4428cd18053fb88dc65",
"assets/assets/wallpaper3.png": "fd7df52a9ee674aaab5ce8e22b2b46c3",
"assets/assets/wallpaper3blur.png": "223c5deea99185f637b65841e0dddaf6",
"assets/assets/wallpaper4.jpg": "3727fc2016879fdd22c0adb64c2b8164",
"assets/assets/wallpaper4blur.png": "55418ca1774c74ca96a251e5cb7cb2df",
"assets/assets/wallpaperblur.png": "4d098bf68d27ee383ebc3f5467e31f4d",
"assets/assets/webapp.png": "f7005a4fcc58f43c7e283cd6e5a462e0",
"assets/assets/webappblur.png": "8556165138c0d23233adf017c2788632",
"assets/assets/webApplicaitons.png": "d0da8f17d12759b03358391aebd30cfc",
"assets/FontManifest.json": "79711e17bc7d8a5f4c7b2b45407833d9",
"assets/fonts/MaterialIcons-Regular.otf": "c456302371e681ead201128e05cdd39b",
"assets/NOTICES": "9f131f61b30eab8169bd0740a7af039b",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "66177750aff65a66cb07bb44b8c6422b",
"canvaskit/canvaskit.js.symbols": "48c83a2ce573d9692e8d970e288d75f7",
"canvaskit/canvaskit.wasm": "1f237a213d7370cf95f443d896176460",
"canvaskit/chromium/canvaskit.js": "671c6b4f8fcc199dcc551c7bb125f239",
"canvaskit/chromium/canvaskit.js.symbols": "a012ed99ccba193cf96bb2643003f6fc",
"canvaskit/chromium/canvaskit.wasm": "b1ac05b29c127d86df4bcfbf50dd902a",
"canvaskit/skwasm.js": "694fda5704053957c2594de355805228",
"canvaskit/skwasm.js.symbols": "262f4827a1317abb59d71d6c587a93e2",
"canvaskit/skwasm.wasm": "9f0c0c02b82a910d12ce0543ec130e60",
"canvaskit/skwasm.worker.js": "89990e8c92bcb123999aa81f7e203b1c",
"favicon.ico": "f77a395c9edc439d6b130e7994c4faf2",
"flutter.js": "f393d3c16b631f36852323de8e583132",
"flutter_bootstrap.js": "590513629e25b342f93f2159c09bc817",
"index.html": "dfc890d01d238818072a7c1c74334626",
"/": "dfc890d01d238818072a7c1c74334626",
"main.dart.js": "8e994a9601bf250581440b78f460ed27",
"manifest.json": "eb856e0cb889aff81fd1c08cac6d4ec1",
"version.json": "faf3c261c468b10bd2ff1afc36609300"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
