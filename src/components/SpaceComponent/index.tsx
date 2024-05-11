import { DimensionValue, View } from "react-native";
import { Dimension, valueToDimension } from "../../utils";

type Props = {
    value: number,
    dimension: Dimension
}

function SpaceComponent(props: Props) {

    const val = props.value;
    const dim = props.dimension;

    const width = valueToDimension(dim === Dimension.Width? val : 100);
    const height = valueToDimension(dim === Dimension.Height? val : 100);

    const style = {width: width, height: height}

    return(
        <View style={style}>
            <></>
        </View>
    )
}

export default SpaceComponent;