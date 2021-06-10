import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Text, TextInput, Platform, Alert, Button, Image } from 'react-native';
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

interface IHomeScreenProps {
    navigation: any;
    setLoading: Function
}

const HomeScreen = (props: IHomeScreenProps) => {
    const [search, updateSearch] = useState<string>('');
    const movies = useSelector(store => store.mediaReducer.movies);
    const tvSeries = useSelector(store => store.mediaReducer.tvSeries);
    const moviesCategories = useSelector(store => store.mediaReducer.moviesCategories);
    const tvSeriesCategories = useSelector(store => store.mediaReducer.tvSeriesCategories);


    const dispatch = useDispatch()


    useEffect(() => {
        props.setLoading(true)
        dispatch(mediaActions.initializeStart())
    }, []);


    useEffect(() => {
        console.log('movies', movies)
        console.log('tvSeries', tvSeries)
        console.log('moviesCategories', moviesCategories)
        console.log('tvSeriesCategories', tvSeriesCategories)


        if (!_.isEmpty(movies) && !_.isEmpty(tvSeries) && !_.isEmpty(moviesCategories)) {
            props.setLoading(false)
        }
    }, [movies, tvSeries]);


    const doSearch = (text: string) => {
        updateSearch(text)
        console.log('text', text)
    }


    const renderPrincipalMovie = () => {
        const movieIndex = Math.round(Math.random() * movies.length);

        console.log('------', movies[movieIndex])
        return (
            <View style={[commonStyles.row, styles.principalMovie]}>
                <Image
                    style={{ width: '100%', height: '100%', resizeMode: 'stretch' }}
                    source={{ uri: movies[movieIndex].image }}
                />
                <View style={{ position: 'absolute', left: 0, bottom: 0, backgroundColor: 'red' }}>
                    <Text style={{ color: AppConstants.colors.white }}>{helpers.reduceText(movies[movieIndex].description, 40)}</Text>
                    <Text style={{ color: AppConstants.colors.white, fontSize: normalize(20) }}>{helpers.reduceText(movies[movieIndex].title, 40)}</Text>
                </View>
            </View>
        )
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

                <View>
                    <Text>Structure preparated</Text>
                </View>
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
        width: '100%'
    },
    principalMovie: {
        marginTop: normalize(20),
        height: normalize(200),
        width: '100%'
    }
});
