import {AppSettings} from "../settings";
import {OutputWeatherModel} from "../models/weather.output.models";
export const WeatherMapper = (forecastData:any):OutputWeatherModel[] => {
    const daysToCheck =  AppSettings.days; // Количество дней наперед для прогноза

    const temperatureForecast = [];
    const currentTime = new Date();

    for (let i = 0; i < forecastData.length && temperatureForecast.length < daysToCheck; i++) {
        const forecastTime = new Date(forecastData[i].time);
        const temperature = forecastData[i].data.instant.details.air_temperature;

        // Проверяем, что прогноз находится в указанном временном окне и в следующих вышеуказанных днях
        if (forecastTime.getHours() === AppSettings.timeZone && Math.abs(forecastTime.getTime() - currentTime.getTime()) <= (daysToCheck * 24 * 60 * 60 * 1000)) {
            temperatureForecast.push({date: forecastTime.toDateString(), temperature: temperature});
        }
    }
    return temperatureForecast
}