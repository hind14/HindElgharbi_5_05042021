//Fonction qui récupère les données du service web (backend) avec trois promesses 

function fetchData() {

    fetch('http://localhost:3000/api/furniture')

        //promesse avec une fonction qui retourne une réponse au format json

        .then(function (response) {
            return response.json()
        })

        //Seconde promesse qui récupère les données
        //Utilisation d'une boucle qui prend les données et les assimile avec une fonction

        .then(function (data) {
            data.forEach(function (furniture) {
                createAndDisplayFurniture(furniture)
            });
        })
        
        //Dernière promesse: si l'execution échoue, cela retourne un message d'erreur

        .catch(function (error) {
            alert(error)
        })
};

fetchData();

//Création d'une fonction qui crée et affiche la liste d'articles/meubles dans une liste à puce

function createAndDisplayFurniture(furniture) {
    const $furnitureList = document.querySelector('.list-items');
    const $li = document.createElement('li');
    $furnitureList.appendChild($li);

    //lien qui redirige vers une page 'produit' grâce à l'id

    const $linkToFurniture = document.createElement('a');
    $linkToFurniture.setAttribute('href', 'html/produit.html?id=' + furniture._id);
    $li.appendChild($linkToFurniture);

    //Création d'éléments récupèrent le contenu des différents articles et qui les placent dans des paragraphes.

    const $image = document.createElement('img');
    $image.src = furniture.imageUrl;
    $linkToFurniture.appendChild($image);
    const $nameParagraph = document.createElement('p');
    $nameParagraph.innerText = 'Produit : ' + furniture.name;
    $linkToFurniture.appendChild($nameParagraph);
    const $priceParagraph = document.createElement('p');
    $priceParagraph.innerText = (furniture.price) / 100 + ',00 €';
    const $descriptionParagraph = document.createElement('p');
    $descriptionParagraph.innerText = 'Description : ' + furniture.description;
    $linkToFurniture.appendChild($priceParagraph);

    numberInBasket()
};

function numberInBasket() {

    //Création du nombre d'article ajouté dans le panier + page avec le contenu du panier

    const $cart = document.createElement('div');
    $cart.classList.add('cart');
    const $cartBox = document.querySelector('.cart-box');
    $cartBox.appendChild($cart);

    const $linkToShopCart = document.createElement('a');
    $linkToShopCart.setAttribute('href', 'html/panier.html');
    $shopCartIcon = document.querySelector('.shop-cart-icon');
    $cartBox.appendChild($linkToShopCart);
    $linkToShopCart.appendChild($shopCartIcon);

    //Actualisation du nombre d'article dans le panier

    const basket = JSON.parse(localStorage.getItem('Orinoco'));
    let nbInBasket;

    //Prendre la longeur d'article qui sont dans le local storage pour avoir un chiffre

    if (basket) {
        nbInBasket = basket.length;
    }
    else {
        nbInBasket = 0;
    };

    $cart.innerText = nbInBasket;
};