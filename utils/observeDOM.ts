import noob from "_utils/noob";

export const observeDOM = (() => {
    if (process.env.BROWSER) {
        const MutationObserver: any = (window as any).MutationObserver || (window as any).WebKitMutationObserver;
        const eventListenerSupported: any = window.addEventListener;

        return (obj: HTMLElement, callback: () => void) => {
            if (MutationObserver) {
                // define a new observer
                const obs = new MutationObserver((mutations: any[]) => {
                    if (mutations[0].addedNodes.length || mutations[0].removedNodes.length) {
                        callback();
                    }
                });
                // have the observer observe foo for changes in children
                obs.observe(obj, {childList: true, subtree: true});
            } else if (eventListenerSupported) {
                obj.addEventListener("DOMNodeInserted", callback, false);
                obj.addEventListener("DOMNodeRemoved", callback, false);
            }
        };
    } else {
        return noob;
    }
})();

export default observeDOM;
