import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal } from 'react-native';
import AppConstants from '../../utils/AppConstants';
import { normalize } from 'react-native-elements';

interface ICustomModalProps {
    title: string;
    message: string;
    onPress: () => void;
    visible: boolean
}

export const CustomModal = (props: ICustomModalProps) => {

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.visible}
            onRequestClose={props.onPress}
            supportedOrientations={['portrait', 'landscape']}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>{props.title}</Text>
                    <Text style={styles.modalMessage}>{props.message}</Text>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={props.onPress}
                    >
                        <Text style={styles.buttonText}>Ok</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: AppConstants.colors.white,
        borderRadius: 10,
        padding: normalize(35),
        width: normalize(300)
    },
    button: {
        borderRadius: 10,
        padding: 10,
        backgroundColor: AppConstants.colors.blue,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    modalTitle: {
        marginBottom: normalize(25),
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: normalize(20)
    },
    modalMessage: {
        marginBottom: normalize(20),
        fontSize: normalize(15),
        textAlign: 'center'
    }
});