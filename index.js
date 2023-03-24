if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        fetch("./service-worker.js", {headers: new Headers({"Content-Type": "application/javascript"})}).then(response => {
            console.log(response.headers.get("Content-Type"));
            navigator.serviceWorker.register(response).then(function (registration) {
                console.log('Service worker registered:', registration);
            }, function (error) {
                console.log('Service worker registration failed:', error);
            });
        })
    });
}
