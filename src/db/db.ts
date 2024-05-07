import { MongoMemoryServer } from "mongodb-memory-server-global-4.4";
import { MongoClient, Collection, Db } from "mongodb";
import {requestHistory} from "./db.types";

let mongoDb: MongoMemoryServer;
let client: MongoClient;
export let requestHistoryCollection:Collection<requestHistory>;

export const startDb = async () => {
    mongoDb = await MongoMemoryServer.create();
    const uri = mongoDb.getUri();
    client = new MongoClient(uri);

    try {
        await client.connect();
        const database:Db = client.db('weather-db');
        requestHistoryCollection = database.collection<requestHistory>('requestHistory');
        console.log('Локальная база данных подключена')
    } catch (e) {
        console.error('Ошибка при подключении к базе данных:', e);
        await client.close();
        await mongoDb.stop();
        process.exit(1); // Выход из приложения в случае ошибки
    }
};

export const stopDb = async () => {
    await client.close(); // Закрываем соединение с базой данных после завершения выполнения всех тестов
    await mongoDb.cleanup() // Чистим базу данных
    await mongoDb.stop(); // Останавливаем локальный сервер MongoDB
}