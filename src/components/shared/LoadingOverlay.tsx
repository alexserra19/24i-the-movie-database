import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import AppConstants from '../../utils/AppConstants';


interface ILoadingOverlayProps {
    color?: string;
    size?: string
}

export const LoadingOverlay = ({ size = "large", color = AppConstants.colors.white }: ILoadingOverlayProps) => {

    return (
        <View style={styles.loadingOverlay}>
            <ActivityIndicator size={size} color={color} />
        </View>
    );
}

const styles = StyleSheet.create({
    loadingOverlay: {
        flex: 1,
        justifyContent: "center",
        position: 'absolute',
        right: 0,
        top: 0,
        left: 0,
        bottom: 0,
        alignItems: 'center',
        backgroundColor: 'black',
        opacity: 0.4,
        zIndex: 99,
        elevation: 9
    },
});