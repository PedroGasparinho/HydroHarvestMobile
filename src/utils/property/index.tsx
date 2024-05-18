import { Crop, System } from "../domain";
import { humidityIcon, lightIcon, tankLevelIcon, temperatureIcon } from "../icons";

export enum Property {
    Humidity = "Humidity",
    TankLevel = "Tank level",
    Temperature = "Temperature",
    Light = "Light",
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

export function getPropertyAverage(c: Crop, p: Property) : number {
    const systems = c.systems;
    let sum = 0;
    systems.forEach(s => sum += getPropertyValue(s, p));
    return sum / systems.length;
}
