//Chargement de l'URL mofifié en prenant l'élément 'id' du tableau

const urlParam = document.location.search;
const searchParam = new URLSearchParams(urlParam);
const id = searchParam.get('id');

//Récuperation grâce à l'id vers la page produit avec une seul article

fetch('http://localhost:3000/api/furniture/' + id)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        displayOneFurniture(data)
    })
    .catch(function (error) {
        alert(error)
    });

//Création d'une focntion qui récupère le contenu d'un article avec les éléments issues du data de l'API

function displayOneFurniture(oneFurniture) {
    const $selectFurnitureInDiv = document.querySelector('.item-box');
    const $furniture = document.createElement('div');
    $selectFurnitureInDiv.appendChild($furniture);
    const $image = document.createElement('img');
    $image.src = oneFurniture.imageUrl;
    $furniture.appendChild($image);
    const $nameParagraph = document.createElement('p');
    $nameParagraph.innerText = 'Produit : ' + oneFurniture.name;
    $furniture.appendChild($nameParagraph);
    const $priceParagraph = document.createElement('p');
    $priceParagraph.innerText = oneFurniture.price + ' €';
    $furniture.appendChild($priceParagraph);
    const $descriptionParagraph = document.createElement('p');
    $descriptionParagraph.innerText = 'Description : ' + oneFurniture.description;
    $furniture.appendChild($descriptionParagraph);

    //Création d'un selecteur prenant pour options les données affichées dans le tableau [varnish] issue de l'API

    const $varnishParagraph = document.createElement('p');
    $varnishParagraph.innerText = 'Vernissage : ';
    $furniture.appendChild($varnishParagraph);
    const $varnishSelect = document.createElement('select');
    $varnishParagraph.appendChild($varnishSelect);

    oneFurniture.varnish.forEach(function (elt) {
        let option = new Option(elt, elt);
        $varnishSelect.appendChild(option);
    });

    //Crétion d'un selecteur de quantité

    const $quantitySelect = document.createElement('select');
    $varnishParagraph.appendChild($quantitySelect);

    
    ['un','deux','trois'].forEach(function (numberSelected, index) {
        let option = new Option(numberSelected, index + 1);
        $quantitySelect.appendChild(option);
    });

    //On écoute l'événement le select qui prennent les valeurs du array avec l'objet varnish

    $varnishSelect.addEventListener('change', function () {
    });

    //Création d'un bouton pour ajouter au panier 

    const $button = document.createElement('input');
    $button.setAttribute('type', 'button');
    $button.setAttribute('value', 'Ajouter au panier');
    $button.classList.add('btn');
    $furniture.appendChild($button);
    const selectClassOfButton = document.getElementsByClassName('btn');


    //Ajouter une boucle 

    for (let i = 0; i < selectClassOfButton.length; i++) {
        selectClassOfButton[i].addEventListener('click', function () {
            addingItem()
        });
    };

    //Création du nombre d'article ajouté dans le panier + page avec le contenu du panier

    const $cart = document.createElement('div');
    $cart.classList.add('cart');
    const $cartBox = document.querySelector('.cart-box');
    $cartBox.appendChild($cart);
    $cart.innerText = '0';
    const $linkToShopCart = document.createElement('a');
    $linkToShopCart.setAttribute('href', 'panier.html');
    $shopCartIcon = document.querySelector('.shop-cart-icon');
    $cartBox.appendChild($linkToShopCart);
    $linkToShopCart.appendChild($shopCartIcon);

    //Ajout d'article dans le stockage local et augmentation du nombbre dans le panier 

    function addingItem() {
        let numberOfItems = localStorage.getItem('addingItems');
        numberOfItems = parseInt(numberOfItems);

        if (numberOfItems) {
            localStorage.setItem('addingItems', numberOfItems + 1);
            $cart.textContent = numberOfItems + 1;
        } else {
            localStorage.setItem('addingItems', JSON.stringify([]));
            $cart.tabIndex = 1;
        }
    };

    //fonction qui permet l'actualisation de la page sans la suppression du nombre d'article dans le panier

    function onLoadCartNumber() {
        let numberOfItems = localStorage.getItem('addingItems');

        if (numberOfItems) {
            $cart.textContent = numberOfItems;
        }
    };

    //Appeller la fonction pour qu'elle fonctionne

    onLoadCartNumber();
}