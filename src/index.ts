import {app, AppSettings} from "./settings";
import {startDb} from "./db/db";

const startApp = async () => {
    app.listen(AppSettings.PORT,async () => {
        console.log('Приложение запущено на порту =>', AppSettings.PORT)
    })
    await startDb()
}

startApp()
