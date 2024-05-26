import { connectToDb } from "./conn.js";
import { handleSubmit } from "./handleSubmit.js";
import { handleShowData } from "./handleShowData.js";
import { handleDelete } from "./handleDelete.js";

document.addEventListener('DOMContentLoaded', function () {
    let saveButton = document.querySelector('#save');
    let showButton = document.querySelector('#show');
    let recordContainer = document.querySelector("#r-list");
    let deleteButton = document.querySelector('#delete');
    let openDB = connectToDb();
    openDB.onsuccess = function (event) {
        const db = event.target.result;
        saveButton.addEventListener("click", () => { handleSubmit(db) });
        showButton.addEventListener("click", () => {
            handleShowData(db);
        });
        deleteButton.addEventListener("click", () => { // Add this block
            const key = prompt("Enter the key of the record to delete:");
            if (key) {
                handleDelete(db, key);
            }
        });
    };
    openDB.onerror = function (event) {
        console.error('Error opening IndexedDB');
    };
});
