import { DimensionValue } from "react-native";
import ActionWithIconComponent from "../components/ActionWithIconComponent";
import SpaceComponent from "../components/SpaceComponent";

/***************************************************** TYPES ******************************************************/

export type Icon = {
    name: string,
    color: string,
    backgroundColor: string,
}

export type Action = {
    icon: Icon,
    action: () => void,
}

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

export enum Property {
    Humidity = "Humidity",
    TankLevel = "Tank level",
    Temperature = "Temperature",
    Light = "Light",
}

export enum Dimension {
    Width,
    Height,
}

export enum Status {
    Great = "Great",
    Good = "Good",
    Okay = "Okay",
    Bad = "Bad",
    Critical = "Critical",
}

export enum StatusColor {
    Great = "#0A6847",
    Good = "#87A922",
    Okay = "#FFC000",
    Bad = "#FF8911",
    Critical = "#A94438",
}

/*************************************************** CONSTANTS ***************************************************/

//Page Constants
export const PAGE_TITLE_SIZE = 30;
export const PAGE_SUBTITLE_SIZE = 18;
export const PAGE_ICON_SIZE = 35;

//Item Constants
export const ITEM_TITLE_SIZE = 16;
export const ITEM_TEXT_SIZE = 13;
export const ITEM_ICON_SIZE = 20;
export const ITEM_BACK_COLOR = "#DDDDDD";

//Bottom Bar Constants
export const BOTTOM_BAR_ICON_SIZE = 30;
export const BOTTOM_BAR_FONT_SIZE = 15;
export const BOTTOM_BAR_ACTIVE_COLOR = "#0A6847";
export const BOTTOM_BAR_INACTIVE_COLOR = "#000000";

//Global text-related constants
export const TEXT_COLOR = "#000000";

//Global border-related constants
export const BORDER_COLOR = "#444444"; 

//Global icon-related constants
export const ICON_MAIN_COLOR = "#000000";
export const ICON_BACK_COLOR = "#AAAAAA";

export const WATER_ICON_MAIN_COLOR = "#39A7FF";
export const WATER_ICON_BACK_COLOR = "#CAF4FF";

export const DELETE_ICON_MAIN_COLOR = "#D80032";
export const DELETE_ICON_BACK_COLOR = "#FFB0B0";

export const ICON_RADIUS = 100;
export const PROPERTY_ICON_SIZE = 50;


/*************************************************** FUNCTIONS ***************************************************/

export function cropStatusToColor(status: Status) {
    switch(status) {
        case Status.Great:
            return StatusColor.Great;
        case Status.Good:
            return StatusColor.Good;
        case Status.Okay:
            return StatusColor.Okay;
        case Status.Bad:
            return StatusColor.Bad;
        case Status.Critical:
            return StatusColor.Critical;
    }
}

export function cropStatusOrder(status: Status) : number {
    switch(status) {
        case Status.Great:
            return 4;
        case Status.Good:
            return 3;
        case Status.Okay:
            return 2;
        case Status.Bad:
            return 1;
        case Status.Critical:
            return 0;
        default:
            return 5;
    }
}

export function getCropStatus(crop: Crop) {
    let sum = 0;
    crop.systems.forEach(s => sum += cropStatusOrder(s.status));
    const avg = Math.round(sum / crop.systems.length);
    switch(avg) {
        case 0:
            return Status.Critical;
        case 1:
            return Status.Bad;
        case 2:
            return Status.Okay;
        case 3:
            return Status.Good;
        case 4:
            return Status.Great;
        default:
            return Status.Great;
    }
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

export function getPropertyIcon(p: Property) {
    switch(p) {
        case Property.Humidity:
            return humidityIcon;
        case Property.TankLevel:
            return tankLevelIcon;
        case Property.Temperature:
            return temperatureIcon;
        case Property.Light:
            return lightIcon;
    }
}

export function valueToDimension(v: number) {
    const p = v.toString() + "%";
    return p as DimensionValue
}

export function getEmptyIfNoAction(action: Action | undefined, width: number, size: number) {
    if(action === undefined) {
        return(<></>)
    } else {
        return(<ActionWithIconComponent action={action} width={width} size={size}/>);
    }
}

export function getSpaceIfNoAction(action: Action | undefined, width: number, size: number) {
    if(action === undefined) {
        return(<SpaceComponent value={width} dimension={Dimension.Width}/>)
    } else {
        return(<ActionWithIconComponent action={action} width={width} size={size}/>);
    }
}

export function getPropertyValue(s: System, p: Property) : number {
    switch(p) {
        case Property.Humidity:
            return s.humidity;
        case Property.TankLevel:
            return s.tankLevel;
        case Property.Temperature:
            return s.temperature;
        case Property.Light:
            return s.light;
    }
}

export function getAverage(c: Crop, p: Property) : number {
    const systems = c.systems;
    let sum = 0;
    systems.forEach(s => sum += getPropertyValue(s, p));
    return sum / systems.length;
}

export function getLastCropUpdate(c: Crop) {
    return [...c.systems].sort(systemSortByDate)[0].lastRead;
}

export function systemSortByDate(a: System, b: System) {
    return a.lastRead.getTime() - a.lastRead.getTime();
}


/*************************************************** ICONS ***************************************************/

export const goBackIcon : Icon = {
    name: "chevron-left",
    color: ICON_MAIN_COLOR,
    backgroundColor: ICON_BACK_COLOR,
}

export const addNewIcon : Icon = {
    name: "plus",
    color: ICON_MAIN_COLOR,
    backgroundColor: ICON_BACK_COLOR,
}

export const wateringCanIcon : Icon = {
    name: "watering-can",
    color: WATER_ICON_MAIN_COLOR,
    backgroundColor: WATER_ICON_BACK_COLOR,
}

export const deleteIcon : Icon = {
    name: "delete",
    color: DELETE_ICON_MAIN_COLOR,
    backgroundColor: DELETE_ICON_BACK_COLOR,
}

export const reloadIcon : Icon = {
    name: "reload",
    color: ICON_MAIN_COLOR,
    backgroundColor: ICON_BACK_COLOR,
}

export const humidityIcon : Icon = {
    name: "water",
    color: ICON_MAIN_COLOR,
    backgroundColor: ICON_BACK_COLOR,
}

export const tankLevelIcon : Icon = {
    name: "cup",
    color: ICON_MAIN_COLOR,
    backgroundColor: ICON_BACK_COLOR,
}

export const temperatureIcon : Icon = {
    name: "thermometer",
    color: ICON_MAIN_COLOR,
    backgroundColor: ICON_BACK_COLOR,
}

export const lightIcon : Icon = {
    name: "brightness-7",
    color: ICON_MAIN_COLOR,
    backgroundColor: ICON_BACK_COLOR,
}

/*************************************************** DATA ***************************************************/

export const systems0 : System[] = [
    {
        name: "North",
        type: "ESP32-Wrover",
        humidity: 12,
        tankLevel: 80,
        temperature: 27,
        light: 65,
        status: Status.Bad,
        lastRead: new Date(2024, 5-1, 6)
    },
    {
        name: "East",
        type: "ESP32-Wrover",
        humidity: 14,
        tankLevel: 54,
        temperature: 28,
        light: 60,
        status: Status.Critical,
        lastRead: new Date(2024, 5-1, 1)
    },
    {
        name: "West",
        type: "ESP32-Wrover",
        humidity: 15,
        tankLevel: 93,
        temperature: 6,
        light: 55,
        status: Status.Okay,
        lastRead: new Date(2024, 4-1, 30)
    },
    {
        name: "South 1",
        type: "ESP32-Wrover",
        humidity: 10,
        tankLevel: 57,
        temperature: 31,
        light: 70,
        status: Status.Good,
        lastRead: new Date(2024, 4-1, 29)
    },
    {
        name: "South 2",
        type: "ESP32-Wrover",
        humidity: 9,
        tankLevel: 57,
        temperature: 32,
        light: 69,
        status: Status.Great,
        lastRead: new Date(2024, 5-1, 2)
    }
]

export const systems1 : System[] = [
    {
        name: "North",
        type: "ESP32-Wrover",
        humidity: 12,
        tankLevel: 80,
        temperature: 27,
        light: 65,
        status: Status.Bad,
        lastRead: new Date(2024, 5-1, 6)
    },
    {
        name: "East",
        type: "ESP32-Wrover",
        humidity: 14,
        tankLevel: 54,
        temperature: 28,
        light: 60,
        status: Status.Great,
        lastRead: new Date(2024, 5-1, 1)
    },
    {
        name: "West",
        type: "ESP32-Wrover",
        humidity: 15,
        tankLevel: 93,
        temperature: 6,
        light: 55,
        status: Status.Okay,
        lastRead: new Date(2024, 4-1, 30)
    },
    {
        name: "South 1",
        type: "ESP32-Wrover",
        humidity: 10,
        tankLevel: 57,
        temperature: 31,
        light: 70,
        status: Status.Good,
        lastRead: new Date(2024, 4-1, 29)
    },
    {
        name: "South 2",
        type: "ESP32-Wrover",
        humidity: 9,
        tankLevel: 57,
        temperature: 32,
        light: 69,
        status: Status.Great,
        lastRead: new Date(2024, 5-1, 2)
    }
]

export const systems2 : System[] = [
    {
        name: "North",
        type: "ESP32-Wrover",
        humidity: 12,
        tankLevel: 80,
        temperature: 27,
        light: 65,
        status: Status.Bad,
        lastRead: new Date(2024, 5-1, 6)
    },
    {
        name: "East",
        type: "ESP32-Wrover",
        humidity: 14,
        tankLevel: 54,
        temperature: 28,
        light: 60,
        status: Status.Critical,
        lastRead: new Date(2024, 5-1, 1)
    },
    {
        name: "West",
        type: "ESP32-Wrover",
        humidity: 15,
        tankLevel: 93,
        temperature: 6,
        light: 55,
        status: Status.Critical,
        lastRead: new Date(2024, 4-1, 30)
    },
    {
        name: "South 1",
        type: "ESP32-Wrover",
        humidity: 10,
        tankLevel: 57,
        temperature: 31,
        light: 70,
        status: Status.Bad,
        lastRead: new Date(2024, 4-1, 29)
    },
    {
        name: "South 2",
        type: "ESP32-Wrover",
        humidity: 9,
        tankLevel: 57,
        temperature: 32,
        light: 69,
        status: Status.Critical,
        lastRead: new Date(2024, 5-1, 2)
    }
]

export const systems3 : System[] = [
    {
        name: "North",
        type: "ESP32-Wrover",
        humidity: 12,
        tankLevel: 80,
        temperature: 27,
        light: 65,
        status: Status.Bad,
        lastRead: new Date(2024, 5-1, 6)
    },
    {
        name: "East",
        type: "ESP32-Wrover",
        humidity: 14,
        tankLevel: 54,
        temperature: 28,
        light: 60,
        status: Status.Critical,
        lastRead: new Date(2024, 5-1, 1)
    },
    {
        name: "West",
        type: "ESP32-Wrover",
        humidity: 15,
        tankLevel: 93,
        temperature: 6,
        light: 55,
        status: Status.Okay,
        lastRead: new Date(2024, 4-1, 30)
    },
    {
        name: "South 1",
        type: "ESP32-Wrover",
        humidity: 10,
        tankLevel: 57,
        temperature: 31,
        light: 70,
        status: Status.Good,
        lastRead: new Date(2024, 4-1, 29)
    },
    {
        name: "South 2",
        type: "ESP32-Wrover",
        humidity: 9,
        tankLevel: 57,
        temperature: 32,
        light: 69,
        status: Status.Critical,
        lastRead: new Date(2024, 5-1, 2)
    }
]

export const systems4 : System[] = [
    {
        name: "North",
        type: "ESP32-Wrover",
        humidity: 12,
        tankLevel: 80,
        temperature: 27,
        light: 65,
        status: Status.Great,
        lastRead: new Date(2024, 5-1, 6)
    },
    {
        name: "East",
        type: "ESP32-Wrover",
        humidity: 14,
        tankLevel: 54,
        temperature: 28,
        light: 60,
        status: Status.Great,
        lastRead: new Date(2024, 5-1, 1)
    },
    {
        name: "West",
        type: "ESP32-Wrover",
        humidity: 15,
        tankLevel: 93,
        temperature: 6,
        light: 55,
        status: Status.Good,
        lastRead: new Date(2024, 4-1, 30)
    },
    {
        name: "South 1",
        type: "ESP32-Wrover",
        humidity: 10,
        tankLevel: 57,
        temperature: 31,
        light: 70,
        status: Status.Good,
        lastRead: new Date(2024, 4-1, 29)
    },
    {
        name: "South 2",
        type: "ESP32-Wrover",
        humidity: 9,
        tankLevel: 57,
        temperature: 32,
        light: 69,
        status: Status.Great,
        lastRead: new Date(2024, 5-1, 2)
    }
]

export const crops : Crop[] = [
    {name: "Backyard Corn", cropName: "Corn", distance: 50, isWatering: true, systems: systems0},
    {name: "Carob", cropName: "Carob", distance: 1200, isWatering: false, systems: systems1},
    {name: "Strawberries", cropName: "Strawberry", distance: 10, isWatering: true, systems: systems2},
    {name: "Front porch Corn", cropName: "Corn", distance: 200, isWatering: false, systems: systems3},
    {name: "Potatoes", cropName: "Potato", distance: 2000, isWatering: true, systems: systems4},
];
