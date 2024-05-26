import { ScrollView, StyleSheet, View } from "react-native";
import { Action } from "../../utils";
import CropComponent from "../../components/CropComponent";
import TitleBarComponent from "../../components/TitleBarComponent";
import { mainStackProp } from "../../routes/stack";
import { useNavigation } from "@react-navigation/native";
import PopUpComponent from "../../components/PopUpComponent";
import AddCropForm from "../../components/AddCropFormComponent";
import { useDispatch } from "react-redux";
import { setVisible } from "../../store/modal.reducer";
import { Crop, compareCrops } from "../../utils/domain";
import { goBackIcon, addNewIcon } from "../../utils/icons";
import { crops } from "../../utils/staticData";

function HomePage() {

    function getSortedCrops() : Crop[] {
        return crops.sort(compareCrops);
    }

    const mainNav = useNavigation<mainStackProp>();
    const dispatcher = useDispatch();

    const title = "Crops";
    const subtitle = "You have " + crops.length + " crops";

    const leftAction : Action = {
        icon: goBackIcon,
        action: () => mainNav.goBack(),
    }
    const rightAction : Action = {
        icon: addNewIcon,
        action: () => dispatcher(setVisible(true))
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
            <PopUpComponent
                body={<AddCropForm/>}
            />
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