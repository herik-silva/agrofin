if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register(`/agrofin/service-worker.js`).then(function (registration) {
            console.log('Service worker registered:', registration);
        }, function (error) {
            console.log('Service worker registration failed:', error);
        });
    });

    var deferredPrompt; // Allows to show the install prompt

    window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
        // Stash the event so it can be triggered later.
        console.log(e.type)
        deferredPrompt = e;
        console.log("beforeinstallprompt fired");
    });
}

