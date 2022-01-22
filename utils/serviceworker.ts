// While developing, you can use this url to send test push notifications and
// generate public and private key pairs:
// https://web-push-codelab.glitch.me/

import { getLogger } from "./logging";

let isSubscribed = false;
let swRegistration = null;
const logger = getLogger("ServiceWorker")


function urlB64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}


export async function register(): Promise<boolean> {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
        logger.warn('Push messaging is not supported');
        return false
    }
    if(swRegistration) return true
    try {
        swRegistration = await navigator.serviceWorker.register('/service-worker.js')
    } catch (e) {
        logger.error("Error registering service worker", e)
    }
}

export async function enablePushNotifications(): Promise<boolean> {
    const registered = await register()
    if(!registered) return false
    if(isSubscribed) return true

    const applicationServerKey = urlB64ToUint8Array(process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIK_KEY);
    try {
        const subscription = await swRegistration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: applicationServerKey
        })
        isSubscribed = true;
        await pushSubscriptionToServer(subscription);
        return true
    } catch (e) {
        logger.error("Error subscribing user", e)
        return false
    }
}

async function pushSubscriptionToServer(subscription: any) {
    //TODO: send notification subscription to backend
    console.log(JSON.stringify(subscription))
}
