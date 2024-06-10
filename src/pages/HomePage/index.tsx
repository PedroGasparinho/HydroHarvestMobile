import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Action, Dimension } from "../../utils";
import CropComponent from "../../components/CropComponent";
import TitleBarComponent from "../../components/TitleBarComponent";
import { mainStackProp } from "../../routes/stack";
import { useNavigation } from "@react-navigation/native";
import PopUpComponent from "../../components/PopUpComponent";
import AddCropForm from "../../components/AddCropFormComponent";
import { useDispatch, useSelector } from "react-redux";
import { Crop, System, compareCrops } from "../../utils/domain";
import { goBackIcon, addNewIcon, wifiIcon, noWifiIcon } from "../../utils/icons";
import { useEffect, useState } from "react";
import { State } from "../../store";
import { getAllCrops } from "../../utils/api";
import Geolocation from "@react-native-community/geolocation";
import { setLocationReducer } from "../../store/location.reducer";
import { distBetweenEarthPoints } from "../../utils/regions";
import { useNetInfo } from "@react-native-community/netinfo";
import { ITEM_ICON_SIZE, ITEM_TITLE_SIZE, TEXT_COLOR } from "../../utils/styles";
import IconComponent from "../../components/IconComponent";
import SpaceComponent from "../../components/SpaceComponent";
import { setDirty } from "../../store/dirty.reducer";

function HomePage() {

    function getSortedCrops() : Crop[] {
        return crops.sort(compareCrops);
    }

    const mainNav = useNavigation<mainStackProp>();
    const loggedUser = useSelector((state: State) => state.persistedReducer.userReducer.user);
    const userLoc = useSelector((state: State) => state.persistedReducer.locationReducer.location);
    //const dirty = useSelector((state: State) => state.dirtyReducer.dirty);
    const dispatcher = useDispatch();

    const [crops, setCrops] = useState<Crop[]>([]);
    const [modalVisible, setModalVisible] = useState<boolean>(false); 
    const [dirty, setDirty] = useState<boolean>(false);

    const { type, isConnected } = useNetInfo();

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

    useEffect(() => {
        getCurrentLocation();
    }, [])

    useEffect(() =>  {
        async function getCrops() {
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
                return response.ok;
            } else {
                return false;
            }
        }

        getCrops();
    }, [dirty])

    console.log(dirty);

    return (
        <>
            <TitleBarComponent title={title} subtitle={subtitle} leftAction={leftAction} rightAction={rightAction}/>
            <ScrollView 
                style={styles.cropsView} 
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
            <View style={[styles.connectionView, {backgroundColor: isConnected?"#00ff00":"#ff0000"}]}>
                <IconComponent icon={isConnected?wifiIcon:noWifiIcon} size={ITEM_ICON_SIZE} width={10}/>
                <View style={styles.connectionTextView}>
                    <Text style={styles.connectionText}>{isConnected?`Connected by ${type}`:"No connection"}</Text>
                </View>
                <SpaceComponent value={10} dimension={Dimension.Width}/>
            </View>
            <PopUpComponent
                body={<AddCropForm setModalVisible={setModalVisible} setDirty={setDirty}/>}
                height={60}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
        </>
    );
}

const styles = StyleSheet.create({

    cropsView: {
        height: "87.5%",
    },

    itemView: {
        width : '50%',
        flexDirection : "row",
    },

    connectionView: {
        height: "7.5%",
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        //borderTopWidth: BORDER_WIDTH,
        //borderTopColor: BORDER_COLOR,
    },

    connectionTextView: {
        width: "80%",
        justifyContent: "center",
        alignItems: "center",
    },

    connectionText: {
        fontSize: ITEM_TITLE_SIZE,
        color: TEXT_COLOR,
    }

});
  
export default HomePage;