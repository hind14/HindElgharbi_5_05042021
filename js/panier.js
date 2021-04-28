const $section = document.querySelector('.section-1');
const $boxListOfArticles = document.querySelector('.list-of-articles');

// Stocker une variable qui récupère le tableau issu de la page produit

let fromStorage = localStorage.getItem('Orinoco');

//lien vers produits

const $linkToProduct = document.createElement('a');
$linkToProduct.setAttribute('href', '../index.html');
$linkToProduct.classList.add('link-to-product');
$linkToProduct.innerText = 'Continuer mes achats';
$boxListOfArticles.appendChild($linkToProduct);

// Condition d'affichage du panier si vide ou rempli

if (!fromStorage) {

    const $emptyBasket = document.createElement('div');
    $emptyBasket.classList.add('empty-basket')
    $emptyBasket.innerHTML = '<h2> Votre panier ne contient aucun article </h2>';
    $section.appendChild($emptyBasket);

    //Lien vers les produits

    const $linkToProduct = document.createElement('a');
    $linkToProduct.setAttribute('href', '../index.html');
    $linkToProduct.classList.add('link-to-product');
    $linkToProduct.innerText = 'Continuer mes achats';
    $emptyBasket.appendChild($linkToProduct);


} else {

    // Panier rempli, on transforme la chaîne de caractère qui devient un objet

    const convertIntoObject = JSON.parse(fromStorage);

    //Appelle de la fonction avec comme paramètre les objets issues du localstorage

    displayBasket(convertIntoObject);
}

// Fonction qui permet l'affichage des données issues du localStorage

function displayBasket(basket) {
    let total = 0;

    // BOucle

    basket.forEach(function (furniture) {


        // Sous-total 

        const subTotal = furniture.price * furniture.quantity;

        // Création liste avec 

        const $list = document.createElement('li');
        $boxListOfArticles.appendChild($list);
        $list.innerHTML = `<p> ${furniture.name} </p>`;
        $list.innerHTML += `<p> ${furniture.price},00 € </p>`;
        $list.innerHTML += `<p> ${furniture.quantity}  </p>`;
        $list.innerHTML += `<p> sous-total : ${subTotal},00 €</p>`;

        // Total

        total += subTotal;
    });

    const $total = document.createElement('div');
    $total.classList.add('total');
    $section.appendChild($total);
    $total.innerHTML = `<p> Montant total : ${total},00  € </p>`;
};