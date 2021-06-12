import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, Text, Dimensions, ScrollView, FlatList } from 'react-native';
import AppConstants from '../utils/AppConstants';
import { normalize, SearchBar } from 'react-native-elements';
import { useDispatch, useSelector } from "react-redux";
import * as RootNavigation from "../navigation/RootNavigation";
import mediaActions from '../store/actions/mediaActions';
import _ from "lodash"
import { commonStyles } from '../styles/common';
import { Category, Media } from '../utils/typings';
import helpers from '../utils/helpers';
import Carousel from 'react-native-snap-carousel';
import { CarouselItem } from '../components/CarouselItem/CarouselItem';
import { MediaListItem } from '../components/MediaListItem/MediaListItem';
import RNPickerSelect from 'react-native-picker-select';
import { LoadingOverlay } from '../components/shared/LoadingOverlay';
import MediaService from '../services/MediaService';
import { SearchItem } from '../components/SearchItem/SearchItem';
import { CustomModal } from '../components/shared/CustomModal';

interface IHomeScreenProps {
    navigation: any;
}

const HomeScreen = (props: IHomeScreenProps) => {
    const [search, updateSearch] = useState<string>('');
    const movies = useSelector((store: any) => store.mediaReducer.movies);
    const tvSeries = useSelector((store: any) => store.mediaReducer.tvSeries);
    const moviesCategories = useSelector((store: any) => store.mediaReducer.moviesCategories);
    const tvSeriesCategories = useSelector((store: any) => store.mediaReducer.tvSeriesCategories);
    const listsLoaded = useSelector((store: any) => store.mediaReducer.listsLoaded);
    const [screenWidth, updateScreenWidth] = useState<number>(Dimensions.get('window').width);
    const [movieCategorySelected, setMovieCategorySelected] = useState(null);
    const [tvSerieCategorySelected, setTvSerieCategorySelected] = useState(null);
    const [isLandscape, setIsLandscape] = useState<boolean>(helpers.isLandscape());
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [searchResults, setSearchResults] = useState<Array<Media>>([]);
    const [showNoResultsModal, setShowNoResultsModal] = useState<boolean>(false);
    const [timeoutSearch, setTimeoutSearch] = useState<any>(0);
    const dispatch = useDispatch()

    useEffect(() => {
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
        if (listsLoaded) {
            setIsLoading(false)
        }
    }, [listsLoaded]);


    useEffect(() => {
        if (listsLoaded) {
            if (search) doSearch()
            else cleanSearch()
        }
    }, [search]);

    const doSearch = () => {
        if (timeoutSearch) clearTimeout(timeoutSearch)
        const timeout = setTimeout(() => { startSearch(search) }, 100);
        setTimeoutSearch(timeout)
    }

    const cleanSearch = () => {
        updateSearch('')
        setSearchResults([])
        setIsLoading(false)
        clearTimeout(timeoutSearch)
    }

    const startSearch = async (text: string) => {

        setIsLoading(true)
        const data = await MediaService.searchMedia(text)

        if (!_.isEmpty(data)) setSearchResults(data)
        else {
            cleanSearch()
            setShowNoResultsModal(true)
        }
        setIsLoading(false)
    }

    const renderHomeContent = () => {
        const infoLoaded = !_.isEmpty(movies) && !_.isEmpty(moviesCategories) && !_.isEmpty(tvSeriesCategories)
        return (
            infoLoaded ? (
                <View>
                    {renderPrincipalMovies()}
                    {renderCategoryItems(moviesCategories, "Movies", setMovieCategorySelected, movies, movieCategorySelected)}
                    {renderCategoryItems(tvSeriesCategories, "TV Series", setTvSerieCategorySelected, tvSeries, tvSerieCategorySelected)}
                </View>
            ) : null
        )
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
        categorySelected: any
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
                            viewContainer: styles.pickerViewContainer,
                            inputAndroid: styles.pickerInputAndroid,
                            inputIOS: styles.pickerInputIOS,
                            placeholder: styles.pickerPlaceholder
                        }}
                        fixAndroidTouchableBug
                    />
                    <Text style={{width: '100%', height: 60, position: 'absolute', bottom: 0, left: 0}}>{' '}</Text>

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

    const renderSearchResult = () => {
        const searchItems = searchResults.map((item, index) => renderSearchItem(item, index))
        return (
            <View>
                {searchItems}
            </View>
        )
    }

    const renderSearchItem = (item: Media, index: number) => {
        return (
            <SearchItem
                item={item}
                onPress={viewItemDetails}
                isLandscape={isLandscape}
                key={index}
            />
        )
    }

    return (
        <SafeAreaView style={styles.centeredView}>
            <View style={styles.container}>
                <SearchBar
                    placeholder="Discover"
                    onChangeText={updateSearch}
                    onCancel={cleanSearch}
                    onClear={cleanSearch}
                    value={search}
                    containerStyle={[commonStyles.shadows, styles.searchContainer]}
                    inputContainerStyle={{ backgroundColor: AppConstants.colors.white }}
                />

                {isLoading && <LoadingOverlay backColor={false} />}

                <ScrollView
                    scrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ alignContent: 'center' }}
                >
                    {!_.isEmpty(searchResults) && renderSearchResult()}
                    {_.isEmpty(searchResults) && !isLoading && renderHomeContent()}
                </ScrollView>
            </View>

            <CustomModal
                title={'No Results Found'}
                message={"Hmmmm, we're not getting any results. Our bad, try another search"}
                visible={showNoResultsModal}
                onPress={() => setShowNoResultsModal(false)}
            />
        </SafeAreaView>
    );
}

export default HomeScreen;


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
        flex: 1
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
    },
    pickerViewContainer: {
        justifyContent: 'center',
        width: '100%',
        flex: 1
    },
    pickerInputAndroid: {
        fontSize: normalize(15),
        color: AppConstants.colors.black
    },
    pickerInputIOS: {
        fontSize: normalize(15),
        color: AppConstants.colors.black,
        textAlign: 'right'
    },
    pickerPlaceholder: {
        fontSize: normalize(15),
        color: AppConstants.colors.black
    }
});
