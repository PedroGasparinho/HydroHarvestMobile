import { ReactNode } from "react";
import { StyleSheet, View, Modal, TouchableWithoutFeedback } from "react-native";
import { ITEM_RADIUS } from "../../utils/styles";
import { valueToDimension } from "../../utils";

interface PopUpProps {
    body: ReactNode;
    height: number;
    modalVisible: boolean,
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

function PopUpComponent(props: PopUpProps) : JSX.Element {

    const { body, height, modalVisible, setModalVisible } = props;
  
    return(
        <>
            <Modal
                animationType="none"
                transparent={true}
                visible={modalVisible}
                statusBarTranslucent={true}
                onRequestClose={() => {
                    setModalVisible(false);
                }}>
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={styles.modal}>
                        <TouchableWithoutFeedback>
                            <View style={[styles.modalView, { height: valueToDimension(height) }]}>
                                <>{body}</>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    )
}
  
const styles = StyleSheet.create({

    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        height: "100%",
    },
    
    modalView: {
        width: '80%',
        margin: 5,
        backgroundColor: 'white',
        borderRadius: ITEM_RADIUS,
        padding: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
});
  
export default PopUpComponent; 