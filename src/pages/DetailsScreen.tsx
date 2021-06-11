import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Text, TextInput, Platform, Alert, Image } from 'react-native';
import AppConstants from '../utils/AppConstants';
import { normalize, withBadge } from 'react-native-elements';
import { useDispatch, useSelector } from "react-redux";
import { IsLoadingHoc } from "../components/HOCS/IsLoadingHOC";
import { HeaderBar } from "../components/shared/HeaderBar"
import * as RootNavigation from "../navigation/RootNavigation";
import Icon from 'react-native-vector-icons/FontAwesome';
import { commonStyles } from '../styles/common';

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
                <TouchableOpacity
                    onPress={() => console.log('ytest')}
                    style={[styles.playButton, commonStyles.shadows]}>
                    <Text>
                        <Icon name="play" size={normalize(30)} color={AppConstants.colors.white} />
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{media.title}</Text>
                <Text style={styles.date}>{media.date}</Text>
                <Text style={styles.description}>{media.description}</Text>
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
        left: 0,
        right: 0,
    },
    headerBar: {
        position: 'absolute',
        top: normalize(30),
        zIndex: 3,
        alignSelf: 'center',
        padding: normalize(10)
    },
    playButton: {
        width: normalize(70),
        height: normalize(70),
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: normalize(70),
        backgroundColor: '#409ff7',
        position: 'absolute',
        right: normalize(20),
        bottom: normalize(-30)
    },
    infoContainer: {
        marginTop: normalize(20),
        padding: normalize(10),
    },
    title: {
        fontSize: normalize(25),
        marginBottom: normalize(10)
    },
    date: {
        fontSize: normalize(18),
        marginBottom: normalize(20)
    },
    description: {
        fontSize: normalize(17),
        textAlign: 'justify',
        lineHeight: 28
    }
});
