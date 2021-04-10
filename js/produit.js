const urlParam = document.location.search
const searchParam = new URLSearchParams(urlParam)
const id = searchParam.get('id')

//Récuperation grâce à l'id vers la page produit avec une seul article

fetch('http://localhost:3000/api/furniture/' + id) 
.then(function (response) { 
return response.json() 
})
.then(function (data) { 
        displayOneFurniture(data)
        console.log(data)
    })     
.catch(function (error) { 
    alert(error) 
})

//Création du contenu d'un article

function displayOneFurniture (oneFurniture) {
    const $furnitureChoice = document.querySelector('.one-furniture') 
    const $li = document.createElement('li')
    $furnitureChoice.appendChild($li)
    const $image = document.createElement('img')
    $image.src = oneFurniture.imageUrl
    $li.appendChild($image) 
    const $nameParagraph = document.createElement('p') 
    $nameParagraph.innerText = 'Produit : ' + oneFurniture.name
    $li.appendChild($nameParagraph) 
    const $priceParagraph = document.createElement('p')
    $priceParagraph.innerText = 'Prix : ' + oneFurniture.price
    $li.appendChild($priceParagraph)
    const $descriptionParagraph = document.createElement('p')
    $descriptionParagraph.innerText = 'Description : ' + oneFurniture.description
    $li.appendChild($descriptionParagraph)
    
    //Création d'un selecteur prenant pour options les données affichées dans le tableau issue du serveur local

    const $varnishParagraph = document.createElement('p')
    $varnishParagraph.innerText = 'vernissage : '
    $li.appendChild($varnishParagraph)
    const $select = document.createElement('select')
    const $option = document.createElement('option')
    $varnishParagraph.appendChild($select)
    $select.appendChild($option)
    $option.addEventListener('change', function(){
    while($select.options.length > 0) 
    $select.options.remove(0)
    },
    Array.from(oneFurniture.varnish).forEach(function(elt){
        let option = new Option(elt,elt)
        $select.appendChild(option)
    }))
}
