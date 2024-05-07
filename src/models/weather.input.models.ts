export type CoordinatesModel = {
    longitude:number
    latitude:number
}

export type WeatherQueryParams = {
    city: string

        } | {

    latitude: number;
    longitude: number
};