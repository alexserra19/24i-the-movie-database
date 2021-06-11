import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Text, TextInput, Platform, Alert, Image } from 'react-native';
import AppConstants from '../utils/AppConstants';
import { normalize, withBadge } from 'react-native-elements';
import { useDispatch, useSelector } from "react-redux";
import { IsLoadingHoc } from "../components/HOCS/IsLoadingHOC";
import { HeaderBar } from "../components/shared/HeaderBar"
import * as RootNavigation from "../navigation/RootNavigation";

interface IDetailsScreenProps {
    navigation: any;
    setLoading: Function
}

const DetailsScreen = (props: IDetailsScreenProps) => {

    const media = useSelector((store: any) => store.mediaReducer.selectedMedia);

    const dispatch = useDispatch()


    useEffect(() => {

    }, []);

    return (
        <View style={styles.container}>
            <HeaderBar
                title={'Details'}
                onPress={() => RootNavigation.goBack()}
                containerStyle={styles.headerBar}
            />
            <View style={styles.imageContainer}>
                <Image
                    style={{ width: '100%', height: '100%', resizeMode: 'stretch' }}
                    source={{ uri: media.image }}
                />
            </View>
        </View>
    );
}

export default IsLoadingHoc(DetailsScreen);


const styles = StyleSheet.create({
    container: {
        backgroundColor: AppConstants.colors.principalColor,
        flex: 1,
        height: '100%',
        width: '100%',
    },
    imageContainer: {
        height: normalize(400),
        width: '100%',
        position: 'absolute',
        left: 0,
        right: 0,
    },
    headerBar: {
        position: 'absolute',
        top: normalize(30),
        zIndex: 3,
        alignSelf: 'center',
        padding: normalize(10)
    }
});
