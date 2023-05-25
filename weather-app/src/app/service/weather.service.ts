import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http:HttpClient) { }
  ApiUrl='https://api.openweathermap.org/data/2.5/weather?q=lucknow&appid=19d92a8a8be903a06d684f8a5cc7115f';


getWeatherData()  
{
  return this.http.get(`${this.ApiUrl}`);
}
setWeatherData(data:any)
{
    return this.http.post(`https://api.openweathermap.org/data/2.5/weather?q=+${data}&appid=19d92a8a8be903a06d684f8a5cc7115f`,data)
}


}
