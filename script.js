const apikey = "&appid=874e9abdbacc4c5b779c77d78ae6c29c";
const url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="



async function checkweather(query) {
    fetch(`${url}${query}${apikey}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data.name);
            bindData(data);
        }).catch((e) => {
            console.log(e.message);
        })

};
function bindData(data) {
    const temp = document.getElementById('tempnum');
    const city = document.getElementById('city');
    const wind = document.getElementById('windnum');
    const humidity = document.getElementById('humiditynum');
    const description = document.getElementById('description');
    const sunrise = document.getElementById('sunrisetime');
    const sunset = document.getElementById('sunsettime');

    console.log(data);

    // temp.innerHTML="";
    // city.innerHTML="";
    // wind.innerHTML="";
    // humidity.innerHTML="";

    temp.innerHTML = Math.round(data.main.temp);
    city.innerHTML = data.name;
    humidity.innerHTML = Math.round(data.main.humidity);
    wind.innerHTML = Math.round(data.wind.speed);
    description.innerText = data.weather[0].description;

   
    // sunrise.innerHTML=new Date(data.dt*1000+(data.timezone*1000));
    sunrise.innerHTML = TimeConversion(new Date((data.timezone+data.sys.sunrise)*1000));
    sunset.innerHTML = TimeConversion(new Date((data.timezone+data.sys.sunset)*1000));
    
    function TimeConversion(time){
        return `${(time.getUTCHours())}:${(time.getUTCMinutes())}:${(time.getUTCSeconds())}`;
    }


};


const searchbtn = document.getElementById('searchbutton');
const searchtext = document.getElementById('search-text');

searchbtn.addEventListener('click', () => {
    if (!searchtext.value) {
        return;
    }
    checkweather(searchtext.value);

});