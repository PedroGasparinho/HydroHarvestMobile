import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { isStringEmpty } from "../../utils";
import { useState } from "react";
import { ALT_TEXT_COLOR, BORDER_COLOR, BORDER_WIDTH, ERROR_TEXT_COLOR, ITEM_RADIUS, ITEM_TEXT_SIZE, ITEM_TITLE_SIZE, TEXT_COLOR } from "../../utils/styles";
import { CONFIRM_ICON_MAIN_COLOR } from "../../utils/icons";

type Props = {
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
    onNameChangeCallback: (name: string) => Promise<string>
    onAddUserCallback: (name: string) => Promise<string>
}

function CropOptionsComponent(props: Props) {

    const [error, setError] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");

    const { setModalVisible, onNameChangeCallback, onAddUserCallback } = props;

    async function onUserSubmit() {
        setError("");
        if(isStringEmpty(email)) {
            setError("User email cannot be empty");
        } else {
            const errorString = await onAddUserCallback(email)
            if(isStringEmpty(errorString)) {
                setModalVisible(false);
            } else {
                setError("Error: " + errorString);
            }
        }
    }

    async function onEditSubmit() {
        setError("");
        if(isStringEmpty(name)) {
            setError("New name cannot be empty");
        } else {
            const errorString = await onNameChangeCallback(name)
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
                <Text style={styles.titleText}>Add User</Text>
            </View>
            <View style={styles.nameView}>
                <Text style={styles.nameText}>User Email:</Text>
                <TextInput style={styles.nameInput} value={email} onChangeText={setEmail}/>
            </View>
            <View style={styles.submitView}>
                <TouchableOpacity style={styles.submitStyle} onPress={onUserSubmit}>
                    <Text style={styles.submitText}>Add user</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.titleView}>
                <Text style={styles.titleText}>Change Name</Text>
            </View>
            <View style={styles.nameView}>
                <Text style={styles.nameText}>New Name:</Text>
                <TextInput style={styles.nameInput} value={name} onChangeText={setName}/>
            </View>
            <View style={styles.submitView}>
                <TouchableOpacity style={styles.submitStyle} onPress={onEditSubmit}>
                    <Text style={styles.submitText}>Change name</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.submitError}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({

    titleView: {
        height: "10%",
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
        height: "20%",
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
        borderWidth: BORDER_WIDTH,
        width: "80%",
        height: "50%",
    },

    submitView: {
        height: "15%",
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
        height: "10%",
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

export default CropOptionsComponent;