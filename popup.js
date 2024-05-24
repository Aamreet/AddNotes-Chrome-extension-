document.addEventListener('DOMContentLoaded', function () {
    console.log("popup loaded");

    let body = document.querySelector('#value');
    let head = document.querySelector('#key');
    let saveButton = document.querySelector('#save');
    let showButton = document.querySelector('#show');

    let recordContainer = document.querySelector("#r-list");

    // Open connection to IndexedDB database
    const openDB = indexedDB.open('myDatabase', 1);

    // Handle database upgrade (create object store)
    openDB.onupgradeneeded = function (event) {
        const db = event.target.result;
        const objectStore = db.createObjectStore('data', { keyPath: 'title' });
    };

    // Handle successful database opening
    openDB.onsuccess = function (event) {
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
            request.onsuccess = function (event) {
                console.log('Data added to IndexedDB');
            };

            // Handle errors
            request.onerror = function (event) {
                console.error('Error adding data to IndexedDB');
            };

            head.value = "";
            body.value = "";
        };

        const handleShowData = () => {

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
                         `

                        cursor.continue();
                    } else {
                        console.log('No more data');



                        //    tasks befor showing records

                        console.log(htmlContent);
                        recordContainer.innerHTML = htmlContent;

                        showButton.innerText = "Close"
                        recordContainer.classList.remove("display-none");
                    }
                };

                // Handle cursor errors
                cursorRequest.onerror = function (event) {
                    console.error('Error reading data from IndexedDB');
                };



            }
            else if (showButton.innerText === "Close") {









                showButton.innerText = "Show"
                recordContainer.innerHTML = "";
                recordContainer.classList.add("display-none");
            }


        };

        saveButton.addEventListener("click", handleSubmit);
        showButton.addEventListener("click", handleShowData);
    };

    // Handle database opening error
    openDB.onerror = function (event) {
        console.error('Error opening IndexedDB');
    };
});
