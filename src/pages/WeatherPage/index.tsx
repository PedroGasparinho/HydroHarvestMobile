import { SetStateAction, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getClosestRegionIdx, regions } from "../../utils/regions";
import { getWeather } from "../../utils/api";
import TitleBarComponent from "../../components/TitleBarComponent";
import SelectIndexComponent from "../../components/SelectIndexComponent";
import { useSelector } from "react-redux";
import { State } from "../../store";
import WeatherComponent from "../../components/WeatherComponent";
import { Weather } from "../../utils/domain";

function WeatherPage() {

    const loc = useSelector((state: State) => state.persistedReducer.locationReducer.location);
    const [regionIdx, setRegionIdx] = useState<number>(0); 

    useEffect(() => {
        setRegionIdx(getClosestRegionIdx(loc.lat, loc.lon));
    }, [])

    useEffect(() => {
        async function getForecast() {
            const response = await getWeather(regions[19]);
            console.log(response);
            if(response.ok) {
                console.log(await response.json());
            } else {
                console.log("Error: " + response.status);
            }
        }
        getForecast();
    }, [regionIdx])

    const weather : Weather = {
        weatherType: "Sunny",
        predWindDir: "N",
        windSpeed: "Strong",
        rainIntensity: "Strong",
        precipitaProb: 12,
        tMax: 20,
        tMin: 30
    }

    return (
        <>
            <TitleBarComponent title={"Weather Forecast"} leftAction={undefined} rightAction={undefined}/>
            <View style={styles.selectStyle}>
                <SelectIndexComponent data={regions.map(r => { return r.name; })} width={100} selectValue={regionIdx} setSelectValue={setRegionIdx}/>
            </View>
            <WeatherComponent weather={weather}/>
            <WeatherComponent weather={weather}/>
            <WeatherComponent weather={weather}/>
            
        </>
    );
}

const styles = StyleSheet.create({
    
    selectStyle: {
        height: "15%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center", 
    },

    weatherStyle: {
        height: "25%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },

});
  
export default WeatherPage;