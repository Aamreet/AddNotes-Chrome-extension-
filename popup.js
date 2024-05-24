document.addEventListener('DOMContentLoaded', function () {
    console.log("popup loaded");

    let body = document.querySelector('#value');
    let head = document.querySelector('#key');
    let saveButton = document.querySelector('#save');

    // Open connection to IndexedDB database
    const openDB = indexedDB.open('myDatabase', 1);

    // Handle database upgrade (create object store)
    openDB.onupgradeneeded = function(event) {
        const db = event.target.result;
        const objectStore = db.createObjectStore('data', { keyPath: 'title' });
    };

    // Handle successful database opening
    openDB.onsuccess = function(event) {
        const db = event.target.result;

        const handleSubmit = () => {
            // Retrieve the transaction and object store
            const transaction = db.transaction(['data'], 'readwrite');
            const objectStore = transaction.objectStore('data');

            let title = head.value;
            let value = body.value;

            // Add data to the object store
            const request = objectStore.put({ title: title, value: value });

            // Handle successful addition of data
            request.onsuccess = function(event) {
                console.log('Data added to IndexedDB');
            };

            // Handle errors
            request.onerror = function(event) {
                console.error('Error adding data to IndexedDB');
            };

            head.value = "";
            body.value = "";
        };

        saveButton.addEventListener("click", handleSubmit);
    };

    // Handle database opening error
    openDB.onerror = function(event) {
        console.error('Error opening IndexedDB');
    };
});
