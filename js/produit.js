//Chargement de l'URL mofifiée en prenant l'élément 'id' des données du service web (backend)

const urlParam = document.location.search;
const searchParam = new URLSearchParams(urlParam);
const id = searchParam.get('id');

//Récupération des données du service web grâce à l'id vers la page produit avec un seul article

fetch('http://localhost:3000/api/furniture/' + id)
.then(function (response) {
    return response.json()
})
.then(function (data) {
    createAndDisplayFurniture(data)
})
.catch(function (error) {
    alert(error)
});

//Récupération d'un élement en HTML puis création d'une div à l'intérieur de celui-ci

const $selectFurnitureInDiv = document.querySelector('.item-box');
const $furniture = document.createElement('div');
$selectFurnitureInDiv.appendChild($furniture);
$furniture.classList.add('furniture');

//Création d'une fonction qui récupère le contenu d'un article et qui le place dans des paragraphes

function createAndDisplayFurniture(furniture) {
    const $image = document.createElement('img');
    $image.src = furniture.imageUrl;
    $furniture.appendChild($image);
    const $nameParagraph = document.createElement('p');
    $nameParagraph.innerText = 'Produit : ' + furniture.name;
    $furniture.appendChild($nameParagraph);
    const $priceParagraph = document.createElement('p');
    $priceParagraph.innerText = furniture.price + ' €';
    $furniture.appendChild($priceParagraph);
    const $descriptionParagraph = document.createElement('p');
    $descriptionParagraph.innerText = 'Description : ' + furniture.description;
    $furniture.appendChild($descriptionParagraph);

    createSelector(furniture);
    createAndDisplayButton();
};

/* Création d'un selecteur prenant pour options les données affichées dans le tableau 
[varnish] issue de l'API, et d'un selecteur de quantité */

function createSelector(furniture) {
    const $varnishParagraph = document.createElement('p');
    $varnishParagraph.innerText = 'Vernissage : ';
    $furniture.appendChild($varnishParagraph);
    const $varnishSelect = document.createElement('select');
    $varnishParagraph.appendChild($varnishSelect);

    furniture.varnish.forEach(function (varnishSelected) {
        let $option = new Option(varnishSelected);
        $varnishSelect.appendChild($option);
    });

    //On écoute l'événement le select qui prennent les valeurs du array avec l'objet varnish

    $varnishSelect.addEventListener('change', function () {
    });

    //Création du selecteur de quantité

    const $quantitySelect = document.createElement('select');
    $varnishParagraph.appendChild($quantitySelect);

    ['un','deux','trois','quatre', 'cinq'].forEach(function (numberSelected, index) {
        let $option = new Option(numberSelected, index +1);
        $quantitySelect.appendChild($option);
    });
};

//Création du nombre d'article dans le panier, initialisé à 0

const $cartBox = document.querySelector('.cart-box');
const $cart = document.createElement('div');
$cart.classList.add('cart');
$cartBox.appendChild($cart);
$cart.innerText = '0';
const $linkToShopCart = document.createElement('a');
$linkToShopCart.setAttribute('href', 'panier.html');
const $shopCartIcon = document.querySelector('.shop-cart-icon');
$cartBox.appendChild($linkToShopCart);
$linkToShopCart.appendChild($shopCartIcon);

//Création d'un bouton pour ajouter au panier 

function createAndDisplayButton() {
    const $button = document.createElement('input');
    $button.setAttribute('type', 'button');
    $button.setAttribute('value', 'Ajouter au panier');
    $button.classList.add('btn');
    $furniture.appendChild($button);
    const classOfButton = document.getElementsByClassName('btn');

    //Ajouter une boucle pour ajouter dans le localStorage

    for (let i = 0; i < classOfButton.length; i++) {
        classOfButton[i].addEventListener('click', function () {
            addingItemIntoCart();
        });
    };
};

//Ajout d'article dans le stockage local et récupération des éléments de l'article dans le panier

function addingItemIntoCart() {
    let numberOfItems = localStorage.getItem('addingItems');

    numberOfItems = parseInt(numberOfItems);

    if (numberOfItems) {
        localStorage.setItem('addingItems', numberOfItems + 1);
        $cart.textContent = numberOfItems + 1;
    } else {
        localStorage.setItem('addingItems', JSON.stringify());
        $cart.tabIndex = 1;   
    }
};

//Fonction qui permet l'actualisation de la page sans la suppression du nombre d'article dans le panier

function onLoadCartNumbers() {
    let numberOfItems = localStorage.getItem('addingItems');

    if (numberOfItems) {
        $cart.textContent = numberOfItems;
    }
};

onLoadCartNumbers();