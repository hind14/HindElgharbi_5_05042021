//Récupération de l'API avec des promesses  

fetch('http://localhost:3000/api/furniture') 
.then(function (response) { //promesse avec une fonction qui retourne l'objet response au format json
return response.json()
})
.then(function (data) { //Seconde promesse qui récupère les données de l'adresse récupérée
    console.log(data)
    data.forEach (function(furniture) { //Utilisation d'une boucle ForEach qui prend les données et les assimile avec une fonction nommée createAndDisplayFurniture
        createAndDisplayFurniture(furniture) 
    }) 
})
.catch(function (error) { //Dernière promesse si l'execution échoue, retourne 'error'
    alert(error)
});

 //Création d'une fonction qui crée et affiche la liste d'article/meuble

function createAndDisplayFurniture (furniture) {
    const $furnitureList = document.querySelector('.list-items');
    const $li = document.createElement('li') ;
    $furnitureList.appendChild($li);

    //lien qui redirige vers une page 'produit' grâce à l'id
    
    const $linkToFurniture = document.createElement('a');
    $linkToFurniture.setAttribute('href', 'html/produit.html?id=' + furniture._id);
    $li.appendChild($linkToFurniture);
    const $image = document.createElement('img'); 
    $image.src = furniture.imageUrl;
    $linkToFurniture.appendChild($image);
    const $nameParagraph = document.createElement('p');
    $nameParagraph.innerText = 'Produit : ' + furniture.name;
    $linkToFurniture.appendChild($nameParagraph); 
    const $priceParagraph = document.createElement('p');
    $priceParagraph.innerText = furniture.price + ' €' ;
    const $descriptionParagraph = document.createElement('p');
    $descriptionParagraph.innerText = 'Description : ' + furniture.description;
    $linkToFurniture.appendChild($priceParagraph);

    //Création du nombre d'article ajouté dans le panier + page avec le contenu du panier
    
    const $cart = document.createElement('div');
    $cart.classList.add('cart');
    const $cartBox = document.querySelector('.cart-box');
    $cartBox.appendChild($cart);
    $cart.innerText = '0';
    const $linkToShopCart = document.createElement('a');
    $linkToShopCart.setAttribute('href', 'html/panier.html');
    $shopCartIcon = document.querySelector('.shop-cart-icon');
    $cartBox.appendChild($linkToShopCart);
    $linkToShopCart.appendChild($shopCartIcon);
};
