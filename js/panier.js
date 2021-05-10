const $section = document.querySelector('.section-1');
const $boxListOfArticles = document.querySelector('.list-of-articles');

let total = 0;

// Lien vers produits / continuer les achats

const $linkToProduct = document.createElement('a');
$linkToProduct.setAttribute('href', '../index.html');
$linkToProduct.classList.add('link-to-product');
$linkToProduct.innerText = 'Continuer mes achats';
$boxListOfArticles.appendChild($linkToProduct);

// Stocker une variable qui récupère le tableau issu de la page produit (du local storage)

let fromStorage = localStorage.getItem('Orinoco');

// Condition d'affichage du panier si vide ou rempli

if (!fromStorage) {

    // Panier vide

    const $emptyBasket = document.createElement('div');
    $emptyBasket.classList.add('empty-basket')
    $emptyBasket.innerHTML = '<h2> Votre panier ne contient aucun article </h2>';
    $section.appendChild($emptyBasket);

} else {

    // Panier rempli, on transforme les chaînes de caractère en objets

    const convertIntoObject = JSON.parse(fromStorage);

    // Appel de la fonction qui affiche le panier avec comme paramètre les objets issues du localstorage

    displayBasket(convertIntoObject);
}

// Fonction qui permet l'affichage des données issues du localStorage

function displayBasket(basket) {

    // Boucle qui contient une liste et affiche les mêmes fonctionnalités pour les objets dans des paragraphes + calcul du total

    basket.forEach(function (furniture) {

        // Sous-total : prix par meuble en fonction de la quantité choisi

        const subTotal = furniture.price * furniture.quantity;

        // Création liste avec la récupération de certains objets

        const $list = document.createElement('li');
        $boxListOfArticles.appendChild($list);
        $list.innerHTML = `<p> ${furniture.name} </p>`;
        $list.innerHTML += `<p> Prix :  ${furniture.price},00 € </p>`;
        $list.innerHTML += `<p> Quantité : ${furniture.quantity}  </p>`;
        $list.innerHTML += `<p> Sous-total : ${subTotal},00 €</p>`;

        // Total, addition des sous-totaux

        total += subTotal;
    });

    const $total = document.createElement('div');
    $total.classList.add('total');
    $boxListOfArticles.appendChild($total);
    $total.innerHTML = `<p> Montant total : ${total},00  € </p>`;
};


//Formulaire + envoie des données vers API

// Variable contenant un objet qui contient: un objet contenant des coordonnées "contact"  et un tableau vide "products"

const order = {
    contact: {
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        email: ''
    },
    products: []
};

// Condition de récupération des objets du LS, stockage des objets dans la variable "products"

let products;

if (!fromStorage) {
    fromStorage = 0;
    alert("Il n'y a pas d'article dans votre panier ! Impossible de passer votre commande.");
} else {
    products = JSON.parse(fromStorage);
};

// Récupération de chaque id dans un tableau stocké dans la variable allIds

function collectAllIds(products) {
    let allIds = [];
    products.forEach(function (product) {
        allIds.push(product._id)
    });
    return allIds
};

//Envoie à l'Api

// Récupération du formulaire html

let $form = document.querySelector('#form');

const formFields = {
    $firstName: document.querySelector('#first-name'),
    $lastName: document.querySelector('#last-name'),
    $address: document.querySelector('#adress'),
    $city: document.querySelector('#city'),
    $email: document.querySelector('#email')
};

// Fonction qui permet l'envoie du formulaire et les id à l'API

function send(e) {
    e.preventDefault();

    // Récupération de l'objet "contact" dans la variable d'objet "order"
    // L'objet "contact" prend en compte la fonction qui vérifie la validité du formulaire 

    order.contact = checkingFormValues();

    if (!order.contact) {
        alert('Tous les champs ne sont pas valides')
        return;
    };

    // Récupération du tableau "products" dans la variable d'objet "order"
    // L'objet "products" prend en compte la fonction qui récupère les id.

    order.products = collectAllIds(products);

    // Envoie des produits à l'api
    
    fetch('http://localhost:3000/api/furniture/order', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
        })
        .then(function (result) { 
            document.location.href = `commande.html?totalPrice=${total}&orderId=${result.orderId}`
        })
        .catch(function (error) {
            alert(error)
        });
        
};

// Fonction qui permet la validation des données du formulaire 
// Condition qui retourne false si le champ est vide (0)

function checkingFormValues() {
    const firstName = formFields.$firstName.value.trim();
    if (firstName.length == 0) {
        return false;
    }
    const lastName = formFields.$lastName.value.trim();
    if (lastName.length == 0) {
        return false;
    }
    const address = formFields.$address.value.trim();
    if (address.length == 0) {
        return false;
    }
    const city = formFields.$city.value.trim();
    if (city.length == 0) {
        return false;
    }
    const email = formFields.$email.value.trim();
    if (email.length == 0) {
        return false;
    }
    return { firstName, lastName, address, city, email };
};

// Envoie des coordonnées du formulaire

$form.addEventListener("submit", send);