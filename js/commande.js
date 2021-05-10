// Récupération de l'URL du prix total et du numéro de commande + affichage

const urlParam = document.location.search;
const searchParam = new URLSearchParams(urlParam);
const totalPrice = searchParam.get('totalPrice');
const orderId = searchParam.get('orderId');

const $thanks = document.querySelector('.thanks');
const $totalPrice = document.querySelector('.total-price');
const $orderId = document.querySelector('.order-id');

$thanks.innerText = 'Merci pour votre achat !';
$totalPrice.innerHTML = 'Le montant de votre commande est de ' + totalPrice + ',00 euros.';
$orderId.innerHTML = 'Votre commande ' + orderId + ' a bien été enregistré !';

//Suppression des éléments dans le localStorage

window.localStorage.removeItem('Orinoco');