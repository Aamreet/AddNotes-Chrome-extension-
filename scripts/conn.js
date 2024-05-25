function connectToDb() {
    const openDB = indexedDB.open('myDatabase', 1);
    openDB.onupgradeneeded = function (event) {
        const db = event.target.result;
        const objectStore = db.createObjectStore('data', { keyPath: 'title' });
    };
    return openDB;
}

export {connectToDb};