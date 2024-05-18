import { Status, cropStatusOrder, getCropStatus } from "../status";

export type Crop = {
    name: string,
    cropName: string,
    distance: number,
    isWatering: boolean,
    systems: System[],
}

export type System = {
    name: string,
    type: string,
    humidity: number,
    tankLevel: number,
    temperature: number,
    light: number,
    status: Status,
    lastRead: Date,
}

export type Schedule = {
    startDate: Date,
    endDate: Date,
    isSuggestion: boolean,
    systems: System[],
}

export function compareCrops(a: Crop, b: Crop) {
    const firstCriterion = a.distance - b.distance;
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

export function getLastCropUpdate(c: Crop) {
    return [...c.systems].sort(systemSortByDate)[0].lastRead;
}

export function systemSortByDate(a: System, b: System) {
    return a.lastRead.getTime() - b.lastRead.getTime();
}

export function scheduleSortByDate(a: Schedule, b: Schedule) {
    const firstCriterion = a.startDate.getTime() - b.startDate.getTime();
    if(firstCriterion == 0) {
        return a.endDate.getTime() - b.endDate.getTime();
    } else {
        return firstCriterion;
    }
}