import { Component, OnInit } from '@angular/core';
import { WeatherService } from './service/weather.service';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'weather-app';

  WeatherAllData: any;
  temp: any;
  constructor(private weatherSvr: WeatherService, private http: HttpClient) {}
  weatherData = new FormGroup({
    cityName: new FormControl(''),
  });

  ngOnInit(): void {
    this.weatherSvr.getWeatherData().subscribe((response) => {
      // console.log(response);
      this.WeatherAllData = response;
      this.temp = this.WeatherAllData.main.temp - 273.9;
      // console.log(this.WeatherAllData);
      this.WeatherAllData.weather.forEach((res: any) => {
        if (res.description === 'mist' && res.description==='clear sky') {
          this.imgScaterred ='https://thumbs.gfycat.com/AcclaimedPracticalIslandwhistler-max-1mb.gif';
        }
        // else if(res.description==='clear sky')
        // {
        //    this.imgScaterred='https://i.pinimg.com/originals/8b/67/a7/8b67a7d721b80e074a2f96ad26b13807.gif';
        // }
      });
    });
  }

  // myData:any=[];
  //  WeatherData()
  //  {
  //
  //  }
  imgScaterred: any;
  displayWeatherData(data: any) {
    //  this.weatherSvr.setWeatherData(data).subscribe((response)=>{
    //   console.log(response);
    // this.WeatherAllData=response;
    // this.WeatherAllData.push(response);
    // console.log(this.WeatherAllData);
    this.http
      .post(
        `https://api.openweathermap.org/data/2.5/weather?q=${data.cityName}&appid=19d92a8a8be903a06d684f8a5cc7115f`,
        data.cityName
      )
      .subscribe((response) => {
        this.WeatherAllData = response;
        // this.WeatherAllData.push(response)
        console.log(this.WeatherAllData);
        this.weatherData.reset();
        this.temp = this.WeatherAllData.main.temp - 273.9;
        this.WeatherAllData.weather.forEach((res: any) => {
          console.log(res.description);
          if (res.description === 'scattered clouds') {
            console.log('yes');
            this.imgScaterred =
              'https://media1.giphy.com/media/yLrLQPkyz7dLYshVhO/giphy.gif';
          } else if (res.description === 'broken clouds') {
            this.imgScaterred = '../assets/brokenCouds.gif';
          } else if (res.description === 'haze') {
            this.imgScaterred =
              'https://thumbs.gfycat.com/AcclaimedPracticalIslandwhistler-max-1mb.gif';
          } else if (res.description === 'clear sky') {
            this.imgScaterred = '../assets/clear-sky.gif';
          } else {
            console.log('no');
          }
        });
      });
  }

  //  })
}
