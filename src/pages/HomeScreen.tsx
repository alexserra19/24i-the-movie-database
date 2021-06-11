import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Text, TextInput, Platform, Alert, Button, Image, Dimensions, ScrollView, Picker, FlatList } from 'react-native';
import AppConstants from '../utils/AppConstants';
import { ListItem, normalize, SearchBar } from 'react-native-elements';
import { useDispatch, useSelector } from "react-redux";
import { IsLoadingHoc } from "../components/HOCS/IsLoadingHOC";
import * as RootNavigation from "../navigation/RootNavigation";
import mediaActions from '../store/actions/mediaActions';
import _ from "lodash"
import { commonStyles } from '../styles/common';
import { Category, Media } from '../utils/typings';
import helpers from '../utils/helpers';
import Carousel from 'react-native-snap-carousel';
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/FontAwesome';
import { CarouselItem } from '../components/CarouselItem/CarouselItem';
import { MediaListItem } from '../components/MediaListItem/MediaListItem';
import RNPickerSelect from 'react-native-picker-select';

interface IHomeScreenProps {
    navigation: any;
    setLoading: Function
}

const HomeScreen = (props: IHomeScreenProps) => {
    const [search, updateSearch] = useState<string>('');
    const movies = useSelector((store: any) => store.mediaReducer.movies);
    const tvSeries = useSelector((store: any) => store.mediaReducer.tvSeries);
    const moviesCategories = useSelector((store: any) => store.mediaReducer.moviesCategories);
    const tvSeriesCategories = useSelector((store: any) => store.mediaReducer.tvSeriesCategories);
    const [screenWidth, updateScreenWidth] = useState<number>(Dimensions.get('window').width);
    const [movieCategorySelected, setMovieCategorySelected] = useState(null);
    const [tvSerieCategorySelected, setTvSerieCategorySelected] = useState(null);
    const [isLandscape, setIsLandscape] = useState<Boolean>(helpers.isLandscape());

    const dispatch = useDispatch()

    useEffect(() => {
        props.setLoading(true)
        dispatch(mediaActions.initializeStart())

        Dimensions.addEventListener('change', () => {
            updateScreenWidth(Dimensions.get('window').width)
            setIsLandscape(helpers.isLandscape())
        })

        return () => {
            Dimensions.removeEventListener('change', () => {
                updateScreenWidth(Dimensions.get('window').width)
                setIsLandscape(helpers.isLandscape())
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


    const renderPrincipalMovies = () => {
        const isLandscape = helpers.isLandscape()
        return (
            <Carousel
                data={movies}
                renderItem={renderItemPrincipalMovie}
                sliderWidth={screenWidth - normalize(isLandscape ? 110 : 20)}
                itemWidth={screenWidth - normalize(100)}
            />
        )
    }

    const viewItemDetails = (item: Media) => {
        dispatch(mediaActions.selectMedia(item))
        RootNavigation.navigate(AppConstants.routeName.details)
    }

    const renderItemPrincipalMovie = ({ item }: any) => {
        return (
            <CarouselItem
                item={item}
                onPress={viewItemDetails}
                isLandscape={isLandscape}
            />
        );
    }

    const renderCategoryItems = (
        categoriesList: Array<Category>,
        title: string,
        updateCategorySelected: Function,
        mediaList: Array<Media>,
        categorySelected: number
    ) => {
        let selectItems = categoriesList.map((item) => ({ label: item.genre, value: item.id }))
        return (
            <View>
                <View style={styles.categoriesContainer}>
                    <Text style={styles.categoryHeader}>{title}</Text>
                    <RNPickerSelect
                        onValueChange={(value) => updateCategorySelected(value)}
                        items={selectItems}
                        placeholder={{
                            label: 'Select a Category',
                            value: null,
                            color: AppConstants.colors.black
                        }}
                        style={{
                            viewContainer: { 
                                justifyContent: 'center',
                                width: '100%',
                                flex: 1
                            },
                            inputAndroid: {
                                fontSize: normalize(15),
                                color: AppConstants.colors.black
                            },
                            inputIOS: {
                                fontSize: normalize(15),
                                color: AppConstants.colors.black,
                                textAlign: 'right'
                            },
                            placeholder: {
                                fontSize: normalize(15),
                                color: AppConstants.colors.black
                            }
                        }}
                    />
                </View>
                <FlatList
                    horizontal
                    data={mediaList}
                    renderItem={(item) => renderMediaListItem(item, categoriesList, categorySelected)}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        )
    }

    const renderMediaListItem = ({ item }: any, categoriesList: Array<Category>, categorySelected: number) => {

        const filteredArray = categoriesList.filter(value => item.categories.includes(value.id));
        let categories = filteredArray.map((item) => item.genre).join(', ')


        return (
            _.isNull(categorySelected) || item.categories.includes(categorySelected) ?
                <MediaListItem
                    item={item}
                    onPress={viewItemDetails}
                    categories={categories}
                /> : null
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
                <ScrollView
                    scrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                >
                    {!_.isEmpty(movies) &&
                        renderPrincipalMovies()
                    }
                    {!_.isEmpty(moviesCategories) &&
                        renderCategoryItems(moviesCategories, "Movies", setMovieCategorySelected, movies, movieCategorySelected)
                    }
                    {!_.isEmpty(tvSeriesCategories) &&
                        renderCategoryItems(tvSeriesCategories, "TV Series", setTvSerieCategorySelected, tvSeries, tvSerieCategorySelected)
                    }
                </ScrollView>
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
    dropDownStyle: {
        width: '100%',
        backgroundColor: 'transparent',
        flex: 2
    },
    dropDownText: {
        textAlign: 'right'
    },
    categoriesContainer: {
        marginTop: normalize(20),
        marginBottom: normalize(10),
        flexDirection: 'row',
    },
    categoryHeader: {
        fontSize: normalize(25),
        alignSelf: 'center'
    }
});
