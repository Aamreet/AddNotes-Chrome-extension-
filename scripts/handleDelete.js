import { handleShowData } from "./handleShowData.js";

export function handleDelete(db, key) {
    const transaction = db.transaction(["data"], "readwrite");
    const objectStore = transaction.objectStore("data");
    const request = objectStore.delete(key);

    request.onsuccess = function(event) {
        console.log(`Record with key ${key} deleted successfully.`);
        let showButton = document.querySelector('#show');
        if(showButton.innerText === "Close"){
            showButton.innerText= "Show";
            handleShowData(db);
        }
    };

    request.onerror = function(event) {
        console.error('Error deleting record:', event);
    };
}
