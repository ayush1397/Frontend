function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastCall < delay) {
            return;
        }
        lastCall = now;
        func(...args);
    }
}

function search(searchTerm) {
    console.log("Searching for", searchTerm);
}

const throttledSearch = throttle(search, 1000);

throttledSearch("Hello");
throttledSearch("Hello");