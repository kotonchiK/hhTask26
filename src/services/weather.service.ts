import {AppSettings} from "../settings";
import {OutputWeatherModel} from "../models/weather.output.models";
import {WeatherMapper} from "../mappers/weather.mapper";
import {CoordinatesModel} from "../models/weather.input.models";

export class WeatherService {
    public static async getWeather(city:string | undefined, latitude:number | undefined, longitude:number | undefined):Promise<OutputWeatherModel[] | null> {
        if (!city && !latitude && !longitude) return null

        let coordinates;

        if (city) {
            coordinates = await this.getCoordinates(city);
        } else {
            coordinates = { latitude: Number(latitude), longitude: Number(longitude) };
        }
        // Проверяем, получены ли координаты
        if (!coordinates) return null

        return await this.getWeatherForecast(coordinates.latitude, coordinates.longitude)
    }

   private static async getCoordinates(city:string):Promise<CoordinatesModel | null> {
        try {
            // Запрос к API на получении координат по названию города
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`);
            const data = await response.json();
            const latitude = parseFloat(data[0]?.lat);
            const longitude = parseFloat(data[0]?.lon);
            return { latitude, longitude };
        } catch (error) {
            console.error('Ошибка при получении координат:', error);
            return null;
        }
    }
    private static async getWeatherForecast(lat:number, lon:number):Promise<OutputWeatherModel[] | null> {
        try {
            // Запрос к API на получение погодных условий
            // Заголовок User-Agent должен содержать название проекта и адрес почты, иначе будет 403(Forbidden) ошибка
            const response = await fetch(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`, {
                headers: {
                    'User-Agent': `${AppSettings.User_Agent_Name} (${AppSettings.User_Agent_Mail})`
                }
            });
            const data = await response.json();

            const weather = data.properties.timeseries;

            return WeatherMapper(weather)
        } catch (error) {
            console.error('Ошибка при получении прогноза погоды:', error);
            return null;
        }
    }
}


