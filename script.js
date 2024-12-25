const container = document.querySelector('.container');
const search = document.querySelector('#search-btn');
const weatherbox = document.querySelector('.weather-box');
const weatherdetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityhide = document.querySelector('.city-hide');

search.addEventListener('click', async () => {
    const APIKey = '9f8859a525a4c7a13ed816fafb2fb1e6';
    const city = document.querySelector('.search-box input').value; // Corrected

    if (city === '') return;

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`);

        // If the city is not found, the API will return a 404 status
        if (!response.ok) {
            throw new Error('City not found');
        }

        const json = await response.json();
        
        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        if (cityhide.textContent === city) {
            return;
        } else {
            cityhide.textContent = city;
            container.style.height = '555px';
            container.classList.add('active');
            weatherbox.classList.add('active');
            weatherdetails.classList.add('active');
            error404.classList.remove('active');

            setTimeout(() => {
                container.classList.remove('active');
            }, 2500);

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'clear.png';
                    break;
                case 'Rain':
                    image.src = 'rain.png';
                    break;
                case 'Snow':
                    image.src = 'snow.png';
                    break;
                case 'Clouds':
                    image.src = 'cloud.png';
                    break;
                case 'Mist':
                case 'Haze':
                    image.src = 'mist.png';
                    break;
                default:
                    image.src = 'error.png';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            // Clone the info sections and add them
            const infoweather = document.querySelector('.info-weather');
            const infohumidity = document.querySelector('.info-humidity');
            const infowind = document.querySelector('.info-wind');

            const elcloneinfoweather = infoweather.cloneNode(true);
            const elcloneinfohumidity = infohumidity.cloneNode(true);
            const elcloneinfowind = infowind.cloneNode(true);

            elcloneinfoweather.id = 'clone-info-weather';
            elcloneinfoweather.classList.add('active-clone');
            elcloneinfohumidity.id = 'clone-info-humidity';
            elcloneinfohumidity.classList.add('active-clone');
            elcloneinfowind.id = 'clone-info-wind';
            elcloneinfowind.classList.add('active-clone');

            setTimeout(() => {
                infoweather.insertAdjacentElement("afterend", elcloneinfoweather);
                infohumidity.insertAdjacentElement("afterend", elcloneinfohumidity);
                infowind.insertAdjacentElement("afterend", elcloneinfowind);
            }, 2200);

            const cloneinfoweather = document.querySelectorAll('.info-weather.active-clone');
            const totalcloneinfoweather = cloneinfoweather.length;
            const cloneinfoweatherfirst = cloneinfoweather[0];

            const cloneinfohumidity = document.querySelectorAll('.info-humidity.active-clone');
            const cloneinfohumidityfirst = cloneinfohumidity[0];

            const cloneinfowind = document.querySelectorAll('.info-wind.active-clone');
            const cloneinfowindfirst = cloneinfowind[0];

            if (totalcloneinfoweather > 0) {
                cloneinfoweatherfirst.classList.remove('active-clone');
                cloneinfohumidityfirst.classList.remove('active-clone');
                cloneinfowindfirst.classList.remove('active-clone');

                setTimeout(() => {
                    cloneinfoweatherfirst.remove();
                    cloneinfohumidityfirst.remove();
                    cloneinfowindfirst.remove();
                }, 2200);
            }
        }
    } catch (error) {
        //console.log(error);

        // If an error occurs (such as a wrong city), show the 404 image and the "City not found" message
        const image = document.querySelector('.not-found .box img');
        image.src = 'error.png';
        image.height = " 40";
        image.width = " 40";
        //alert('City not found!');
        error404.classList.add('active');
        weatherbox.classList.remove('active');
        weatherdetails.classList.remove('active');
        container.style.height = '400px';

        
    }
});
