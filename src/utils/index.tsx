import { DimensionValue } from "react-native";
import ActionWithIconComponent from "../components/ActionWithIconComponent";
import SpaceComponent from "../components/SpaceComponent";
import { Icon } from "./icons";

export type Action = {
    icon: Icon,
    action: () => void,
}

export enum Dimension {
    Width,
    Height,
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

export function isStringEmpty(s: string) : boolean {
    return s == null || s.trim() === ''
}

