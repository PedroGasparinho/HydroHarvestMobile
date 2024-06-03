import { ReactNode } from "react";
import { StyleSheet, View, Modal, TouchableWithoutFeedback } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../store";
import { setVisible } from "../../store/modal.reducer";
import { ITEM_RADIUS } from "../../utils/styles";

interface PopUpProps {
    body: ReactNode;
}

function PopUpComponent(props: PopUpProps) : JSX.Element {

    const { body } = props;

    const modalVisible = useSelector((state: State) => state.persistedReducer.modalState.isVisible);
    const dispatcher = useDispatch();
  
    return(
        <>
            <Modal
                animationType="none"
                transparent={true}
                visible={modalVisible}
                statusBarTranslucent={true}
                onRequestClose={() => {
                    dispatcher(setVisible(false));
                }}>
                <TouchableWithoutFeedback onPress={() => dispatcher(setVisible(false))}>
                    <View style={styles.modal}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalView}>
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
        height: '60%',
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