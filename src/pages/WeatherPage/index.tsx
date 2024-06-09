import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { regions } from "../../utils/regions";
import { getWeather } from "../../utils/api";
import TitleBarComponent from "../../components/TitleBarComponent";
import SelectIndexComponent from "../../components/SelectIndexComponent";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../store";
import WeatherComponent from "../../components/WeatherComponent";
import { Forecast } from "../../utils/domain";
import { Text } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import { setClosestForecast, setLatestForecast } from "../../store/forecast.reducer";
import { ERROR_TEXT_COLOR, ITEM_TEXT_SIZE } from "../../utils/styles";

function WeatherPage() {

    const closest = useSelector((state: State) => state.persistedReducer.locationReducer.closestRegionIdx);
    const latestForecast = useSelector((state: State) => state.persistedReducer.forecastReducer.latestForecast);
    const closestForecast = useSelector((state: State) => state.persistedReducer.forecastReducer.closestForecast);

    const [regionIdx, setRegionIdx] = useState<number>(0);
    const [forecast, setForecast] = useState<Forecast | undefined>(undefined);
    const [error, setError] = useState<string>("");

    const { isConnected } = useNetInfo();
    const dispatcher = useDispatch();

    useEffect(() => {
        setRegionIdx(closest-1); //-1 porque o api do ipma esta a ter problemas com vila do corvo
        if(isConnected) {
            sendRequest();
        } else {
            setForecast(closestForecast.forecast);
        } 
    }, [])

    async function sendRequest() {
        const response = await getWeather(regions[regionIdx]);
        if(response.ok) {
            const forecast = await response.json();
            setForecast(forecast);
            const savedForecast = {forecast: forecast, lastUpdated: new Date(), regionIdx: regionIdx}
            if(closest == regionIdx) {
                dispatcher(setClosestForecast(savedForecast));
            }
            dispatcher(setLatestForecast(savedForecast));
        } else {
            setForecast(undefined);
            setError("Server error: " + response.status);
        }
    }

    useEffect(() => {
        async function getForecast() {
            if(isConnected) {
                await sendRequest();
            } else {
                if(regionIdx == closestForecast.regionIdx) {
                    setForecast(closestForecast.forecast)
                } else if(regionIdx == latestForecast.regionIdx) {
                    setForecast(latestForecast.forecast)
                } else {
                    setForecast(undefined);
                    setError(`No connection and no saved data of ${regions[regionIdx].name}'s weather`);
                }
               setError("Connection error");
            }
        }
        getForecast();
    }, [regionIdx])

    function getLastUpdated() {
        if(isConnected) {
            return "";
        } else if(regionIdx == closestForecast.regionIdx) {
            return "Last updated: " + closestForecast.lastUpdated;
        } else if(regionIdx == latestForecast.regionIdx) {
            return "Last updated: " + latestForecast.lastUpdated;
        } else {
            return "";
        }
    }

    return (
        <>
            <TitleBarComponent title={"Weather Forecast"} leftAction={undefined} rightAction={undefined}/>
            <View style={styles.selectStyle}>
                <SelectIndexComponent data={regions.map(r => { return r.name; })} width={90} selectValue={regionIdx} setSelectValue={setRegionIdx}/>
            </View>
            <>
                {
                    forecast === undefined ? 
                        <View style={styles.errorStyle}>
                            <Text style={styles.errorText}>{error}</Text>
                        </View>:
                        <>
                            <WeatherComponent weather={forecast.yesterday} day="Yesterday"/>
                            <WeatherComponent weather={forecast.today} day="Today"/>
                            <WeatherComponent weather={forecast.tomorrow} day="Tomorrow"/>
                        </>
                }
            </>
            <View style={styles.lastReadStyle}>
                <Text>{getLastUpdated()}</Text>
            </View>
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

    errorStyle: {
        height: "75%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center", 
    },

    errorText: {
        color: ERROR_TEXT_COLOR,
        fontSize: ITEM_TEXT_SIZE
    },

    lastReadStyle: {
        height: "5%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center", 
    },

});
  
export default WeatherPage;