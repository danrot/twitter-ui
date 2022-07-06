import {manifest, version} from "@parcel/service-worker";

const ASSETS_CACHE_PREFIX = "twitter-ui-assets";
const ASSETS_CACHE_NAME = `${ASSETS_CACHE_PREFIX}-${version}`;
const DATA_CACHE_NAME = "twitter-ui-data";

const ASSET_URLS = ["/", ...manifest];

self.addEventListener("install", function(event) {
	// @ts-ignore
	event.waitUntil(
		caches.open(ASSETS_CACHE_NAME)
			.then((cache) => cache.addAll(ASSET_URLS))
	);
});

self.addEventListener("activate", function(event) {
	// @ts-ignore
	event.waitUntil(async function() {
		const keys = await caches.keys();

		return Promise.all(keys.map((key) => {
			if (key.startsWith(ASSETS_CACHE_PREFIX) && key !== ASSETS_CACHE_NAME) {
				return caches.delete(key);
			}
		}));
	}());
});

self.addEventListener("fetch", function(event) {
	// @ts-ignore
	const {request} = event;

	const path = new URL(request.url).pathname;

	if (!ASSET_URLS.includes(path)) {
		return;
	}

	// @ts-ignore
	event.respondWith(caches.open(ASSETS_CACHE_NAME).then((cache) => cache.match(request)));
});

self.addEventListener("fetch", function(event) {
	// @ts-ignore
	const {request} = event;

	const path = new URL(request.url).pathname;

	if (path !== "/api/lists/list.json") {
		return;
	}

	// @ts-ignore
	event.respondWith((async function() {
		const cache = await caches.open(DATA_CACHE_NAME);
		const cachedResponse = await cache.match(request);

		if (cachedResponse) {
			return cachedResponse;
		}

		const response = await fetch(request);
		cache.put(request, response.clone());
		return response;
	})());
});
