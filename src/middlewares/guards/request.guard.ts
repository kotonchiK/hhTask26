import {NextFunction, Request, Response} from "express";
import {HTTP_STATUSES} from "../../utils";
import {requestHistory} from "../../db/db.types";
import {requestHistoryCollection} from "../../db/db";
import {AppSettings} from "../../settings";
export const RequestGuard = async (req:Request, res:Response, next:NextFunction) => {
    const Data:requestHistory = {
        IP:req.ip??"0.0.0.0",
        URL:req.originalUrl,
        date:new Date()
    };
    const filter = {
        "IP":Data.IP,
        "URL":Data.URL,
        "date":{$gte:new Date(Date.now() - AppSettings.Request_Times_Zone)},
    };
    const requestsCount = await requestHistoryCollection.countDocuments(filter);
    if(requestsCount >= AppSettings.Number_Of_Request) {
        res.sendStatus(HTTP_STATUSES.TOO_MANY_REQUESTS_429)
        return
    }
    await requestHistoryCollection.insertOne(Data);
    next();
}