/***************************************************** TYPES ******************************************************/

export type Crop = {
    name: string,
    cropName: string,
    status: string,
    distance: number,
    isWatering: boolean,
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

//Crop-related Constants
export const CROP_GREAT_STATUS = "Great";
export const CROP_GOOD_STATUS = "Good";
export const CROP_OKAY_STATUS = "Okay";
export const CROP_BAD_STATUS = "Bad";
export const CROP_CRITICAL_STATUS = "Critical";

export const CROP_GREAT_COLOR = "#0A6847";
export const CROP_GOOD_COLOR = "#87A922";
export const CROP_OKAY_COLOR = "#FFC000";
export const CROP_BAD_COLOR = "#FF8911";
export const CROP_CRITICAL_COLOR = "#A94438";

/*************************************************** FUNCTIONS ***************************************************/

export function cropStatusToColor(status: string) {
    switch(status) {
        case CROP_GREAT_STATUS:
            return CROP_GREAT_COLOR;
        case CROP_GOOD_STATUS:
            return CROP_GOOD_COLOR;
        case CROP_OKAY_STATUS:
            return CROP_OKAY_COLOR;
        case CROP_BAD_STATUS:
            return CROP_BAD_COLOR;
        case CROP_CRITICAL_STATUS:
            return CROP_CRITICAL_COLOR;
    }
}

export function cropStatusOrder(status: string) : number {
    switch(status) {
        case CROP_GREAT_STATUS:
            return 4;
        case CROP_GOOD_STATUS:
            return 3;
        case CROP_OKAY_STATUS:
            return 2;
        case CROP_BAD_STATUS:
            return 1;
        case CROP_CRITICAL_STATUS:
            return 0;
        default:
            return 5;
    }
}

export function compareCrops(a: Crop, b: Crop) {
    const firstCriterion = a.distance - b.distance;
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