"use strict";
/*

//requete AJAX exemple
let xhr = new XMLHttpRequest();
xhr.open ('GET', "https://data.toulouse-metropole.fr/api/records/1.0/search/?dataset=ludotheques&rows=15");
xhr.onload = onDataLoaded;
xhr.send();
function onDataLoaded(evt) {
    if (this.status == 200) {
        console.log(JSON.parse(this.responseText));
    } else {
        console.log("Houston, we\'ve got a problem !");
    }
}

*/

//faire une requete ajax qui recup la liste des ludotheques et en faire une ul avec des li, avec nom, tranche d'age, numeros de telephone
//let xhr = new XMLHttpRequest();
//xhr.open('GET', "https://data.toulouse-metropole.fr/api/records/1.0/search/?dataset=ludotheques&rows=15");
//xhr.onload = onDataLoaded; //On peut mettre plutot xhr.addEventListener("readystatechange", onLoadProgress);
//xhr.send(); //Peut prendre eventuellement les parametres de la methode GET
//let json = "";

/* xhr.readyState
    0:UNSENT
    1:OPENED
    2:HEADER_RECEIVED
    3:LOADING
    4:DONE //Communication avec serveur est terminée

    Il existe:
    xhr.onLoad
    xhr.onError
*/


// function onDataLoaded(evt) {
//     if (this.status == 200 && this.readyState == 4) {
//         json = JSON.parse(this.responseText); //REsponsetext est la réponse renvoyée sous format texte par le serveur, parse renvoie un objet JS depuis un fichier JSON. (JSON.stringify fait l'inverse)
//         console.log(json);
//         displayList(json);
//     }
// }

// //Display JSON informations in ul and li
// function displayList(obj) {
//     //Display JSON informations in ul and li
//     for (let i = 0; i < obj.records.length; i++) {
//         let liName = document.createElement("li");
//         liName.innerHTML = obj.records[i].fields.nom;
//         document.body.appendChild(liName);

//         let liAge = document.createElement("li");
//         liAge.innerHTML = obj.records[i].fields.ages;
//         document.body.appendChild(liAge);

//         let liPhone = document.createElement("li");
//         liPhone.innerHTML = obj.records[i].fields.telephone;
//         document.body.appendChild(liPhone);
//     }
// }






// if (!Object.keys(obj).length) return;
// let list = document.createElement("ul");
// for (let key in obj) {
//     let li = document.createElement("li");
//     li.innerHTML = key;
//     let childrenUl = displayList(obj[key]);
//     if (childrenUl) {
//         li.append(childrenUl);
//     }     
//     list.append(li);
// }
// return list;


//Liste des 500 imprimés les plus consultés dans les bibliotheques toulousaines (regarder sur opendata toulouse) 
//On charge le flux et on fabrique une petite liste avec le titre de l'ouvrage, et le nbre de fois où il a été loué dans l'année
//Essayer de le faire aussi propre que possible, cad pas de variable globale autant qu'on peut 
function xhrRequest () {
    let xhr = new XMLHttpRequest(); //On crée la requete
    xhr.open('GET', 
    "https://data.toulouse-metropole.fr/api/records/1.0/search/?dataset=top-500-des-imprimes-les-plus-empruntes-a-la-bibliotheque-de-toulouse&rows=10&sort=nbre_de_prets");
    xhr.addEventListener("readystatechange", onDataLoaded);
    xhr.send();
}

//Check if json is loaded and parse it
function onDataLoaded(evt) {
    if (this.status == 200 && this.readyState == 4) {
        let json = JSON.parse(this.responseText); 
        // console.log(json);
        displayList(json); //Si tout s'est bien passé je crée ma liste
    } else if (this.status != 200) {
        let text = document.createElement("p");
        text.innerHTML = "Probleme de chargement de la liste";
        document.body.appendChild(text);
        console.log("Problem");
    } else {
        console.log(this.readyState);
        console.log(this.status);
    }
}

//Display JSON informations in ul and li
function displayList(obj) {
    let list = document.createElement("ul");
    let records = obj['records'];
    console.log(records);
    //Display JSON informations in ul and li
    for (let i = 0; i < records.length; i++) {
        let liName = document.createElement("li");
        liName.innerHTML = records[i]["fields"]["titre"];
        list.appendChild(liName);

        let liRents = document.createElement("li");
        liRents.innerHTML = records[i]["fields"]["nbre_de_prets"];
        list.appendChild(liRents);
    }
    document.body.appendChild(list);
}

xhrRequest();

//