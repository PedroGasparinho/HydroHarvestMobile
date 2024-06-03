import { hashCode } from "..";
import { User } from "../../store/user.reducer";
import { Crop, System, cropInServerMap } from "../domain";
import { Region, regions } from "../regions";

const GET = "GET";
const POST = "POST";
const PUT = "PUT";

export const PROXY : string = "http://98.67.195.96:8080/mobile";
export const BOARD : string = "http://192.168.1.125";

export async function getDataBoard() {
    return await fetch(BOARD + "/getValue", {
        method: GET,
        headers: {"Content-Type":"application/json"},
    });
}

export async function setStartWatering() {
    return await fetch(BOARD + "/setStartWatering", {
        method: POST,
        headers: {"Content-Type":"application/json"},
    });
}

export async function setStoptWatering() {
    return await fetch(BOARD + "/setStoptWatering", {
        method: POST,
        headers: {"Content-Type":"application/json"},
    });
}

//DONE
export async function userExists(userId: string) {
    return await fetch(PROXY + "/userExists?userId=" + userId, {
        method: GET,
        headers: {"Content-Type":"application/json"},
    });
}

//DONE
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

//DONE
export async function getAllCrops(user: User) {
    return await fetch(PROXY + "/getAllCrops?userId=" + user.id + "&password=" + user.password, {
        method: GET,
        headers: {"Content-Type":"application/json"},
    });
}

//DONE
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

//DONE
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

//http://localhost:8080/mobile/addUserCrop/SVbNWWOiNVUhnUGyZyHk?userIdToAdd=59731&userId=60580&password=Gaspi      PUT
//TODO - low
export async function addUserCrop(crop: any, userToAdd: any, userInCrop: any) {
    return await fetch(PROXY + "/addUserCrop/" +  crop.id + "?userIdToAdd=" + userToAdd.id + 
                        "&userId=" + userInCrop.id + "&password=" + userInCrop.password, {
        method: PUT,
        headers: {"Content-Type":"application/json"},
    });
}

//http://localhost:8080/mobile/changeName/SVbNWWOiNVUhnUGyZyHk?userId=59731&password=didi&name=QuintadoRoger    PUT
//TODO - low
export async function changeName(crop: any, user: any, name: string) {
    return await fetch(PROXY + "/changeName/" +  crop.id + "?userId=" + user.id + 
                        "&password=" + user.password + "&name=" + name, {
        method: PUT,
        headers: {"Content-Type":"application/json"},
    });
}

//http://localhost:8080/mobile/changeSystemName/SVbNWWOiNVUhnUGyZyHk?userId=59731&password=didi&systemIp=192.168.1.100&name=norte   PUT
//TODO - low
export async function changeSystemName(crop: any, user: any, system: any, name: string) {
    return await fetch(PROXY + "/changeSystemName/" +  crop.id + "?userId=" + user.id + 
                        "&password=" + user.password + "&systemIp=" + system.ip + "&name=" + name, {
        method: PUT,
        headers: {"Content-Type":"application/json"},
    });
}


//http://localhost:8080/mobile/addWater/SVbNWWOiNVUhnUGyZyHk?userId=59731&password=didi          POST
//TODO - high
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

//http://localhost:8080/mobile/getInformation?plant=Begonia_Coneflower&userId=59731&password=didi GET
//TODO - mid
export async function getInformation(user: any, plant: any) {
    return await fetch(PROXY + "/getInformation?plant=" + plant.name + "&userId=" + user.id + 
                        "&password=" + user.password, {
        method: GET,
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
            startDate:"2024-05-10T00:00:00.000+00:00",
            endDate:"2024-05-20T00:00:00.000+00:00",
            systems: ["192.168.1.100","192.168.1.101"]
        })
    });
}

//http://localhost:8080/mobile/getWater/SVbNWWOiNVUhnUGyZyHk?userId=59731&password=didi&systemIp=192.168.1.100 GET
//TODO - high
export async function getWater(crop: Crop, user: User, system: System) {
    return await fetch(PROXY + "/getWater/" +  crop.id + "?userId=" + user.id + 
                        "&password=" + user.password + "&systemIp=" + system.ip, {
        method: GET,
        headers: {"Content-Type":"application/json"},
    });
}

//http://localhost:8080/mobile/wateringForecast/SVbNWWOiNVUhnUGyZyHk?userId=59731&password=didi&systemIp=192.168.1.100  GET
//TODO - high
export async function getWateringForecast(crop: Crop, user: User, system: System) {
    return await fetch(PROXY + "/wateringForecast/" +  crop.id + "?userId=" + user.id + 
                        "&password=" + user.password + "&systemIp=" + system.ip, {
        method: GET,
        headers: {"Content-Type":"application/json"},
    });
}

//http://4.157.98.148:8080/mobile/getWeather?region=Setúbal     GET
//TODO - high
export async function getWeather(region: Region) {
    return await fetch(PROXY + "/getWeather?region=" + region.name, {
        method: GET,
        headers: {"Content-Type":"application/json"},
    });
}





