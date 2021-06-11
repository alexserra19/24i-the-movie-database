import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Text, TextInput, Platform, Alert, Button, Image, Dimensions } from 'react-native';
import AppConstants from '../utils/AppConstants';
import { normalize, SearchBar } from 'react-native-elements';
import { useDispatch, useSelector } from "react-redux";
import { IsLoadingHoc } from "../components/HOCS/IsLoadingHOC";
import * as RootNavigation from "../navigation/RootNavigation";
import mediaActions from '../store/actions/mediaActions';
import _ from "lodash"
import { commonStyles } from '../styles/common';
import { Category, Media } from '../utils/typings';
import helpers from '../utils/helpers';
import Carousel from 'react-native-snap-carousel';

interface IHomeScreenProps {
    navigation: any;
    setLoading: Function
}

const HomeScreen = (props: IHomeScreenProps) => {
    const [search, updateSearch] = useState<string>('');
    const movies = useSelector((store:any) => store.mediaReducer.movies);
    const tvSeries = useSelector((store:any) => store.mediaReducer.tvSeries);
    const moviesCategories = useSelector((store:any) => store.mediaReducer.moviesCategories);
    const tvSeriesCategories = useSelector((store:any) => store.mediaReducer.tvSeriesCategories);
    const [screenWidth, updateScreenWidth] = useState<number>(Dimensions.get('window').width);


    const dispatch = useDispatch()


    useEffect(() => {
        props.setLoading(true)
        dispatch(mediaActions.initializeStart())

        Dimensions.addEventListener('change', () => {
            updateScreenWidth(Dimensions.get('window').width)
        })

        return () => {
            Dimensions.removeEventListener('change', () => {
                updateScreenWidth(Dimensions.get('window').width)
            })
        }
    }, []);


    useEffect(() => {
        if (!_.isEmpty(movies) && !_.isEmpty(tvSeries) && !_.isEmpty(moviesCategories)) {
            props.setLoading(false)
        }
    }, [movies, tvSeries]);


    const doSearch = (text: string) => {
        updateSearch(text)
    }


    const renderPrincipalMovie = () => {
        const isLandscape = helpers.isLandscape()
        return (
            <Carousel
                data={movies}
                renderItem={renderItem}
                sliderWidth={screenWidth - normalize(isLandscape ? 110 : 20)}
                itemWidth={screenWidth - normalize(70)}
            />
        )
    }

    const viewItemDetails = (item: Media) => {
        dispatch(mediaActions.selectMedia(item))
        RootNavigation.navigate(AppConstants.routeName.details)
    }

    const renderItem = ({ item }: any) => {
        return (
            <TouchableOpacity
                onPress={() => viewItemDetails(item)}
            >
                <View style={[commonStyles.row, styles.principalMovie, commonStyles.shadows]}>
                    <Image
                        style={{ width: '100%', height: '100%', resizeMode: 'stretch' }}
                        source={{ uri: item.image }}
                    />
                    <View style={styles.principalMovieTextContainer}>
                        <Text style={{ color: AppConstants.colors.white }}>{helpers.reduceText(item.description, 20)}</Text>
                        <Text style={{ color: AppConstants.colors.white, fontSize: normalize(20) }}>{helpers.reduceText(item.title, 20)}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <SafeAreaView style={styles.centeredView}>
            <View style={styles.container}>
                <SearchBar
                    placeholder="Discover"
                    onChangeText={doSearch}
                    value={search}
                    containerStyle={[commonStyles.shadows, styles.searchContainer, { zIndex: -99 }]}
                    inputContainerStyle={{ backgroundColor: AppConstants.colors.white, zIndex: -99 }}
                />
                {!_.isEmpty(movies) && renderPrincipalMovie()}

                <View style={{ flex: 1, flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                        <Button
                            title='aaa'
                            onPress={() => RootNavigation.navigate(AppConstants.routeName.details)}
                        >
                        </Button>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default IsLoadingHoc(HomeScreen);


const styles = StyleSheet.create({
    centeredView: {
        backgroundColor: AppConstants.colors.principalColor,
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        height: '100%',
        width: '100%',
        padding: normalize(10),
    },
    searchContainer: {
        padding: 5,
        backgroundColor: AppConstants.colors.white,
        borderTopWidth: 0,
        borderBottomWidth: 0,
        borderRadius: 5,
        width: '100%',
        marginBottom: normalize(30)
    },
    principalMovie: {
        marginTop: normalize(20),
        height: normalize(200),
        width: '100%',
    },
    principalMovieTextContainer: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        backgroundColor: AppConstants.colors.black,
        padding: normalize(10),
        opacity: 0.8
    }
});
