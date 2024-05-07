import {query} from "express-validator";
import {inputValidationMiddleware } from "../inputValidation/inputValidation.middleware";

const cityNameValidator = query('city')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Incorrect city Name');

const latitudeValidator = query('latitude')
    .optional()
    .isNumeric()
    .isLength({ min: 1, max: 500 })
    .withMessage('Incorrect latitude');

const longitudeValidator = query('longitude')
    .optional()
    .isNumeric()
    .isLength({ min: 1, max: 500 })
    .withMessage('Incorrect longitude');

export const weatherValidator = () => [
    cityNameValidator,
    latitudeValidator,
    longitudeValidator,
    inputValidationMiddleware
];
