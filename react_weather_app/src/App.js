import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import 'weather-icons-master/css/weather-icons.css';
import Form from "./app_componen/form.component"
import Weather from './app_componen/weather.component'
const api_key="2732bc864e567558ccfab7fdf453b5ab";

class App extends React.Component{
  constructor(){
    super();
    this.state={
      city:undefined,
      country:undefined,
      icon:undefined,
      main:undefined,
      celsius:undefined,
      temp_max:undefined,
      temp_min:undefined,
      description:"",
      error:false

    };
    // this.getWeather();
    this.weatherIcon={
      Thunderstorm:"wi-thunderstorm",
      Drizzle:"wi-sleet",
      Rain:"wi-storm-showers",
      snow:"wi-snow",
      Atmosphere:"wi-fog",
      Clear:"wi-day-sunny",
      Clouds:"wi-day-fog"
    }
  }
  calCelsius(temp){
    let cell=Math.floor(temp-273.15)

    return cell
  }
  get_WeatherIcon(ic,rid){
    switch(true){
      case rid>=200 && rid<=232:
        this.setState({icon:this.weatherIcon.Thunderstorm})
        break

      case rid>=300 && rid<=321:
        this.setState({icon:this.weatherIcon.Drizzle})
        break
      case rid>=500 && rid<=531:
        this.setState({icon:this.weatherIcon.Rain})
        break
      case rid>=600 && rid<=622:
        this.setState({icon:this.weatherIcon.Snow})
        break
      case rid>=700 && rid<=781:
        this.setState({icon:this.weatherIcon.Atmosphere})
        break
      case rid===800:
        this.setState({icon:this.weatherIcon.Clear})
        break
      case rid>=801 && rid<=804:
        this.setState({icon:this.weatherIcon.Clouds})
        break
      default:
        this.setState({icon:this.weatherIcon.Clouds})
    }
  }
  getWeather=async (e)=>{
    e.preventDefault();
    const city=e.target.elements.city.value
    const country=e.target.elements.city.value
    if (city && country){
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${api_key}`)
    const response = await api_call.json()
    console.log(response)
    this.setState({
      
      city:`${response.name}, ${response.sys.country}`,
      
      celsius:this.calCelsius(response.main.temp),
      temp_max:this.calCelsius(response.main.temp_max),
      temp_min:this.calCelsius(response.main.temp_min),
      description:response.weather[0].description,
      error:false
      
    })
    this.get_WeatherIcon(this.weatherIcon,response.weather[0].id)
  }else{
    this.setState({error:true})
  }
  }
  render(){
    return(
      <div className="App">
        <Form loadweather={this.getWeather} error={this.state.error}/>
        <Weather city={this.state.city} country={this.state.country} temp_celsius={
          this.state.celsius
        }
        temp_max={this.state.temp_max}
        temp_min={this.state.temp_min}
        description={this.state.description}
        weatherIcon={this.state.icon}/>

      </div>
    )
  }
}


export default App;
