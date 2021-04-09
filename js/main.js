var date_now = luxon.DateTime.now().toFormat("yyyy-LL-dd"), //se obtine la fecha de hoy para manejar el api
    calendar = document.getElementById('date'), // obtener el elemento input type date
    apod_content = document.getElementsByClassName('content-apod')[0],
    title = document.getElementsByClassName('title')[0],
    date_info = document.getElementsByClassName('date-info')[0],
    explanation = document.getElementsByClassName('explanation')[0],
    button = document.getElementById('btn'),
    media, // usada para la imagen/vídeo de la consulta
    fecha_elegida; //usada para que  no se eliga la misma fecha en la consulta
calendar.value = date_now; // pone el valor del imput con la fecha actual
calendar.max = date_now; //el maximo valor de la fecha del input

//por defecto se consulta la fecha actual (now)
get_data_api(date_now);

// se reraliza la consulta  a la API
//promise
function get_data_api(choose_date){
    try {
        fetch('https://api.nasa.gov/planetary/apod?api_key=oOEXRlpeboIutRlzQ4A9HvtCNzXfzlZYI9RKhjDw&date='+choose_date)
        .then(data => data.json()) // los datos se pasan a formato json
        .then(nasa_data => { 
            // validar si es una imagen o video
            if (nasa_data.media_type === "image") {
                media = document.createElement('img');
                media.className = "media-img";
            } else if(nasa_data.media_type === "video"){
                media = document.createElement('iframe');
                media.className = "media-video";
                media.allowFullscreen = "true";
            }
        
            fecha_elegida = nasa_data.date;
        
            title.textContent = nasa_data.title;
            date_info.textContent = "Fecha: " + nasa_data.date;
            explanation.textContent = nasa_data.explanation;
            media.src = nasa_data.url;
        
            //agregar elemento media al documento
            apod_content.appendChild(media);
        })
    } catch (error) {
        Swal.fire({
            title: "ERROR",
            text: "Error en la consulta" + error,
            icon: "error",
        });
    }
}


//evento para el boton de consulta de fecha especifica
button.addEventListener('click',function(){
    if (fecha_elegida === calendar.value) {
        Swal.fire({
            title: "Atencion!!",
            text: "La fecha ya está elegida",
            icon: "warning",
        });
    } else {
        apod_content.removeChild(media)
        get_data_api(calendar.value)
        window.location = './index.html#apod'
    }
}); 
