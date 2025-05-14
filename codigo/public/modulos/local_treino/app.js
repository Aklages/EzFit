const key = "pk.eyJ1IjoiYW5kcmVkZWRlIiwiYSI6ImNtYTJmbmVreTJvYzMyaXBzM2Y1ZDRpOXQifQ.hf1smfaEWEXch-aNeJqWtQ"

function getLocalizacao(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    }
    else {
        alert("Seu navegador não possue localização")
    }
      
    function success(position) {
        fetch(`https://api.mapbox.com/search/geocode/v6/reverse?access_token=${key}&longitude=${position.coords.longitude}&latitude=${position.coords.latitude}`)
        .then(res => res.json())
        .then(data => data.features[0].properties.context)
        .then(addres => {
            $("#formPostcode").val(`${addres.postcode.name}`);
            $("#formRegion").val(`${addres.region.name}`);
            $("#formPlace").val(`${addres.place.name}`);
            $("#formNeighborhood").val(`${addres.neighborhood.name}`);
            $("#formStreet").val(`${addres.street.name}`);
        })
    }
    
    function error() {
        alert("ocorreu um erro");
    }
}