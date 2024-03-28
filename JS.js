//weather app

const weatherForm=document.querySelector(".weather")
const cityInput=document.querySelector(".cityInput");
const card=document.querySelector(".card");
const apiKey="63c475b30ea9d0109b1ef6b392112f58";

weatherForm.addEventListener("submit",async event=>{
    event.preventDefault();

    const city = cityInput.value;

    if(city){
        try{
            const weatherData= await getWeatherData(city); 
            displayWeatherinfo(weatherData);
        }
        catch(error){
            console.error(error); // Log the error
            displayerror(error);
        }

    }
    else{
        displayerror("Please enter a city");
    }
});
async function getWeatherData(city){
    const apiURL=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response=await fetch(apiURL);
    
    if(!response.ok){
        throw new Error("Could not fetch weather api")
    }
    return await response.json();
}

function displayWeatherinfo(data){
    const {name:city,
            main:{temp,humidity},
            weather:[{
                description,id}]}=data;
    card.textContent="";
    card.style.display="flex";
    const cityDiplay=document.createElement("h1");
    const tempDislay=document.createElement("p");
    const humidityDiplay=document.createElement("p");
    const descDiplay=document.createElement("p");
    const weatherEmoji=document.createElement("p");

    cityDiplay.textContent=city;
    cityDiplay.classList.add("Citydis");
    tempDislay.textContent=`${(temp-273.15).toFixed(1)}°C`
    tempDislay.classList.add("tempDisplay")
    humidityDiplay.textContent="Humanity:"+`${humidity}`+"%";
    humidityDiplay.classList.add("HumanityDisplay")
    descDiplay.textContent=description;
    descDiplay.classList.add("descDisplay");
    weatherEmoji.textContent=getWeatherEmoji(id);
    weatherEmoji.classList.add("weatherEmoji");

    card.appendChild(cityDiplay);
    card.appendChild(tempDislay);
    card.appendChild(humidityDiplay);
    card.appendChild(descDiplay);
    card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId){
    switch(true){
        case(weatherId>=200 && weatherId<300):
        return "⛈️";
        case(weatherId>=300 && weatherId<400):
        return "🌦️";
        case(weatherId>=400 && weatherId<500):
        return "⛈️";
        case(weatherId>=500 && weatherId<600):
        return "🌨️";
        case(weatherId>=600 && weatherId<700):
        return "🌫️";
        case(weatherId==800):
        return "☀️";
        case(weatherId>=801 && weatherId<810):
        return "☁️";
        default:
            return "❔";
        



    }
}

function displayerror(message){
    const errDisplay=document.createElement("p")
    errDisplay.textContent=message;
    errDisplay.classList.add("errorDisplay");
    
    card.textContent="";
    card.style.display="flex";
    card.appendChild(errDisplay);
}
