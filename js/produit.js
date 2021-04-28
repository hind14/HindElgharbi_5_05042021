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

const $selectItemBoxInDiv = document.querySelector('.item-box');
const $furniture = document.createElement('div');
$selectItemBoxInDiv.appendChild($furniture);
$furniture.classList.add('furniture');

//Création d'une fonction qui récupère le contenu d'un article et le place dans des paragraphes

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

    //Appeller les focntions qui actionnent le bouton qui lorsqu'il est cliqué enclanche les selecteurs de quatité et de vernissage.

    const selectors = createSelector(furniture);
    createAndDisplayButton(furniture, selectors);
};

/* Création d'un selecteur prenant pour options les données affichées dans le tableau 
[varnish] issue de l'API, et d'un selecteur de quantité */

function createSelector(furniture) {
    const $varnishParagraph = document.createElement('p');
    $varnishParagraph.innerText = 'Vernis : ';
    $furniture.appendChild($varnishParagraph);
    const $varnishSelect = document.createElement('select');
    $varnishParagraph.appendChild($varnishSelect);

    furniture.varnish.forEach(function (varnishSelected) {
        let $option = new Option(varnishSelected);
        $varnishSelect.appendChild($option);
    });

    //On écoute l'événement du select qui prenne les valeurs du tableau varnish.

    $varnishSelect.addEventListener('change', function () {
    });

    //Création du selecteur de quantité

    const $quantitySelect = document.createElement('select');
    $varnishParagraph.appendChild($quantitySelect);

    ['un', 'deux', 'trois', 'quatre', 'cinq'].forEach(function (numberSelected, index) {
        let $option = new Option(numberSelected, index + 1);
        $quantitySelect.appendChild($option);
    });

    //La fonction retourne les selecteurs de quantité et de vernis

    return [$quantitySelect, $varnishSelect];
};

//Création du panier + lien vers la page panier

const $cartBox = document.querySelector('.cart-box');
const $cart = document.createElement('div');
$cart.classList.add('cart');
$cartBox.appendChild($cart);

const $linkToShopCart = document.createElement('a');
$linkToShopCart.setAttribute('href', 'panier.html');
const $shopCartIcon = document.querySelector('.shop-cart-icon');
$cartBox.appendChild($linkToShopCart);
$linkToShopCart.appendChild($shopCartIcon);

//Création d'un bouton pour ajouter au panier 

function createAndDisplayButton(furniture, selectors) {
    const $button = document.createElement('input');
    $button.setAttribute('type', 'button');
    $button.setAttribute('value', 'Ajouter au panier');
    $button.classList.add('btn');
    $furniture.appendChild($button);

    //En appuyant sur le bouton, la fonction liée au localStroage est appellée et ajoute les articles dans ce dernier (nb + varnish)

    $button.addEventListener('click', function () {
        addingItemIntoCart(furniture, selectors);
    });
};

//Ajout d'article dans le stockage local et récupération des éléments de l'article dans le panier

function addingItemIntoCart(furniture, selectors) {
    let basket = localStorage.getItem('Orinoco');

    if (basket) {
        basket = JSON.parse(basket);
    } else {
        basket = [];
    }

    //Stockage d'une variable avec les objets qui vont  s'envoyer au panier

    const furniture_ = {
        _id: furniture._id,
        name: furniture.name,
        price: parseInt(furniture.price)/100,
        quantity: parseInt(selectors[0].value),
        varnish: selectors[1].value
    }

    //Les envoyer dans le tableau basket

    basket.push(furniture_);

    localStorage.setItem('Orinoco', JSON.stringify(basket));
};

const basket = JSON.parse(localStorage.getItem('Orinoco'));
let nbInBasket;

//Actualisation du nombre d'article dans le panier

if (basket) {
    nbInBasket = basket.length;
    
}
else {
    nbInBasket = 0;
};

$cart.innerText = nbInBasket;