


// // document.addEventListener('DOMContentLoaded', function () {
// //     console.log("popup loaded");
// // });

// console.log("popups");
// let body = document.querySelector('#value');
// console.log(body.value);

// const handleSubmit = () => {

//     let state = JSON.parse(localStorage.getItem('state')) || {

//     }

//     let head = document.querySelector('#key');

//     let title = head.value;
//     let value = body.value;
//     console.log(title, value);

//     // let newState = { ...state, [title]: value };


//     // localStorage.setItem("state", JSON.stringify(newState));
//     // head.value = "";
//     // body.value = "";

// }




// document.querySelector('#save').addEventListener("click", handleSubmit);
// console.log("hiiiii ");


document.addEventListener('DOMContentLoaded', function () {
    console.log("popup loaded");

    let body = document.querySelector('#value');
    let head = document.querySelector('#key');

    const handleSubmit = () => {
        let state = JSON.parse(localStorage.getItem('state')) || {};

        let title = head.value;
        let value = body.value;
        // console.log(title, value);

        let newState = { ...state, [title]: value };

        localStorage.setItem("state", JSON.stringify(newState));
        head.value = "";
        body.value = "";
    }

    document.querySelector('#save').addEventListener("click", handleSubmit);
   
});
