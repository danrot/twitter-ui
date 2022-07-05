const DATA_CACHE_NAME = "twitter-ui-data";

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
