// Service Worker - Handles messages and lifecycle events

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  // Send a response back to prevent "message channel closed" error
  if (event.ports && event.ports[0]) {
    event.ports[0].postMessage({ success: true });
  }
});

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});
