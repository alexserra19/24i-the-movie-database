import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import moviesTypes from '../types/mediaTypes'
import moviesActions from '../actions/mediaActions'
import AppConstants from '../../utils/AppConstants';
import AsyncStorageService from '../../services/AsyncStorageService';
import MediaService from '../../services/MediaService';
import mediaActions from '../actions/mediaActions';


export function* initialize() {
    const { movies, tvSeries, moviesCategories, tvSeriesCategories } = yield all({
        movies: call(MediaService.getPopularMedia, "movie"),
        tvSeries: call(MediaService.getPopularMedia, "tv"),
        moviesCategories: call(MediaService.getGenresByMediaType, "movie"),
        tvSeriesCategories: call(MediaService.getGenresByMediaType, "tv")
    });

    yield put(mediaActions.initializeFinish(movies, tvSeries, moviesCategories, tvSeriesCategories))
}



export default [
    takeLatest(moviesTypes.INITIALIZE_START, initialize),
]