if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register(`https://raw.githubusercontent.com/herik-silva/agrofin/gh-pages/service-worker.js`).then(function (registration) {
            console.log('Service worker registered:', registration);
        }, function (error) {
            console.log('Service worker registration failed:', error);
        });
    });
}
