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
    const Street = $("#formStreet").val();
    const Postcode = $("#formPostcode").val();
    const Place = $("#formPlace").val();
    const Region = $("#formRegion").val();
    const query = `${Street}, ${Postcode}, ${Place}, ${Region}`;

    let ponto_norte, ponto_leste, ponto_sul, ponto_oeste;

    fetch(`https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(query)}&access_token=${key}`)
    .then(res => res.json())
    .then(data => {
        longitude = Number(data.features[0].geometry.coordinates[0]);
        latitude = Number(data.features[0].geometry.coordinates[1]);

        let interesse = $("#formInteresse").val();
        let distancia = $("#formDistancia").val();

        switch(distancia){
            case "1":
                ponto_norte = latitude + 0.008983;
                ponto_leste = longitude + 0.009756;
                ponto_sul = latitude - 0.008983;
                ponto_oeste = longitude - 0.009756;
                break;
            case "3":
                ponto_norte = latitude + 0.026949;
                ponto_leste = longitude + 0.029268;
                ponto_sul = latitude - 0.026949;
                ponto_oeste = longitude - 0.029268;
                break;
            case "5":
                ponto_norte = latitude + 0.044915;
                ponto_leste = longitude + 0.048780;
                ponto_sul = latitude - 0.044915;
                ponto_oeste = longitude - 0.048780;
                break;
            case "0":
                ponto_norte = 100;
                ponto_leste = 100;
                ponto_sul = -100;
                ponto_oeste = -100;
        }

        fetch(`/locais/?tipo=${interesse}`)
        .then(res => res.json())
        .then(local => {
            local.forEach(element => {
                let lat = Number(element.coordenadas.latitude);
                let long = Number(element.coordenadas.longitude);

                if(lat <= ponto_norte &&
                    long <= ponto_leste &&
                    lat >= ponto_sul &&
                    long >= ponto_oeste){
                    console.log(element);
                }
            });
        })
    })
}