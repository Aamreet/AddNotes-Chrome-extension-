import { handleDelete } from "./handleDelete.js";

export const handleShowData = (db) => {
    let showButton = document.querySelector("#show");
    let recordContainer = document.querySelector("#r-list");
    let htmlContent = "";
    if (showButton.innerText === "Show") {
        const transaction = db.transaction(["data"], "readonly");
        const objectStore = transaction.objectStore("data");
        const cursorRequest = objectStore.openCursor();
        cursorRequest.onsuccess = function (event) {
            const cursor = event.target.result;
            if (cursor) {
                htmlContent += `
                 <div class="sub-container">
                 <div class="title-container">
                 <h2 class="title">${cursor.value.title}</h1>
                 <button id="${cursor.value.title}" class="remove">
                 X
             </button>
                 </div>
                 <p class="val">${cursor.value.value}</p>
               </div>
                 `;
                
                cursor.continue();
            } 
            else {
                recordContainer.innerHTML = htmlContent;
                showButton.innerText = "Close";
                recordContainer.classList.remove("display-none");
                document.querySelectorAll('.remove').forEach(item => {
                     item.addEventListener("click",()=>{
                        handleDelete(db,item.id);
                     });
                });
            }
        };
        cursorRequest.onerror = function (event) {
            console.error("Error reading data from IndexedDB");
        };
    } else if (showButton.innerText === "Close") {
        showButton.innerText = "Show";
        recordContainer.innerHTML = "";
        recordContainer.classList.add("display-none");
    }
};
