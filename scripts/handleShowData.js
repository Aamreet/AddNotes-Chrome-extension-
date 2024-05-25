export const handleShowData = (db) => {
    let showButton = document.querySelector('#show');
    let recordContainer = document.querySelector("#r-list");
    console.log(showButton);
    let htmlContent = "";
    if (showButton.innerText === "Show") {
        const transaction = db.transaction(['data'], 'readonly');
        const objectStore = transaction.objectStore('data');
        const cursorRequest = objectStore.openCursor();
        cursorRequest.onsuccess = function (event) {
            const cursor = event.target.result;
            if (cursor) {
                // Display data in the UI
                console.log('Title:', cursor.value.title, 'Value:', cursor.value.value);

                htmlContent += `
                 <div class="sub-container">
                 <h2 class="title">${cursor.value.title}</h1>
                 <p class="val">${cursor.value.value}</p>
               </div>
                 `;
                cursor.continue();
            } else {
                console.log('No more data');
                console.log(htmlContent);
                recordContainer.innerHTML = htmlContent;
                showButton.innerText = "Close"
                recordContainer.classList.remove("display-none");
            }
        };
        cursorRequest.onerror = function (event) {
            console.error('Error reading data from IndexedDB');
        };
    }
    else if (showButton.innerText === "Close") {
        showButton.innerText = "Show"
        recordContainer.innerHTML = "";
        recordContainer.classList.add("display-none");
    }
}