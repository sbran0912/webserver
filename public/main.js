"use strict";

// Variante mit await
async function callFetch () {
    let data = [[10, 55, 0.7, 0.8, "neutron"],[30, 23, 0.9, 0.1, "atom"]]
    
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }
    
    const res = await fetch('/apicsv', options);
    const info = await res.json();
    document.querySelector("#hinweis").innerText = info.status + " Mit async: " + info.erhalten;
}

//Variante mit promise
function callFetchPromise() {
    let data = [[10, 55, 0.7, 0.8, "neutron"],[30, 23, 0.9, 0.1, "atom"]]
    
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }
    
    fetch('/apicsv', options)
        .then((res) => {return res.json()})
        .then((info) => {document.querySelector("#hinweis").innerText = info.status + " mit promise: " + info.erhalten});
    
    
}
document.querySelector("#btnstart").addEventListener("click", callFetch);
