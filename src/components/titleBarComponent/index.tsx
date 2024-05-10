import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ICON_BACK_COLOR, ICON_MAIN_COLOR, ICON_RADIUS, PAGE_ICON_SIZE, PAGE_SUBTITLE_SIZE, PAGE_TITLE_SIZE, TEXT_COLOR } from "../../utils";
import MCIcons from "react-native-vector-icons/MaterialCommunityIcons";

type Props = {
    leftIconName: string,
    rightIconName: string,
    title: string,
    subtitle: string,
}

function TitleBarComponent(props: Props) {
    return(
        <View style={styles.topView}>
            <View style={styles.iconView}>
                <TouchableOpacity style={styles.iconBackgroundView}>
                    <MCIcons name={props.leftIconName} color={ICON_MAIN_COLOR} size={PAGE_ICON_SIZE}/>
                </TouchableOpacity>
            </View>
            <View style={styles.titleView}>
                <Text style={styles.titleText}>{props.title}</Text>
                <Text style={styles.subTitleText}>{props.subtitle}</Text>
            </View>
            <View style={styles.iconView}>
                <TouchableOpacity style={styles.iconBackgroundView}>
                    <MCIcons name={props.rightIconName} color={ICON_MAIN_COLOR} size={PAGE_ICON_SIZE}/>
                </TouchableOpacity>
            </View>
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
        width: "70%",
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