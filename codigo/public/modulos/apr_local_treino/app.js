//chave da api mapbox
const key = "pk.eyJ1IjoiYW5kcmVkZWRlIiwiYSI6ImNtYTJmbmVreTJvYzMyaXBzM2Y1ZDRpOXQifQ.hf1smfaEWEXch-aNeJqWtQ"

//eventos dos objetos exigido pela atividade, onclick, onload, onblur(outras possibilidades)
$(window).on("load", getLocalizacao());
$("#GetLocation").click(()=>{alert("Aguarde um pouco,normalmente demora a encontrar sua localização"), getLocalizacao()});
$("#formPostcode").blur(()=>{viacep($("#formPostcode").val())});//completar as informações via CEP
$("#Limpar").click(()=>{limpar()});
$("#Buscar").click(()=>{getmap()});


function viacep(cep){//função que recebe um CEP e devolve um json do endereço pela API do viacep
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(res => res.json())
    .then(addres => {
        if(addres.erro == "true"){
            alert("Cep não encontrado");
        }
        else{
            $("#formRegion").val(`${addres.estado}`);
            $("#formPlace").val(`${addres.localidade}`);
            $("#formNeighborhood").val(`${addres.bairro}`);
            $("#formStreet").val(`${addres.logradouro}`);
        }
    })
}

function getLocalizacao(){//função para pegar coordenadas do usuário, mandar para a api do Mapbox para receber o Cep e completar os dados com o viacep
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    }
    else {
        alert("Seu navegador não possue localização, coloque o CEP e a aplicação completa o resto.");
    }
      
    function success(position) {
        fetch(`https://api.mapbox.com/search/geocode/v6/reverse?access_token=${key}&longitude=${position.coords.longitude}&latitude=${position.coords.latitude}`)
        .then(res => res.json())
        .then(data => data.features[0].properties.context)
        .then(addres => {
            $("#formPostcode").val(`${addres.postcode.name}`);
            viacep(addres.postcode.name);
        })
    }
    
    function error() {
        alert("ocorreu um erro ao pegar sua localização, tente novamente ou coloque o CEP e a aplicação completa o resto.");
    }
}

function getmap(){//função com algoritmo que encontra os locais de interesse próximo baseado nas coordenadas e escolhas do usuario
    $("#esperando").hide;
    const Street = $("#formStreet").val();
    const Postcode = $("#formPostcode").val();
    const Place = $("#formPlace").val();
    const Region = $("#formRegion").val();
    const query = `${Street}, ${Postcode}, ${Place}, ${Region}`;

    if(Street == "" || Postcode == "" || Place == "" || Region == ""){
        alert("Preencha todos os campos, a falta de valores atrapalha na localização.")
    }

    let ponto_norte, ponto_leste, ponto_sul, ponto_oeste;

    fetch(`https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(query)}&access_token=${key}`)
    .then(res => res.json())
    .then(data => {
        longitude = Number(data.features[0].geometry.coordinates[0]);
        latitude = Number(data.features[0].geometry.coordinates[1]);

        let interesse = $("#formInteresse").val();
        let distancia = $("#formDistancia").val();
        let qstring;
        let zoom;

        if(interesse == "Sem"){
            qstring = "/locais/";
        }
        else{
            qstring = `/locais/?tipo=${interesse}`;
        }

        switch(distancia){
            case "1":
                ponto_norte = latitude + 0.008983;
                ponto_leste = longitude + 0.009756;
                ponto_sul = latitude - 0.008983;
                ponto_oeste = longitude - 0.009756;
                zoom = 14;
                break;
            case "3":
                ponto_norte = latitude + 0.026949;
                ponto_leste = longitude + 0.029268;
                ponto_sul = latitude - 0.026949;
                ponto_oeste = longitude - 0.029268;
                zoom = 13;
                break;
            case "5":
                ponto_norte = latitude + 0.044915;
                ponto_leste = longitude + 0.048780;
                ponto_sul = latitude - 0.044915;
                ponto_oeste = longitude - 0.048780;
                zoom = 12;
                break;
            case "7":
                ponto_norte = latitude + 0.062881;
                ponto_leste = longitude + 0.068292;
                ponto_sul = latitude - 0.062881;
                ponto_oeste = longitude - 0.068292;
                zoom = 11;
                break;
            case "10":
                ponto_norte = latitude + 0.089830;
                ponto_leste = longitude + 0.097560;
                ponto_sul = latitude - 0.089830;
                ponto_oeste = longitude - 0.097560;
                zoom = 10;
                break;
        }

        fetch(qstring)
        .then(res => res.json())
        .then(local => {
            let locals_id = [];
            local.forEach(element => {
                let lat = Number(element.coordenadas.latitude);
                let long = Number(element.coordenadas.longitude);
                if(lat <= ponto_norte &&
                    long <= ponto_leste &&
                    lat >= ponto_sul &&
                    long >= ponto_oeste){
                    locals_id.push(element.id);
                }
            });
            if(locals_id != ""){
                generatemap(locals_id, longitude, latitude, zoom);
            }
            else{
                alert("Nenhuma localização encontrada, tente mudar o interesse ou distância.")
                $("#quest").html("Nenhuma localização encontrada, tente um raio de distância maior.");
                $("#map").empty();
            }
        })
    })
}

function generatemap(locals_id, longitude, latitude, zoom){//função que gera um mapa a partir do mapbox com os locais encontrados

    const centralLatLong = [Number(longitude), Number(latitude)];

    let map;

    mapboxgl.accessToken = key;
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: centralLatLong,
        zoom: zoom
    });

    $("#quest").empty();

    let div = $("#quest");

    locals_id.forEach((localId) => {
        fetch(`/locais/?id=${localId}`)
        .then(res => res.json())
        .then(local => {
            local = local[0];
            let cor;
            switch (local.tipo) {
                case "Academia":
                    cor = "red";
                    break;
                case "Parque":
                    cor = "green";
                    break;
                case "Quadra":
                    cor = "orange";
                    break;
                default:
                    cor = "purple";
                    break;
            }
            div.append(`<div><i class="fa-solid fa-location-dot d-inline" style="color:${cor}"></i> <p class="d-inline">${local.nome}</p></div>`);
            let popup = new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<h4>${local.nome}</h4><a href="${local.link}" target="_blank"><h6>Link</h6></a>`);
            const marker = new mapboxgl.Marker({ color: cor })
            .setLngLat([Number(local.coordenadas.longitude), Number(local.coordenadas.latitude)])
            .setPopup(popup)
            .addTo(map);
        })
    })

    let popup = new mapboxgl.Popup({ offset: 25 })
    .setHTML(`<h3>Sua localização</h3>`);
    const marker = new mapboxgl.Marker({ color: 'yellow' })
    .setLngLat([longitude, latitude])
    .setPopup(popup)
    .addTo(map);
}

function limpar(){//função para limpar os campos
    $("#formPostcode").val("");
    $("#formRegion").val("");
    $("#formPlace").val("");
    $("#formNeighborhood").val("");
    $("#formStreet").val("");
    $("#formInteresse").val("Academia");
    $("#formDistancia").val("1");
}