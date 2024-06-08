import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { getClosestRegionIdx, regions } from "../../utils/regions";
import { getWeather } from "../../utils/api";
import TitleBarComponent from "../../components/TitleBarComponent";
import SelectIndexComponent from "../../components/SelectIndexComponent";
import { useSelector } from "react-redux";
import { State } from "../../store";
import WeatherComponent from "../../components/WeatherComponent";
import { Forecast } from "../../utils/domain";

function WeatherPage() {

    const loc = useSelector((state: State) => state.persistedReducer.locationReducer.location);
    const [regionIdx, setRegionIdx] = useState<number>(0);
    const [forecast, setForecast] = useState<Forecast | undefined>(undefined);

    useEffect(() => {
        setRegionIdx(getClosestRegionIdx(loc.lat, loc.lon));
    }, [])

    useEffect(() => {
        async function getForecast() {
            const response = await getWeather(regions[regionIdx]);
            console.log(response);
            if(response.ok) {
                setForecast(await response.json());
            } else {
                console.log("Error: " + response.status);
            }
        }
        getForecast();
    }, [regionIdx])

    return (
        <>
            <TitleBarComponent title={"Weather Forecast"} leftAction={undefined} rightAction={undefined}/>
            <View style={styles.selectStyle}>
                <SelectIndexComponent data={regions.map(r => { return r.name; })} width={90} selectValue={regionIdx} setSelectValue={setRegionIdx}/>
            </View>
            <>
                {
                    forecast === undefined ? 
                        <></>:
                        <>
                            <WeatherComponent weather={forecast.yesterday} day="Yesterday"/>
                            <WeatherComponent weather={forecast.today} day="Today"/>
                            <WeatherComponent weather={forecast.tomorrow} day="Tomorrow"/>
                        </>
                }
            </>  
        </>
    );
}

const styles = StyleSheet.create({
    
    selectStyle: {
        height: "10%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center", 
    },

});
  
export default WeatherPage;