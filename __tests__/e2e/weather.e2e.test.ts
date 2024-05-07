import {app} from "../../src/settings";
import supertest from "supertest";
import {startDb, stopDb} from "../../src/db/db";

describe('Weather API', () => {

    beforeAll(async () => {
        await startDb()
    })

    afterAll(async () => {
        await stopDb()
    });

    it('should return weather data by city', async () => {

        const res = await supertest(app)
            .get('/weather')
            .query({ city: 'Moscow' });


        expect(res.status).toEqual(200);
        expect(res.body).toEqual(expect.any(Array))
    });

    it('should return 404 error for invalid city', async () => {
        // @ts-ignore
        const res = await supertest(app)
            .get('/weather')
            .query({ city: 'InvalidCityName' });

        expect(res.status).toEqual(404);
        expect(res.body).toHaveProperty('error');
    });

    it('should return weather data by latitude and longitude', async () => {
        const res = await supertest(app)
            .get('/weather')
            .query({ latitude: 55.7558, longitude: 37.6176 });

        expect(res.status).toEqual(200);
        expect(res.body).toEqual(expect.any(Array))
    });

    it('should return 404 error for invalid latitude and longitude', async () => {
        const res = await supertest(app)
            .get('/weather')
            .query({ latitude: 'invalid', longitude: 'invalid' });

        expect(res.status).toEqual(400);
        expect(res.body).toHaveProperty('error');
    });
});
