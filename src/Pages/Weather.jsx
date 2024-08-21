import React, { useEffect, useRef, useState } from 'react'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import './Styles/Weather.css'

function Weather() {
  
  const inputRef = useRef()
  const [weatherData,setWeatherData]=useState(false);
  const [forecastData, setForecastData] = useState([]);
  const [currentDay, setCurrentDay] = useState('');

  const allIcons={
    "01d":clear_icon,
    "01n":clear_icon,
    "02d":cloud_icon,
    "02n":cloud_icon,
    "03d":cloud_icon,
    "03n":cloud_icon,
    "04d":drizzle_icon,
    "04n":drizzle_icon,
    "09d":rain_icon,
    "09n":rain_icon,
    "10d":rain_icon,
    "10n":rain_icon,
    "13d":snow_icon,
    "13n":snow_icon
  }

  const search =async(city)=>{
    if(city===""){
      alert("Enter City Name");
      return
    }

    try{
      const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const respone =await fetch(url);
      const data = await respone.json();

      if(!respone.ok){
        alert(data.message)
        return;
      }
     
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity:data.main.humidity,
        windspeed:data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location:data.name,
        icon:icon,
        dt:data.dt
      });
   
    const date = new Date(data.dt * 1000); 
    const options = { weekday: 'long' }; 
    setCurrentDay(date.toLocaleDateString('en-US', options));
       const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
       const forecastResponse = await fetch(forecastUrl);
       const forecastData = await forecastResponse.json();
       const dailyData = forecastData.list.filter((item) =>
         item.dt_txt.includes("12:00:00")
       );
       setForecastData(dailyData);
    }catch (error){
      setWeatherData(false)
      console.error("Error in fetching weather data")

    }

  }

  useEffect(()=>{

    search("kochi")

  },[])


  return (
    <>
    <div className='app'>
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder='search' />
        <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)} />
      </div>
      {weatherData?<>
        <img src={weatherData.icon} alt="" className='weather-icon' />
      <p className='temperature'>{weatherData.temperature}°c</p>
      <p className='city'>{weatherData.location}</p>
      <p className='date'>{currentDay}</p> 
      <div className="weather-data">
        <div className="col">
          <img src={humidity_icon} alt="" />
          <div>
            <p>{ weatherData.humidity} %</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind_icon} alt="" />
          <div>
            <p>{weatherData.windspeed} km/h</p>
            <span>Wind</span>
          </div>
        </div> 
      </div>


      <div className='forecast'>
            {forecastData.length > 0 ? (
              forecastData.map((day, index) => (
                <div className="days" key={index}>
                  <span>{new Date(day.dt_txt).toLocaleDateString('en-US', { weekday: 'long' })}</span>
                  <div className='forecast-img'>
                    <img src={allIcons[day.weather[0].icon] || clear_icon} alt="Forecast Icon" />
                  </div>
                  <div className='forecast-details'>
                    <p>{Math.floor(day.main.temp)}°c</p>
                    <p>{day.weather[0].description}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className='error-msg'>No forecast data available</p>
            )}
          </div>
      </>:<></>}
    </div>
    </div>
    </>
  )
}

export default Weather
