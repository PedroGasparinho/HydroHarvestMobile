import { useEffect } from "react";
import { Text } from "react-native";
import { regions } from "../../utils/regions";
import { getWeather } from "../../utils/api";

function WeatherPage() {

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
    })

    return (
        <>
            <Text>Weather Page</Text>
        </>
    );
  }
  
  export default WeatherPage;