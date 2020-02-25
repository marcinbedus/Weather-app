class Info {
    constructor() {
        this.city = 'dupa';
        this.icon = '';
        this.temp = 0;
        this.description = '';
        this.minTemp = 0;
        this.maxTemp = 0;
        this.pressure = 0;
        this.wind = 0;
    }

    updateInfoByCityName(e) {
        newInfo.getDataByCityName(e)
            .then(data => {
                this.city = data.name;
                this.icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
                this.temp = data.main.temp;
                this.description = data.weather[0].description;
                this.minTemp = data.main.temp_min;
                this.maxTemp = data.main.temp_max;
                this.pressure = data.main.pressure;
                this.wind = data.wind.speed;
                this.updateDisplay();
            })
    }

    updateInfoByCoordinates(lat, long) {
        newInfo.getDataByCoordinates(lat, long)
            .then(data => {
                this.city = data.name;
                this.icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
                this.temp = data.main.temp;
                this.description = data.weather[0].description;
                this.minTemp = data.main.temp_min;
                this.maxTemp = data.main.temp_max;
                this.pressure = data.main.pressure;
                this.wind = data.wind.speed;
                this.updateDisplay();
            })
    }

    updateDisplay() {
        const cityName = document.querySelector('.city-name h2');
        const temp  = document.querySelector('.temp h2');
        const description = document.querySelector('.temp p');
        const minTemp = document.querySelector('.min-temp p');
        const maxTemp = document.querySelector('.max-temp p');
        const pressure = document.querySelector('.pressure p');
        const wind = document.querySelector('.wind p');
        const icon = document.querySelector('.informations img');
        const info = document.querySelector('.informations');
        const details = document.querySelector('.details');

        info.style.display = 'flex';
        details.style.display = 'flex';

        cityName.innerText = this.city;
        temp.innerText = `${Math.round(this.temp - 273.15)} ℃`;
        description.innerText = this.description;
        minTemp.innerText = `Min: ${Math.round(this.minTemp - 273.15)} ℃`;
        maxTemp.innerText = `Max: ${Math.round(this.maxTemp - 273.15)} ℃`;
        pressure.innerText = `Current pressure: ${this.pressure} hPa`;
        wind.innerText = `Wind speed: ${this.wind} km/h`;
        icon.src = this.icon;
    }
}

class getInfo {
    constructor() {
        this.key = 'e92ca611f574b644e0e0f4f7f93bb4e3'
    }

    async getDataByCityName(e) {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${e}&appid=${this.key}`);
        const resData = await response.json();
        
        return resData;
    }

    async getDataByCoordinates(lat, long) {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${this.key}`)
        const resData = await response.json();

        return resData;
    }
}

const newInfo = new getInfo();
const info = new Info();

document.querySelector('.search-btn').addEventListener('click', cityValue);
window.addEventListener('DOMContentLoaded', getLocation);

function getLocation() {
    navigator.geolocation.getCurrentPosition(success)
}

function success(e) {
    info.updateInfoByCoordinates(e.coords.latitude, e.coords.longitude);
}

function cityValue(e) {
    const cityName = document.querySelector('#city-input-field').value;
    info.updateInfoByCityName(cityName);
    
    e.preventDefault();
}
