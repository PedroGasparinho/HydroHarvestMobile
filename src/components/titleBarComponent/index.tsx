import { DimensionValue, StyleSheet, Text, View } from "react-native";
import { Action, ICON_BACK_COLOR, ICON_RADIUS, PAGE_ICON_SIZE, PAGE_SUBTITLE_SIZE, PAGE_TITLE_SIZE, TEXT_COLOR } from "../../utils";
import IconComponent from "../IconComponent";

type Props = {
    title: string,
    subtitle?: string,
    leftAction?: Action,
    rightAction?: Action,
}

function TitleBarComponent(props: Props) {

    function getTitleWidth() : DimensionValue {
        const iconViewWidth = 15;

        function removeWidth(action: Action | undefined) {
            return Number(action !== undefined) * iconViewWidth
        }

        const titleWidthNum = 100 - removeWidth(props.leftAction) - removeWidth(props.rightAction);
        const titleWidth = titleWidthNum.toString() + "%";
        return titleWidth as DimensionValue
    }

    const leftAction = props.leftAction;
    const rightAction = props.rightAction;

    const titleWidth = getTitleWidth();
    const iconWidth = "15%";

    return(
        <View style={styles.topView}>
            <IconComponent icon={leftAction?.icon} action={leftAction?.action} width={iconWidth} size={PAGE_ICON_SIZE}/>
            <View style={[styles.titleView, {width: titleWidth}]}>
                <Text style={styles.titleText}>{props.title}</Text>
                <>
                    {
                        props.subtitle !== undefined ?
                            <Text style={styles.subTitleText}>{props.subtitle}</Text>:<></>
                    }
                </>
            </View>
            <IconComponent icon={rightAction?.icon} action={rightAction?.action} width={iconWidth} size={PAGE_ICON_SIZE}/>
        </View>
    );
}

const styles = StyleSheet.create({
    
    topView: {
        height: "10%",
        display: "flex",
        flexDirection: "row",
    },

    titleView: {
        paddingLeft: 10,
        justifyContent: "center"
    },

    titleText: {
        fontSize: PAGE_TITLE_SIZE,
        fontWeight: "bold",
        color: TEXT_COLOR,
    },

    subTitleText: {
        fontSize: PAGE_SUBTITLE_SIZE,
        color: TEXT_COLOR,
    },

    iconView: {
        width: "15%",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
    },

    iconBackgroundView: {
        backgroundColor: ICON_BACK_COLOR,
        borderRadius: ICON_RADIUS,
    },

});

export default TitleBarComponent;