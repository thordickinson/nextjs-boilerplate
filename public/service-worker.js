var appCacheFiles = [],
  // The name of the Cache Storage
  appCache = "aws-amplify-v1";

/**
 * The install event is fired when the service worker
 * is installed.
 * https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
 */
addEventListener("install", (event) => {
  console.log("[Service Worker] Install Event", event);
  event.waitUntil(
    caches.open(appCache).then(function (cache) {
      return cache.addAll(appCacheFiles);
    })
  );
});

/**
 * The activate vent is fired when the  service worker is activated
 * and added to the home screen.
 * https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
 */
addEventListener("activate", (event) => {
  console.log("[Service Worker] Activate Event ", event);
});

/**
 * The fetch event is fired for every network request. It is also dependent
 * on the scope of which your service worker was registered.
 * https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
 */
addEventListener("fetch", function (event) {
  //return fetch(event.request);
  //console.log('[Service Worker] Fetch: ', event);
  let url = new URL(event.request.url);
  //url.pathname
  event.respondWith(
    caches.match(event.request).then(function (resp) {
      return (
        resp ||
        fetch(event.request).then(function (response) {
          return caches.open(appCache).then(function (cache) {
            if (event.request.method === "GET") {
              cache.put(event.request, response.clone());
            }
            return response;
          });
        })
      );
    })
  );
});
/**
 * The message will receive messages sent from the application.
 * This can be useful for updating a service worker or messaging
 * other clients (browser restrictions currently exist)
 * https://developer.mozilla.org/en-US/docs/Web/API/Client/postMessage
 */
addEventListener("message", (event) => {
  console.log("[Service Worker] Message Event: ", event.data);
});

/**
 * Listen for incoming Push events
 */
addEventListener("push", (event) => {
  if (!(self.Notification && self.Notification.permission === "granted"))
    return;
  console.log(event.data);
  if (!event.data) return;
  let title = event.data.text();
  let options = {};
  try {
    const data = event.data.json();
    title = data.title || title;
    options = data.options || options;
  } catch (e) {
    console.error("Error parsing notification data", e);
  }
  event.waitUntil(self.registration.showNotification(title, options));
});

/**
 * If action starts with "open:" string, will look for a named link under
 * notification.data.links property and will open it
 * @param {string} action
 * @param {Nofication} notification
 */
function handleOpenLink(event) {
  const { action, notification } = event;
  const { data } = notification;
  const linkKey = action.substring("open:".length);
  if (data && data.links && data.links[linkKey]) {
    event.waitUntil(clients.openWindow(data.links[linkKey]));
  } else {
    console.error(
      `No link with key ${linkKey} found under notification.data.links property`
    );
  }
}

/**
 * Handle a notification click
 */
addEventListener("notificationclick", (event) => {
  console.log("[Service Worker] Notification click: ", event);
  const { action, notification } = event;
  if (action.startsWith("open:")) {
    handleOpenLink(event);
  }
  event.notification.close();
});
