import { connectToDb } from "./conn.js";
import { handleSubmit } from "./handleSubmit.js";
import { handleShowData } from "./handleShowData.js";

document.addEventListener('DOMContentLoaded', function () {
    console.log("popup loaded");
    let saveButton = document.querySelector('#save');
    let showButton = document.querySelector('#show');
    let recordContainer = document.querySelector("#r-list");
    let openDB = connectToDb();
    openDB.onsuccess = function (event) {
        const db = event.target.result;
        saveButton.addEventListener("click", () => { handleSubmit(db) });
        showButton.addEventListener("click", () => {
            handleShowData(db);
        });
    };
    openDB.onerror = function (event) {
        console.error('Error opening IndexedDB');
    };
});
