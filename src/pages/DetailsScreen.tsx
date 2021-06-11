import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Text, Modal, Image, Dimensions, ScrollView } from 'react-native';
import AppConstants from '../utils/AppConstants';
import { normalize } from 'react-native-elements';
import { useDispatch, useSelector } from "react-redux";
import { IsLoadingHoc } from "../components/HOCS/IsLoadingHOC";
import { HeaderBar } from "../components/shared/HeaderBar"
import * as RootNavigation from "../navigation/RootNavigation";
import Icon from 'react-native-vector-icons/FontAwesome';
import { commonStyles } from '../styles/common';
import helpers from '../utils/helpers';
import Video from 'react-native-video';

interface IDetailsScreenProps {
    navigation: any;
    setLoading: Function
}

const DetailsScreen = (props: IDetailsScreenProps) => {
    const [isLandscape, setIsLandscape] = useState<Boolean>(helpers.isLandscape());
    const [displayVideo, setDisplayVideo] = useState<Boolean>(false);

    const media = useSelector((store: any) => store.mediaReducer.selectedMedia);

    const dispatch = useDispatch()


    useEffect(() => {
        Dimensions.addEventListener('change', () => {
            setIsLandscape(helpers.isLandscape())
        })

        return () => {
            Dimensions.removeEventListener('change', () => {
                setIsLandscape(helpers.isLandscape())
            })
        }
    }, []);

    console.log('displayVideo', displayVideo)

    return (
        <View style={styles.container}>
            <HeaderBar
                title={'Details'}
                onPress={() => RootNavigation.goBack()}
                containerStyle={styles.headerBar}
            />
            <ScrollView
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}
            >
                <View style={[styles.imageContainer, { height: !isLandscape ? normalize(400) : normalize(200) }]}>
                    <Image
                        style={{ width: '100%', height: '100%', resizeMode: !isLandscape ? 'stretch' : 'cover' }}
                        source={{ uri: media.image }}
                    />
                    <TouchableOpacity
                        onPress={() => setDisplayVideo(true)}
                        style={[styles.playButton, commonStyles.shadows]}>
                        <Text>
                            <Icon name="play" size={normalize(30)} color={AppConstants.colors.white} />
                        </Text>
                    </TouchableOpacity>
                </View>

                {displayVideo &&
                    <Modal style={{backgroundColor: 'black'}}>
                        <Video
                            source={require('../assets/video/big_buck_bunny.mp4')}
                            controls={true}
                            style={{ height: '100%', width: '100%' }}
                            fullscreenOrientation={'landscape'}
                        />
                    </Modal>
                }

                <SafeAreaView>
                    <View style={styles.infoContainer}>
                        <Text style={styles.title}>{media.title}</Text>
                        <Text style={styles.date}>{media.date}</Text>
                        <Text style={styles.description}>{media.description}</Text>
                    </View>
                </SafeAreaView>
            </ScrollView>

        </View>
    );
}

export default IsLoadingHoc(DetailsScreen);


const styles = StyleSheet.create({
    container: {
        backgroundColor: AppConstants.colors.white,
        flex: 1,
        height: '100%',
        width: '100%',
    },
    imageContainer: {
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
