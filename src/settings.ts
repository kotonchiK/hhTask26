import express from "express";
import {weatherRouter} from "./routers/weather.router";
import dotenv from "dotenv";

dotenv.config();

export const app = express()

app.use(express.json())
app.use('/weather', weatherRouter)

export const AppSettings = {
    PORT:Number(process.env.PORT) || 3000, // Порт для запуска App
    days:5, // Количество дней наперед для прогноза
    timeZone:14, // Временное окно для сортировки, Например: time:14 - сортировка приближенная к 14:00
    User_Agent_Name:process.env.USER_AGENT_NAME || 'weather 1.0', // Для API заголовка в yr.no
    User_Agent_Mail:process.env.USER_AGENT_MAIL || 'testEmail@mail.ru', // Для API заголовка в yr.no
    Request_Times_Zone:10_000, // Временная зона запросов (в миллисекундах), 10_000 = 10 секундам
    Number_Of_Request:3, // Количество запросов за вышеуказанное время
}