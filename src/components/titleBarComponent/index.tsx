import { DimensionValue, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Action, ICON_BACK_COLOR, ICON_MAIN_COLOR, ICON_RADIUS, PAGE_ICON_SIZE, PAGE_SUBTITLE_SIZE, PAGE_TITLE_SIZE, TEXT_COLOR } from "../../utils";
import MCIcons from "react-native-vector-icons/MaterialCommunityIcons";

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

    function getIconView(action: Action | undefined) {
        if(action !== undefined) {
            return(
                <View style={styles.iconView}>
                    <TouchableOpacity style={styles.iconBackgroundView} onPress={action.action}>
                        <MCIcons name={action.iconName} color={ICON_MAIN_COLOR} size={PAGE_ICON_SIZE}/>
                    </TouchableOpacity>
                </View>
            )
        }
        return(<></>);
    }

    const titleWidth = getTitleWidth();

    return(
        <View style={styles.topView}>
            <>
                { getIconView(props.leftAction) }
            </>
            <View style={[styles.titleView, {width: titleWidth}]}>
                <Text style={styles.titleText}>{props.title}</Text>
                <>
                    {
                        props.subtitle !== undefined ?
                            <Text style={styles.subTitleText}>{props.subtitle}</Text>:<></>
                    }
                </>
            </View>
            <>
                { getIconView(props.rightAction) }
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