import { IndexPath, Layout, Select, SelectItem } from "@ui-kitten/components";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { valueToDimension } from "../../utils";

type Props = {
    data: string[];
    width: number;
    selectValue: number;
    setSelectValue: Dispatch<SetStateAction<number>>;
}

function SelectIndexComponent(props: Props) {

    const data = props.data;
    const selectValue = props.selectValue;
    const setSelectValue = props.setSelectValue;

    const [selectedIndex, setSelectedIndex] = useState<IndexPath>(new IndexPath(0));

    let i = 0;

    useEffect(() => {
        setSelectValue(selectedIndex.row)
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
                    value={data[selectValue]}
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

export default SelectIndexComponent;