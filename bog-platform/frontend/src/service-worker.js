/* eslint-disable no-restricted-globals */
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

precacheAndRoute(self.__WB_MANIFEST || []);

registerRoute(
  ({ request }) => request.destination === 'document',
  new StaleWhileRevalidate()
);

self.addEventListener('push', (event) => {
  const data = event.data?.json();
  if (!data) return;
  event.waitUntil(
    self.registration.showNotification(data.title || 'B.O.G Update', {
      body: data.body,
      icon: '/public/icons/icon-192x192.png',
      data: data.url ? { url: data.url } : undefined
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || '/';
  event.waitUntil(clients.openWindow(targetUrl));
});
