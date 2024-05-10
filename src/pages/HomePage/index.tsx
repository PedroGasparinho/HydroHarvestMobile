import { ScrollView, StyleSheet, View } from "react-native";
import { ADD_NEW_ICON, Action, Crop, GO_BACK_ICON, compareCrops } from "../../utils";
import CropComponent from "../../components/CropComponent";
import TitleBarComponent from "../../components/titleBarComponent";
import { mainStackProp } from "../../routes/stack";
import { useNavigation } from "@react-navigation/native";

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

    const mainNav = useNavigation<mainStackProp>();

    const title = "Crops";
    const subtitle = "You have " + crops.length + " crops";

    const leftAction : Action = {
        iconName: GO_BACK_ICON,
        action: () => mainNav.goBack(),
    }
    const rightAction : Action = {
        iconName: ADD_NEW_ICON,
        action: () => mainNav.goBack(),
    }

    let i = 0;

    return (
        <>
            <TitleBarComponent title={title} subtitle={subtitle} leftAction={leftAction} rightAction={rightAction}/>
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

    bottomView: {
        height: "90%",
    },

    itemView: {
        width : '50%',
        flexDirection : "row"
    }

});
  
  export default HomePage;