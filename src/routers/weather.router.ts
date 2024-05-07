import {Router, Response} from "express";
import {RequestWithQuery} from "../types";
import {HTTP_STATUSES} from "../utils";
import {WeatherService} from "../services/weather.service";
import {weatherValidator} from "../middlewares/validators/weather.validator";
import {WeatherQueryParams} from "../models/weather.input.models";
import {RequestGuard} from "../middlewares/guards/request.guard";
export const weatherRouter = Router({})

// @ts-ignore
weatherRouter.get('/', RequestGuard, weatherValidator(), async (req:RequestWithQuery<WeatherQueryParams>, res:Response):Promise<any> => {
    // @ts-ignore
    const { city, latitude, longitude } = req.query
    const weather = await WeatherService.getWeather(city, latitude, longitude)
    if (!weather) {
        return res.status(HTTP_STATUSES.NOT_FOUND_404).send({ error: 'Координаты для указанного города не найдены или указаны не правильно.' });
    }
    res.status(HTTP_STATUSES.OK_200).send(weather);
})
