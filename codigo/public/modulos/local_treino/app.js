const key = "pk.eyJ1IjoiYW5kcmVkZWRlIiwiYSI6ImNtYTJmbmVreTJvYzMyaXBzM2Y1ZDRpOXQifQ.hf1smfaEWEXch-aNeJqWtQ"

$("#formPostcode").blur(()=>{
    fetch(`https://viacep.com.br/ws/${$("#formPostcode").val()}/json/`)
    .then(res => res.json())
    .then(addres => {
        $("#formRegion").val(`${addres.estado}`);
        $("#formPlace").val(`${addres.localidade}`);
        $("#formNeighborhood").val(`${addres.bairro}`);
        $("#formStreet").val(`${addres.logradouro}`);
    })
})

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

function getmap(){
    Street = $("#formStreet").val();
    Postcode = $("#formPostcode").val();
    Place = $("#formPlace").val();
    Region = $("#formRegion").val();

    fetch(`https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(Street, Postcode, Place, Region)}&access_token=${key}`).
    then(res => res.json())
    .then(data => {

    })
}