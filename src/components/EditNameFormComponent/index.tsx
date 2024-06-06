import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { isStringEmpty } from "../../utils";
import { useState } from "react";
import { ALT_TEXT_COLOR, BORDER_COLOR, ERROR_TEXT_COLOR, ITEM_RADIUS, ITEM_TEXT_SIZE, ITEM_TITLE_SIZE, TEXT_COLOR } from "../../utils/styles";
import { CONFIRM_ICON_MAIN_COLOR } from "../../utils/icons";

type Props = {
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
    callback: (name: string) => Promise<string>
}

function EditNameFormComponent(props: Props) {

    const [error, setError] = useState<string>("");
    const [name, setName] = useState<string>("");

    const { setModalVisible, callback } = props;

    async function onSubmit() {
        setError("");
        if(isStringEmpty(name)) {
            setError("New name cannot be empty");
        } else {
            const errorString = await callback(name)
            if(isStringEmpty(errorString)) {
                setModalVisible(false);
            } else {
                setError("Error: " + errorString);
            }
        }
    }

    return(
        <>
            <View style={styles.titleView}>
                <Text style={styles.titleText}>Change Name</Text>
            </View>
            <View style={styles.nameView}>
                <Text style={styles.nameText}>New Name:</Text>
                <TextInput style={styles.nameInput} value={name} onChangeText={setName}/>
            </View>
            <View style={styles.submitView}>
                <TouchableOpacity style={styles.submitStyle} onPress={onSubmit}>
                    <Text style={styles.submitText}>Submit</Text>
                </TouchableOpacity>
                <View style={styles.submitError}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({

    titleView: {
        height: "35%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },

    titleText: {
        color: TEXT_COLOR,
        fontSize: ITEM_TITLE_SIZE,
        fontWeight: "bold"
    },

    nameView: {
        height: "40%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
    },

    nameText: {
        color: TEXT_COLOR,
        fontSize: ITEM_TEXT_SIZE
    },

    nameInput: {
        borderRadius: ITEM_RADIUS,
        borderColor: BORDER_COLOR,
        borderWidth: 2,
        width: "80%",
        height: "50%",
    },

    submitView: {
        height: "35%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        gap: 5,
    },

    submitStyle: {
        height: "70%",
        width: "80%",
        backgroundColor: CONFIRM_ICON_MAIN_COLOR,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: ITEM_RADIUS,
    },

    submitError: {
        height: "30%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },

    submitText: {
        color: ALT_TEXT_COLOR,
        fontSize: ITEM_TEXT_SIZE,
    },

    errorText: {
        color: ERROR_TEXT_COLOR,
        fontSize: ITEM_TEXT_SIZE
    },


});

export default EditNameFormComponent;