import { ScrollView, StyleSheet, View } from "react-native";
import { Action } from "../../utils";
import CropComponent from "../../components/CropComponent";
import TitleBarComponent from "../../components/TitleBarComponent";
import { mainStackProp } from "../../routes/stack";
import { useNavigation } from "@react-navigation/native";
import PopUpComponent from "../../components/PopUpComponent";
import AddCropForm from "../../components/AddCropFormComponent";
import { useDispatch, useSelector } from "react-redux";
import { Crop, System, compareCrops } from "../../utils/domain";
import { goBackIcon, addNewIcon } from "../../utils/icons";
import { useEffect, useState } from "react";
import { State } from "../../store";
import { getAllCrops } from "../../utils/api";
import Geolocation from "@react-native-community/geolocation";
import { setLocationReducer } from "../../store/location.reducer";
import { distBetweenEarthPoints } from "../../utils/regions";

function HomePage() {

    function getSortedCrops() : Crop[] {
        return crops.sort(compareCrops);
    }

    const mainNav = useNavigation<mainStackProp>();
    const loggedUser = useSelector((state: State) => state.persistedReducer.userReducer.user);
    const userLoc = useSelector((state: State) => state.persistedReducer.locationReducer.location);
    const dispatcher = useDispatch();

    const [crops, setCrops] = useState<Crop[]>([]);
    const [modalVisible, setModalVisible] = useState<boolean>(false); 

    const title = "Crops";
    const subtitle = "You have " + crops.length + " crops";

    const leftAction : Action = {
        icon: goBackIcon,
        action: () => mainNav.goBack(),
    }
    const rightAction : Action = {
        icon: addNewIcon,
        action: () => setModalVisible(true)
    }

    let i = 0;

    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            position => {
                const {latitude, longitude} = position.coords;
                dispatcher(setLocationReducer({lat: latitude, lon: longitude}));
            },
            error => {
                console.log("Error: " + error.message);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
        )
    }

    function getAverageDistance(systems: System[]) {
        let dist = 0
        systems.forEach(s => { 
            dist += distBetweenEarthPoints(s.latitude, s.longitude, userLoc.lat, userLoc.lon)
        })
    
        if(systems.length == 0) {
            dist = Number.MAX_VALUE;
        } else {
            dist /= systems.length
        }
        return dist;
    }


    useEffect(() =>  {
        async function getAll() {
            if(loggedUser !== null) {
                const response = await getAllCrops(loggedUser);
                if(response.ok) {
                    const crops = await response.json();
                    for(let i = 0; i < crops.crops.length; i++) {
                        if(crops.crops[i].systems === null) {
                            crops.crops[i].systems = []
                        }
                    }
                    setCrops(
                        crops.crops.map((c: any) => { return { ...c, averageDistance: getAverageDistance(c.systemsDetails) }})
                    );
                } else {
                    console.log("Error: " + response.status);
                }
            }
        }
        getAll();
        getCurrentLocation();
    }, [])

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
                body={<AddCropForm setModalVisible={setModalVisible}/>}
                height={60}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
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