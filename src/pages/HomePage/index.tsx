import { useNavigation } from "@react-navigation/native";
import { Button, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CROP_PAGE, homeStackProp } from "../../routes/homeStack";
import MCIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Crop, ICON_BACK_COLOR, ICON_MAIN_COLOR, ICON_RADIUS, PAGE_ICON_SIZE, PAGE_SUBTITLE_SIZE, PAGE_TITLE_SIZE, TEXT_COLOR, compareCrops } from "../../utils";
import CropComponent from "../../components/CropComponent";

function HomePage() {

    const crops : Crop[] = [
        {name: "Backyard Corn", cropName: "Corn", status: "Critical", distance: 50, isWatering: true},
        {name: "Carob", cropName: "Carob", status: "Good", distance: 1200, isWatering: false},
        {name: "Strawberries", cropName: "Strawberry", status: "Okay", distance: 10, isWatering: true},
        {name: "Front porch Corn", cropName: "Corn", status: "Bad", distance: 200, isWatering: false},
        {name: "Potatoes", cropName: "Potato", status: "Great", distance: 2000, isWatering: true},
    ];

    function getSortedCrops() : Crop[] {
        return crops.sort(compareCrops);
    }

    let i = 0;

    return (
        <>
            <View style={styles.topView}>
                <View style={styles.iconView}>
                    <TouchableOpacity style={styles.iconBackgroundView}>
                        <MCIcons name="chevron-left" color={ICON_MAIN_COLOR} size={PAGE_ICON_SIZE}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.titleView}>
                    <Text style={styles.titleText}>Crops</Text>
                    <Text style={styles.subTitleText}>{"You have " + crops.length + " crops"}</Text>
                </View>
                <View style={styles.iconView}>
                    <TouchableOpacity style={styles.iconBackgroundView}>
                        <MCIcons name="plus" color={ICON_MAIN_COLOR} size={PAGE_ICON_SIZE}/>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView 
                style={styles.bottomView} 
                contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap'}}
            >
                <>
                    {
                        getSortedCrops().map((c) =>
                            <View key={i++} style={styles.itemView}>
                                <CropComponent crop={c}/>
                            </View>
                        )
                    }
                </>
            </ScrollView>
        </>
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

    bottomView: {
        height: "90%",
    },

    itemView: {
        width : '50%',
        flexDirection : "row"
    }

});
  
  export default HomePage;