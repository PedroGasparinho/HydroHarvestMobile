import { distBetweenEarthPoints } from "../regions";
import { cropStatusOrder, getCropStatus } from "../status";

export type Crop = {
    id: string,
    name: string,
    crop: string,
    cropStatus: string,
    averageDistance: number,
    location: string,
    image: string,
    systemsDetails: System[],
}

export type Crops = {
    crops: Crop[],
}

export const availableCrops = ["Agave", "Alpine Currant", "Aster", "Bald Cypress", "Barberry", "Begonia Coneflower", "Birch",
"Bleeding Heart", "Butterfly Weed", "Cactus", "Catmint", "Christmas Fern", "Crab Apple", "Daffodil", "Dalia", "Elderberry",
"Elm", "Hydragea", "Potentilla", "Willow"];

export const cropInServerMap = new Map<string, string>();
cropInServerMap.set("Agave", "Agave");
cropInServerMap.set("Alpine Currant", "Alpine_currant");
cropInServerMap.set("Aster", "Aster");
cropInServerMap.set("Bald Cypress", "Bald_Cypress");
cropInServerMap.set("Barberry", "Barberry");
cropInServerMap.set("Begonia Coneflower", "Begonia_Coneflower");
cropInServerMap.set("Birch", "Birch");
cropInServerMap.set("Bleeding Heart", "Bleeding_Heart");
cropInServerMap.set("Butterfly Weed", "Butterfly_Weed");
cropInServerMap.set("Cactus", "Cactus");
cropInServerMap.set("Catmint", "Catmint");
cropInServerMap.set("Christmas Fern", "Christmas_Fern");
cropInServerMap.set("Crab Apple", "Crab_Apple");
cropInServerMap.set("Daffodil", "Daffodil");
cropInServerMap.set("Dalia", "Dalia");
cropInServerMap.set("Elderberry", "Elderberry");
cropInServerMap.set("Elm", "Elm");
cropInServerMap.set("Hydragea", "Hydragea");
cropInServerMap.set("Potentilla", "Potentilla");
cropInServerMap.set("Willow", "Willow");

export type System = {
    name: string,
    ip: string,
    humidityLevel: number,
    tankLevel: number,
    temperatureLevel: number,
    lightLevel: number,
    status: string,
    latitude: number,
    longitude: number,
}

export type Weather = {
    weatherType: string,
    predWindDir: string, 
    windSpeed: string,
    rainIntensity: string,
    precipitaProb: number,
    tMax: number,
    tMin: number, 
}

export type Forecast = {
    yesterday: Weather,
    today: Weather,
    tomorrow: Weather,
}

export type Schedule = {
    startDate: Date,
    endDate: Date,
    done: boolean,
    isSuggestion: boolean,
}

export type ScheduleDTO = {
    startDate: string,
    endDate: string,
    done: boolean,
}

export function compareCrops(a: Crop, b: Crop) {
    const firstCriterion = a.averageDistance - b.averageDistance;
    const secondCriterion = cropStatusOrder(getCropStatus(a)) - cropStatusOrder(getCropStatus(b));
    const thirdCriterion = (a.name).localeCompare(b.name);
    if(firstCriterion !== 0) {
        return firstCriterion;
    } else if(secondCriterion !== 0) {
        return secondCriterion;
    } else {
        return thirdCriterion;
    }
}

export function compareSystems(a: System, b: System, userLat: number, userLon: number) {
    const aDistance = distBetweenEarthPoints(a.latitude, a.longitude, userLat, userLon);
    const bDistance = distBetweenEarthPoints(b.latitude, b.longitude, userLat, userLon);
    const firstCriterion = aDistance - bDistance;
    const secondCriterion = cropStatusOrder(a.status) - cropStatusOrder(b.status);
    const thirdCriterion = (a.name).localeCompare(b.name);
    if(firstCriterion !== 0) {
        return firstCriterion;
    } else if(secondCriterion !== 0) {
        return secondCriterion;
    } else {
        return thirdCriterion;
    }
}

export function getLastCropUpdate(c: Crop) {
    return new Date();

    /*if(c.systemsDetails.length === 0) {
        return new Date();
    } else {
        return [...c.systemsDetails].sort(systemSortByDate)[0].lastRead;
    }*/
}

/*export function systemSortByDate(a: System, b: System) {
    //return a.lastRead.getTime() - b.lastRead.getTime();
}*/

export function scheduleSortByDate(a: Schedule, b: Schedule) {
    const firstCriterion = a.startDate.getTime() - b.startDate.getTime();
    if(firstCriterion == 0) {
        return a.endDate.getTime() - b.endDate.getTime();
    } else {
        return firstCriterion;
    }
}