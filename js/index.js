fetch('http://localhost:3000/api/furniture') 
.then(function (response) { 
return response.json() 
})
.then(function (data) {
    console.log(data)
    data.forEach (function(furniture) { 
        createAndDisplayFurniture(furniture)
    })     
})
.catch(function (error) {
    return error 
})


const $furnitureList = document.querySelector('.list-items'); 

function createAndDisplayFurniture (furniture) { 
    const $li = document.createElement('li'); 
    $furnitureList.appendChild($li); 
    const $nameParagraph = document.createElement('p');
    $nameParagraph.innerText = 'Produit : ' + furniture.name; 
    const $priceParagraph = document.createElement('p');
    $priceParagraph.innerText = 'Prix : ' + furniture.price;
    const $descriptionParagraph = document.createElement('p');
    $descriptionParagraph.innerText = 'Description : ' + furniture.description;
    const $varnishParagraph = document.createElement('p');
    $varnishParagraph.innerText = 'Vernissage : ' + furniture.varnish;
    const $image = document.createElement('img');
    $image.src = furniture.imageUrl
    $li.appendChild($image) 
    $li.appendChild($nameParagraph); 
    $li.appendChild($priceParagraph);
    $li.appendChild($descriptionParagraph);
    $li.appendChild($varnishParagraph);
}
