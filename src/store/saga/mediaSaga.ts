import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import moviesTypes from '../types/mediaTypes'
import MediaService from '../../services/MediaService';
import mediaActions from '../actions/mediaActions';
import _ from 'lodash';
import helpers from '../../utils/helpers';


export function* initialize() {
    const { movies, tvSeries, moviesCategories, tvSeriesCategories } = yield all({
        movies: call(MediaService.getPopularMedia, "movie"),
        tvSeries: call(MediaService.getPopularMedia, "tv"),
        moviesCategories: call(MediaService.getGenresByMediaType, "movie"),
        tvSeriesCategories: call(MediaService.getGenresByMediaType, "tv")
    });

    if(_.isEmpty(movies) || _.isEmpty(tvSeries) || _.isEmpty(moviesCategories) || _.isEmpty(tvSeriesCategories)) {
        yield call (helpers.handleNetworkError)
    }
    else yield put(mediaActions.initializeFinish(movies, tvSeries, moviesCategories, tvSeriesCategories))
}



export default [
    takeLatest(moviesTypes.INITIALIZE_START, initialize),
]