const $thanks = document.querySelector('.thanks');
$thanks.innerText = 'Merci pour votre achat !';

// Paramètre de récupération d'URL

const urlParam = document.location.search;
const searchParam = new URLSearchParams(urlParam);

// Récupération de l'URL du prix total et du numéro de commande + affichage

function getURLOrder() {
    const orderId = searchParam.get('orderId');
    const $orderId = document.querySelector('.order-id');
    $orderId.innerHTML = 'Votre commande ' + orderId + ' a bien été enregistré !';
};

function getURLPrice() {
    const totalPrice = searchParam.get('totalPrice');
    const $totalPrice = document.querySelector('.total-price');
    $totalPrice.innerHTML = 'Le montant de votre commande est de ' + totalPrice + ',00 euros.';
};

//Suppression des éléments dans le localStorage

function removeItems() {
    window.localStorage.removeItem('Orinoco');
};

//Appel des fonctions 

getURLOrder();
getURLPrice();
removeItems();