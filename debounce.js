const debounce = (func, delay) => {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func(...args);
            }, delay );
    }
}

const search = (searchTerm) => {
    console.log("Searching for", searchTerm);
}

const debouncedSearch = debounce(search, 1000);

debouncedSearch("Hello");
debouncedSearch("Hello");