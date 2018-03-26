let container = document.getElementById("container-weather");
let rowWeather = document.getElementById("row-weather");

function loadPage() {
    getPosition();
    requestFlickrAPI();
    // changePage();
    // let buttonChange = document.getElementsByClassName("btn");
    // console.log(buttonChange);
    
    // buttonChange.addEventListener("click", changePage);
}


// function loadPage() {
    // getPosition();
// }

// let fetch = require('node-fetch');


function getPosition() {
    navigator.geolocation.getCurrentPosition(success, error);
}


function success(position) {
    const units = "units=ca";
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    const proxy = "https://cors-anywhere.herokuapp.com/";
    const url = "https://api.darksky.net/forecast/87232db3133064b6bd5c956de649461c/" + lat + "," + long + "/?" + units;
    // console.log(url);
    
    //     params = {
    //         mode: 'no-cors'
    //     }
 
    requestAPI(proxy, url);
}

function error() {
    console.log("esto es un error"); 
}

function requestAPI(proxy, url) {
    $.ajax({
        url: proxy + url,
        // success:function(data) { console.log(data);}
      })
      .done(data)
      .fail(error);
//     fetch( url, params)
//     .then(r => r.json())
//     .then(data => console.log(data))
//     .catch(e => console.log("algo salió mal", e));
}

[6464646, 64646464, 3737373 , 373737]

function requestFlickrAPI() {
    $.ajax({
        // url: 'https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=17ed078c88241373c5dec61766a24888&photo_id=25960415137&format=json&nojsoncallback=1'
        url: "https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=17ed078c88241373c5dec61766a24888&format=json&nojsoncallback=1",
        // url: 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=17ed078c88241373c5dec61766a24888&format=json&nojsoncallback=1',
        // format: "json"
    })
    .done(photos)
    .fail(error);
}

function photos(photoFlickr) {
    // console.log(photoFlickr);
    
    const photos = photoFlickr.photos.photo;
    // console.log(photos);
    let photoId;
    
    photos.forEach(element => {
        // console.log(element);
        
        photoId = element.id;
        // console.log(photoId);
           
    })

    idPhotos(photoId);
}

function idPhotos(photoId) {
    $.ajax({
        url: "https://cors-anywhere.herokuapp.com/https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=17ed078c88241373c5dec61766a24888&photo_id=" + photoId + "&format=json&nojsoncallback=1"
    })
    .done(accessPhoto)
    .fail(error);
}


function accessPhoto(urlPhotos) {
    // console.log(urlPhotos.photo);

    let farm = urlPhotos.photo.farm;
    let server = urlPhotos.photo.server;
    let secret = urlPhotos.photo.secret;
    let photoId = urlPhotos.photo.id;
    let format = urlPhotos.photo.originalformat;


    paintImages(farm, server, secret, photoId, format);
    // if(format !== undefined){
    //     console.log(format);
    //     paintImages(farm, server, secret, photoId, format);
    // }
   
    // console.log(format);
    // array.push(urlPhotos.photo);
    // console.log(array);
    // const filterFormat = array.filter(element => {
    //     // console.log(element.originalformat);
    //     return element.originalformat !== undefined;
        
    // filterFormat;
    
    
    
    // let urls = urlPhotos.photo.urls.url;
    // // console.log(urls);
    
    // urls.forEach(element => {
    //     // console.log(element);
        
    //     let images = element._content;
    //     // console.log(images);
        
        
    // })
}

// let count = 0;
// setInterval(function(){
//     // console.log(filterFormat);
//     let farm = filterFormat[count].farm;
//     let server = filterFormat[count].server;
//     let secret = filterFormat[count].secret;
//     let photoId = filterFormat[count].id;
//     let format = filterFormat[count].originalformat;
//      console.log(filterFormat[count]);
//      paintImages(farm, server, secret, photoId, format)
//      count++;
// }, 5000)



function paintImages(farm, server, secret, photoId, format) {
    // arrayURL.push(`https://farm${farm}.staticflickr.com/${server}/${photoId}_${secret}.${format}`);
    // console.log(arrayURL);    
    // let urlImage = `https://farm${farm}.staticflickr.com/ ${server}/ ${photoId}_ ${secret} .${format}`;
    container.style.backgroundImage = `url("https://farm${farm}.staticflickr.com/${server}/${photoId}_${secret}.${format}")`;
}

function data(weather) {
    
    // console.log(weather);
    
    let humidity = weather.currently.humidity;
    let uvIndex = weather.currently.uvIndex;
    let pressure = weather.currently.pressure;
    let wind = weather.currently.windSpeed;
    let temperature = weather.currently.temperature;
    // let time = weather.currently.time;

    let dataDaily = weather.daily.data;
    let newArray = dataDaily.slice(0, 7);

    newArray.forEach(element => {
        
        let temperatureMax = element.temperatureMax;
        let temperatureMin = element.temperatureMin;

        paintWeatherDaily(temperatureMax, temperatureMin);
    });
    paintWeather(humidity, uvIndex, pressure, wind, temperature);
}

function paintWeatherDaily(temperatureMax, temperatureMin) {
    console.log(temperatureMax, temperatureMin);
    let colTemperature = document.createElement("div");
    let h3TemperatureMax = document.createElement("h3");
    let h3TemperatureMin = document.createElement("h3");
    // let buttonTemperature = document.createElement("button");

    h3TemperatureMax.classList.add("hide", "show");
    h3TemperatureMin.classList.add("hide", "show");
    h3TemperatureMax.innerHTML = temperatureMax;
    h3TemperatureMin.innerHTML = temperatureMin;
    colTemperature.classList.add("col", "s12", "hide", "show");
    // buttonTemperature.classList.add("btn", "waves-effect", "waves-light", "hide", "show");
    // buttonTemperature.innerHTML = "Regresar";

    rowWeather.appendChild(colTemperature);
    colTemperature.appendChild(h3TemperatureMax);
    colTemperature.appendChild(h3TemperatureMin);
    // container.appendChild(buttonTemperature);
}

function paintWeather(humidity, uvIndex, pressure, wind, temperature) {
    
    let divCol = document.createElement("div");
    let h3Humidity = document.createElement("h3");
    let h3UvIndex = document.createElement("h3");
    let h3Pressure = document.createElement("h3");
    let h3Wind = document.createElement("h3");
    let h3Temperature = document.createElement("h3");
    // let h3Time = document.createElement("h3");
    let button = document.createElement("button");
    let buttonTemperature = document.createElement("button");

    divCol.classList.add("col", "s12");
    h3Humidity.setAttribute("id", "humidity");
    h3Humidity.innerHTML = humidity;
    h3Humidity.classList.add("element");

    h3UvIndex.setAttribute("id", "uv-index");
    h3UvIndex.innerHTML = uvIndex;
    h3UvIndex.classList.add("element");

    h3Pressure.setAttribute("id", "pressure");
    h3Pressure.innerHTML = pressure;
    h3Pressure.classList.add("element");

    h3Wind.setAttribute("id", "wind");
    h3Wind.innerHTML = wind;
    h3Wind.classList.add("element");

    h3Temperature.setAttribute("id", "temperature");
    h3Temperature.innerHTML = temperature;
    h3Temperature.classList.add("element");
    // h3Time.setAttribute("id", "time");
    // h3Time.innerHTML = time;
    button.classList.add("btn", "waves-effect", "waves-light", "element");
    button.setAttribute("type", "button");
    button.innerHTML = "Predicción de la semana";
    // button.setAttribute("data-change", "change");

    buttonTemperature.classList.add("btn", "waves-effect", "waves-light", "hide", "show");
    buttonTemperature.setAttribute("type", "button");
    buttonTemperature.innerHTML = "Regresar";

    rowWeather.appendChild(divCol);
    divCol.appendChild(h3Humidity);
    divCol.appendChild(h3Pressure);
    // divCol.appendChild(h3Time);
    divCol.appendChild(h3UvIndex);
    divCol.appendChild(h3Wind);
    divCol.appendChild(h3Temperature);
    container.appendChild(button);
    container.appendChild(buttonTemperature);

    button.addEventListener("click", changeElements);
    buttonTemperature.addEventListener("click", changeView);
}

function changeElements() {
    let elements = document.getElementsByClassName("element");
    let elementsDaily = document.getElementsByClassName("show");
    // console.log(elementsDaily);
    
    Array.from(elements).forEach(element => {
        element.classList.add("hide"); 
    })
    
    Array.from(elementsDaily).forEach(item => {
        item.classList.remove("hide");
        
    })
    // hola.style.display = "none"
}

function changeView() {
    let elements = document.getElementsByClassName("element");
    let elementsDaily = document.getElementsByClassName("show");
    
    Array.from(elements).forEach(element => {
        element.classList.remove("hide"); 
    })
    
    Array.from(elementsDaily).forEach(item => {
        item.classList.add("hide");
    })
}

function error() {
    console.log("error");
    
}

// function myJson(response) {
//     return response.json();
// }

// function dataAPI(data) {
//     console.log(data);
// }

// function errorAPI(error) {
//     console.log('error', error);
// }
$(document).ready(loadPage);
// window.onload = loadPage();