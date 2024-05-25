export function handleSubmit(db) {
    let body = document.querySelector('#value');
    let head = document.querySelector('#key');
    const transaction = db.transaction(['data'], 'readwrite');
    const objectStore = transaction.objectStore('data');
    let title = head.value;
    let value = body.value;
    const request = objectStore.put({ title: title, value: value });
    request.onsuccess = function (event) {
        console.log('Data added to IndexedDB');
    };
    request.onerror = function (event) {
        console.error('Error adding data to IndexedDB');
    };
    head.value = "";
    body.value = "";
}