import { IndexPath, Layout, Select, SelectItem } from "@ui-kitten/components";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { valueToDimension } from "../../utils";

type Props = {
    data: string[];
    width: number;
    selectValue: string;
    setSelectValue: Dispatch<SetStateAction<string>>;
}

function SelectComponent(props: Props) {

    const data = props.data;
    const selectValue = props.selectValue;
    const setSelectValue = props.setSelectValue

    const [selectedIndex, setSelectedIndex] = useState<IndexPath>(new IndexPath(0));

    let i = 0;

    useEffect(() => {
        setSelectValue(data[selectedIndex.row])
    }, [selectedIndex]);

    const width = {width: valueToDimension(props.width)};

    return(
        <>
            <Layout
                level='1'
                style={width}
            >
                <Select
                    selectedIndex={selectedIndex}
                    onSelect={(index) => {setSelectedIndex(index as IndexPath)}}
                    value={selectValue}
                >
                    <>
                        {
                            data.map(d => <SelectItem key={i++} title={d}/>)
                        }
                    </>
                </Select>
            </Layout>
        </>
    )
}

const styles = StyleSheet.create({
    
});

export default SelectComponent;