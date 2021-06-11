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
    const [movieGenreSelected, setMovieGenreSelected] = useState(null);
    const [tvSerieGenreSelected, setTvSerieGenreSelected] = useState(null);



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

    const renderCategoryItems = (
        categoriesList: Array<Category>,
        title: string,
        updateCategorySelected: Function,
        mediaList: Array<Media>
    ) => {
        return (
            <View>
                <View style={styles.categoriesContainer}>
                    <Text style={styles.categoryHeader}>{title}</Text>
                    <SelectDropdown
                        data={categoriesList}
                        defaultButtonText={'Select Category'}
                        onSelect={(selectedItem: any) => {
                            updateCategorySelected(selectedItem)
                        }}
                        buttonTextAfterSelection={(selectedItem: any) => {
                            return selectedItem.genre
                        }}
                        rowTextForSelection={(item: any) => {
                            return item.genre
                        }}
                        renderDropdownIcon={() => {
                            return (
                                <Icon name="angle-down" size={normalize(30)} color={AppConstants.colors.black} />
                            )
                        }}
                        rowTextStyle={styles.dropDownText}
                        buttonStyle={styles.dropDownStyle}
                        buttonTextStyle={styles.dropDownText}
                    />
                </View>
                <FlatList
                    horizontal
                    data={mediaList}
                    renderItem={renderMediaListItem}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        )
    }

    const renderMediaListItem = ({ item }: any) => {
        console.log('item', item)
        return (
            <TouchableOpacity
                onPress={() => viewItemDetails(item)}
            >
                <View style={{ width: normalize(100), marginRight: 10, backgroundColor: AppConstants.colors.white, height: normalize(150) }}>
                    <Image
                        style={{ width: '100%', height: '60%', resizeMode: 'stretch' }}
                        source={{ uri: item.image }}
                    />
                    <Text style={{padding: 3}}>{helpers.reduceText(item.title, 20)}</Text>
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
                <ScrollView
                    scrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                >
                    {!_.isEmpty(movies) &&
                        renderPrincipalMovies()
                    }
                    {!_.isEmpty(moviesCategories) &&
                        renderCategoryItems(moviesCategories, "Movies", setMovieGenreSelected, movies)
                    }
                    {!_.isEmpty(tvSeriesCategories) &&
                        renderCategoryItems(tvSeriesCategories, "TV Series", setTvSerieGenreSelected, tvSeries)
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
        flexDirection: 'row',
    },
    categoryHeader: {
        fontSize: normalize(25),
        alignSelf: 'center'
    }
});
