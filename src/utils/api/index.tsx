import { User } from "../../store/user.reducer";
import { Crop, System, cropInServerMap } from "../domain";
import { Region } from "../regions";

const GET = "GET";
const POST = "POST";
const PUT = "PUT";

export const PROXY : string = "http://4.182.99.186:8080/mobile";
export const BOARD : string = "http://192.168.1.125";

/*********************************** BOARD ***********************************/

export async function sendCropToBoard(crop: string) {
    console.log(BOARD + "/setPlantation");
    return await fetch(BOARD + "/setPlantation", {
        method: POST,
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
            plantation: crop
        })
    });
}

/*********************************** SERVER ***********************************/

export async function userExists(userId: string) {
    return await fetch(PROXY + "/userExists?userId=" + userId, {
        method: GET,
        headers: {"Content-Type":"application/json"},
    });
}

export async function addClient(user: User) {
    return await fetch(PROXY + "/addClient", {
        method: POST,
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
            name: user.name,
            id: user.id,
            mail: user.email,
            password: user.password,
        })
    });
}

export async function getAllCrops(user: User) {
    return await fetch(PROXY + "/getAllCrops?userId=" + user.id + "&password=" + user.password, {
        method: GET,
        headers: {"Content-Type":"application/json"},
    });
}

export async function getCrop(user: User, cropId: string) {
    return await fetch(PROXY + "/getCrop/" + cropId + "?userId=" + user.id + "&password=" + user.password, {
        method: GET,
        headers: {"Content-Type":"application/json"},
    });
}

export async function addCrop(name: string, region: string, crop: string, user: User, lat: number, lon: number, ip: string, systemName: string) {
    return await fetch(PROXY + "/addCrop", {
        method: POST,
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
            systems: [
                {
                    latitude: lat,
                    longitude: lon,
                    ip: ip,
                    name: systemName
                }
            ],
            name: name,
            location: region,
            crop: cropInServerMap.get(crop),
            password: user.password,
            idUser: user.id
        })
    });
}

export async function addSystem(cropId: string, user: User, lat: number, lon: number, ip: string, systemName: string) {
    return await fetch(PROXY + "/addSystem/" + cropId + "?userId=" + user.id + "&password=" + user.password, {
        method: POST,
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
            latitude: lat,
            longitude: lon,
            ip: ip,
            name: systemName
        })
    });
}

export async function changeName(crop: Crop, user: User, name: string) {
    return await fetch(PROXY + "/changeName/" +  crop.id + "?userId=" + user.id + 
                        "&password=" + user.password + "&name=" + name, {
        method: PUT,
        headers: {"Content-Type":"application/json"},
    });
}

export async function changeSystemName(crop: Crop, user: User, system: System, name: string) {
    return await fetch(PROXY + "/changeSystemName/" +  crop.id + "?userId=" + user.id + 
                        "&password=" + user.password + "&systemIp=" + system.ip + "&name=" + name, {
        method: PUT,
        headers: {"Content-Type":"application/json"},
    });
}

export async function addWater(crop: Crop, user: User, system: System, startDate: Date, endDate: Date) {
    return await fetch(PROXY + "/addWater/" +  crop.id + "?userId=" + user.id + 
                        "&password=" + user.password, {
        method: POST,
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
            startDate: startDate,
            endDate: endDate,
            systems: [system.ip]
        })
    });
}

export async function getWater(crop: Crop, user: User, system: System) {
    return await fetch(PROXY + "/getWater/" +  crop.id + "?userId=" + user.id + 
                        "&password=" + user.password + "&systemIp=" + system.ip, {
        method: GET,
        headers: {"Content-Type":"application/json"},
    });
}

export async function getWateringForecast(crop: Crop, user: User, system: System) {
    return await fetch(PROXY + "/wateringForecast/" +  crop.id + "?userId=" + user.id + 
                        "&password=" + user.password + "&systemIp=" + system.ip, {
        method: GET,
        headers: {"Content-Type":"application/json"},
    });
}

export async function getWeather(region: Region) {
    return await fetch(PROXY + "/getWeather?region=" + region.name, {
        method: GET,
        headers: {"Content-Type":"application/json"},
    });
}

export async function addUserCrop(crop: Crop, userToAdd: string, userInCrop: User) {
    return await fetch(PROXY + "/addUserCrop/" +  crop.id + "?userIdToAdd=" + userToAdd + 
                        "&userId=" + userInCrop.id + "&password=" + userInCrop.password, {
        method: PUT,
        headers: {"Content-Type":"application/json"},
    });
}