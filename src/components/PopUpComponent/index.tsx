import { ReactNode } from "react";
import { StyleSheet, View, Modal, TouchableWithoutFeedback } from "react-native";
import { ITEM_RADIUS } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setVisible } from "../../store/modal.reducer";

interface PopUpProps {
    body: ReactNode;
}

function PopUpComponent(props: PopUpProps) : JSX.Element {

    const { body } = props;

    const modalVisible = useSelector((state: RootState) => state.persistedReducer.modalState.isVisible);
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
        height: '50%',
        width: '80%',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: ITEM_RADIUS,
        padding: 35,
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