import { Crop } from "../domain";

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