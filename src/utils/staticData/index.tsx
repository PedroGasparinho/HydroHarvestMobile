import { System, Crop } from "../domain"
import { Status } from "../status"

export const systems0 : System[] = [
    {
        name: "North",
        type: "ESP32-Wrover",
        humidity: 12,
        tankLevel: 80,
        temperature: 27,
        light: 65,
        status: Status.Bad,
        lastRead: new Date(2024, 5-1, 6, 23, 59, 59)
    },
    {
        name: "East",
        type: "ESP32-Wrover",
        humidity: 14,
        tankLevel: 54,
        temperature: 28,
        light: 60,
        status: Status.Critical,
        lastRead: new Date(2024, 5-1, 1, 1, 1, 1)
    },
    {
        name: "West",
        type: "ESP32-Wrover",
        humidity: 15,
        tankLevel: 93,
        temperature: 6,
        light: 55,
        status: Status.Okay,
        lastRead: new Date(2024, 4-1, 30, 12, 30, 12)
    },
    {
        name: "South 1",
        type: "ESP32-Wrover",
        humidity: 10,
        tankLevel: 57,
        temperature: 31,
        light: 70,
        status: Status.Good,
        lastRead: new Date(2024, 4-1, 29, 0, 0, 0)
    },
    {
        name: "South 2",
        type: "ESP32-Wrover",
        humidity: 9,
        tankLevel: 57,
        temperature: 32,
        light: 69,
        status: Status.Great,
        lastRead: new Date(2024, 5-1, 2, 16, 30, 16)
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
        lastRead: new Date(2024, 5-1, 6, 23, 59, 59)
    },
    {
        name: "East",
        type: "ESP32-Wrover",
        humidity: 14,
        tankLevel: 54,
        temperature: 28,
        light: 60,
        status: Status.Great,
        lastRead: new Date(2024, 5-1, 1, 1, 1, 1)
    },
    {
        name: "West",
        type: "ESP32-Wrover",
        humidity: 15,
        tankLevel: 93,
        temperature: 6,
        light: 55,
        status: Status.Okay,
        lastRead: new Date(2024, 4-1, 30, 12, 30, 12)
    },
    {
        name: "South 1",
        type: "ESP32-Wrover",
        humidity: 10,
        tankLevel: 57,
        temperature: 31,
        light: 70,
        status: Status.Good,
        lastRead: new Date(2024, 4-1, 29, 0, 0, 0)
    },
    {
        name: "South 2",
        type: "ESP32-Wrover",
        humidity: 9,
        tankLevel: 57,
        temperature: 32,
        light: 69,
        status: Status.Great,
        lastRead: new Date(2024, 5-1, 2, 16, 30, 16)
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
        lastRead: new Date(2024, 5-1, 6, 23, 59, 59)
    },
    {
        name: "East",
        type: "ESP32-Wrover",
        humidity: 14,
        tankLevel: 54,
        temperature: 28,
        light: 60,
        status: Status.Critical,
        lastRead: new Date(2024, 5-1, 1, 1, 1, 1)
    },
    {
        name: "West",
        type: "ESP32-Wrover",
        humidity: 15,
        tankLevel: 93,
        temperature: 6,
        light: 55,
        status: Status.Critical,
        lastRead: new Date(2024, 4-1, 30, 12, 30, 12)
    },
    {
        name: "South 1",
        type: "ESP32-Wrover",
        humidity: 10,
        tankLevel: 57,
        temperature: 31,
        light: 70,
        status: Status.Bad,
        lastRead: new Date(2024, 4-1, 29, 0, 0, 0)
    },
    {
        name: "South 2",
        type: "ESP32-Wrover",
        humidity: 9,
        tankLevel: 57,
        temperature: 32,
        light: 69,
        status: Status.Critical,
        lastRead: new Date(2024, 5-1, 2, 16, 30, 16)
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
        lastRead: new Date(2024, 5-1, 6, 23, 59, 59)
    },
    {
        name: "East",
        type: "ESP32-Wrover",
        humidity: 14,
        tankLevel: 54,
        temperature: 28,
        light: 60,
        status: Status.Critical,
        lastRead: new Date(2024, 5-1, 1, 1, 1, 1)
    },
    {
        name: "West",
        type: "ESP32-Wrover",
        humidity: 15,
        tankLevel: 93,
        temperature: 6,
        light: 55,
        status: Status.Okay,
        lastRead: new Date(2024, 4-1, 30, 12, 30, 12)
    },
    {
        name: "South 1",
        type: "ESP32-Wrover",
        humidity: 10,
        tankLevel: 57,
        temperature: 31,
        light: 70,
        status: Status.Good,
        lastRead: new Date(2024, 4-1, 29, 0, 0, 0)
    },
    {
        name: "South 2",
        type: "ESP32-Wrover",
        humidity: 9,
        tankLevel: 57,
        temperature: 32,
        light: 69,
        status: Status.Critical,
        lastRead: new Date(2024, 5-1, 2, 16, 30, 16)
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
        lastRead: new Date(2024, 5-1, 6, 23, 59, 59)
    },
    {
        name: "East",
        type: "ESP32-Wrover",
        humidity: 14,
        tankLevel: 54,
        temperature: 28,
        light: 60,
        status: Status.Great,
        lastRead: new Date(2024, 5-1, 1, 1, 1, 1)
    },
    {
        name: "West",
        type: "ESP32-Wrover",
        humidity: 15,
        tankLevel: 93,
        temperature: 6,
        light: 55,
        status: Status.Good,
        lastRead: new Date(2024, 4-1, 30, 12, 30, 12)
    },
    {
        name: "South 1",
        type: "ESP32-Wrover",
        humidity: 10,
        tankLevel: 57,
        temperature: 31,
        light: 70,
        status: Status.Good,
        lastRead: new Date(2024, 4-1, 29, 0, 0, 0)
    },
    {
        name: "South 2",
        type: "ESP32-Wrover",
        humidity: 9,
        tankLevel: 57,
        temperature: 32,
        light: 69,
        status: Status.Great,
        lastRead: new Date(2024, 5-1, 2, 16, 30, 16)
    }
]

export const crops : Crop[] = [
    {name: "Backyard Corn", cropName: "Corn", distance: 50, isWatering: true, systems: systems0},
    {name: "Carob", cropName: "Carob", distance: 1200, isWatering: false, systems: systems1},
    {name: "Strawberries", cropName: "Strawberry", distance: 10, isWatering: true, systems: systems2},
    {name: "Front porch Corn", cropName: "Corn", distance: 200, isWatering: false, systems: systems3},
    {name: "Potatoes", cropName: "Potato", distance: 2000, isWatering: true, systems: systems4},
];

export const availableCrops = ["Agave", "Alpine Currant", "Aster", "Bald Cypress", "Barberry", "Begonia Coneflower", "Birch",
"Bleeding Heart", "Butterfly Weed", "Corn", "Carob", "Strawberries", "Potatoes"]