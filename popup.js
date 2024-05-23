// let state = localStorage.getItem("state") || {
//    addNote:{
//     title:"",
//     body:"",
//    }
// }

let nstate = {
    title:"",
    body:"",
}

const handleSubmit = ()=>{
    // console.log("hii");

    let title = document.querySelector('#key').value;
    let body=document.querySelector('#value').value;
//     console.log(title);
//    console.log(body);
   nstate.title = title;
   nstate.body =body;


    localStorage.setItem("nstate",JSON.stringify(nstate));
}




document.querySelector('#save').addEventListener("click",handleSubmit);