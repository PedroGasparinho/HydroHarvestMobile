import { DimensionValue, StyleSheet, Text, View } from "react-native";
import { Action, getEmptyIfNoAction, valueToDimension } from "../../utils";
import { PAGE_ICON_SIZE, PAGE_SUBTITLE_SIZE, PAGE_TITLE_SIZE, TEXT_COLOR } from "../../utils/styles";
import { ICON_BACK_COLOR, ICON_RADIUS } from "../../utils/icons";

type Props = {
    title: string,
    subtitle?: string,
    leftAction?: Action,
    rightAction?: Action,
}

function TitleBarComponent(props: Props) {

    const iconWidth = 15;

    function getTitleWidth() : DimensionValue {

        function removeWidth(action: Action | undefined) {
            return Number(action !== undefined) * iconWidth
        }

        const titleWidthNum = 100 - removeWidth(props.leftAction) - removeWidth(props.rightAction);
        return valueToDimension(titleWidthNum);
    }

    const leftAction = props.leftAction;
    const rightAction = props.rightAction;

    const titleWidth = {width: getTitleWidth()};

    return(
        <View style={styles.topView}>
            <>
                {
                    getEmptyIfNoAction(leftAction, iconWidth, PAGE_ICON_SIZE)
                }
            </>
            <View style={[styles.titleView, titleWidth]}>
                <Text style={styles.titleText}>{props.title}</Text>
                <>
                    {
                        props.subtitle !== undefined ?
                            <Text style={styles.subTitleText}>{props.subtitle}</Text>:<></>
                    }
                </>
            </View>
            <>
                {
                    getEmptyIfNoAction(rightAction, iconWidth, PAGE_ICON_SIZE)
                }
            </>
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
        justifyContent: "center",
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