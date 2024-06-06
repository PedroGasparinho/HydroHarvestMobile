import { StyleSheet, Text, View } from "react-native";
import { ITEM_RADIUS, ITEM_TEXT_SIZE, ITEM_TITLE_SIZE, PAGE_TITLE_SIZE, TEXT_COLOR } from "../../utils/styles";
import { Weather } from "../../utils/domain";

type Props = {
    weather: Weather
}

function WeatherComponent(props: Props) {

    const { weather } = props;

    return(
        <View style={styles.outerStyle}>
            <View style={styles.containerStyle}>
                <View style={styles.titleView}>
                    <Text style={styles.titleText}>Today</Text>
                </View>
                <View style={styles.bodyView}>
                    <View style={styles.sideView}>
                        <View style={styles.leftTitle}>
                            <Text style={styles.detailsText}>Cloudy</Text>
                        </View>
                        <View style={styles.leftBody}>
                            <View style={styles.leftItem}>
                                <View style={styles.itemTemp}>
                                    <Text style={styles.tempText}>{weather.tMin}</Text>
                                </View>
                                <View style={styles.itemTitle}>
                                    <Text style={styles.detailsText}>Min</Text>
                                </View>
                            </View>
                            <View style={styles.leftItem}>
                                <View style={styles.itemTemp}>
                                    <Text style={styles.tempText}>{weather.tMax}</Text>
                                </View>
                                <View style={styles.itemTitle}>
                                    <Text style={styles.detailsText}>Max</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.sideView}>
                        <Text style={styles.detailsText}>{"Wind Direction: " + weather.predWindDir}</Text>
                        <Text style={styles.detailsText}>{"Wind Speed: " + weather.windSpeed}</Text>
                        <Text style={styles.detailsText}>{"Rain Probability: " + weather.precipitaProb}</Text>
                        <Text style={styles.detailsText}>{"Rain Intensity: " + weather.rainIntensity}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    
    outerStyle: {
        height: "25%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },

    containerStyle: {
        height: "90%",
        width: "90%",
        justifyContent: "center",
        alignItems: "center", 
        backgroundColor: "#cccccc",
        borderRadius: ITEM_RADIUS,
    },

    titleView: {
        height: "30%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },

    bodyView: {
        height: "70%",
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center", 
    },

    sideView: {
        height: "100%",
        width: "50%",
        justifyContent: "center",
    },

    leftTitle: {
        height: "30%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },

    leftBody: {
        height: "70%",
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    leftItem: {
        height: "100%",
        width: "50%",
        justifyContent: "center",
        alignItems: "center", 
    },

    itemTemp: {
        height: "75%",
        width: "50%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center", 
    },

    itemTitle: {
        height: "25%",
        width: "50%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center", 
    },

    titleText: {
        color: TEXT_COLOR,
        fontSize: ITEM_TITLE_SIZE
    },

    tempText: {
        color: TEXT_COLOR,
        fontSize: PAGE_TITLE_SIZE
    },

    detailsText: {
        color: TEXT_COLOR,
        fontSize: ITEM_TEXT_SIZE
    }

});

export default WeatherComponent;