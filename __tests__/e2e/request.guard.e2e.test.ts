import {app, AppSettings} from "../../src/settings";
import supertest from "supertest";
import {startDb, stopDb} from "../../src/db/db";

describe('Request Guard', () => {

    beforeAll(async () => {
        await startDb()
    })

    afterAll(async () => {
        await stopDb()
    });

    it('should return status 200', async () => {

        const res = await supertest(app)
            .get('/weather')
            .query({ city: 'Moscow' });


        expect(res.status).toEqual(200);
    });

    it('should return 429', async () => {

        AppSettings.Number_Of_Request = 2

        await supertest(app)
            .get('/weather')
            .query({ city: 'Moscow' });
        await supertest(app)
            .get('/weather')
            .query({ city: 'Moscow' });
        const res = await supertest(app)
            .get('/weather')
            .query({ city: 'Moscow' });

        expect(res.status).toEqual(429);
    });

});
