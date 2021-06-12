import renderer from 'react-test-renderer';
import MediaService from '../../../src/services/MediaService';
import { initialize } from '../../../src/store/saga/mediaSaga';
import { all } from '@redux-saga/core/effects';
import { call, put } from 'redux-saga/effects';
import mediaActions from '../../../src/store/actions/mediaActions';
import helpers from '../../../src/utils/helpers';
import { Category, Media } from '../../../src/utils/typings';


describe('Media Saga', () => {

    it('initialize with no error', async () => {

        const gen = initialize();

        const mockMediaMovie = {
            id: 1,
            type: "movie",
            title: 'title',
            description: 'description',
            popularity: 10,
            date: '2021-12-01',
            rate: 10,
            image: 'image.jpg',
            categories: [1, 2, 3],
            numVotes: 10
        }

        const mockMediaTv = {
            ...mockMediaMovie,
            type: "tv"
        }

        const mockCategory = {
            id: 1,
            genre: 'Comedy'
        }

        const movies: Array<Media> = [mockMediaMovie]
        const tvSeries: Array<Media> = [mockMediaTv]
        const moviesCategories: Array<Category> = [mockCategory]
        const tvSeriesCategories: Array<Category> = [mockCategory]

        expect(gen.next().value).toEqual(all({
            movies: call(MediaService.getPopularMedia, "movie"),
            tvSeries: call(MediaService.getPopularMedia, "tv"),
            moviesCategories: call(MediaService.getGenresByMediaType, "movie"),
            tvSeriesCategories: call(MediaService.getGenresByMediaType, "tv"),
        }))

        expect(gen.next({movies, tvSeries, moviesCategories, tvSeriesCategories}).value)
            .toEqual(put(mediaActions.initializeFinish(movies, tvSeries, moviesCategories, tvSeriesCategories)));

    });


    it('initialize with error', async () => {

        const gen = initialize();

        const movies: any = []
        const tvSeries: any = []
        const moviesCategories: any = []
        const tvSeriesCategories: any = []

        expect(gen.next().value).toEqual(all({
            movies: call(MediaService.getPopularMedia, "movie"),
            tvSeries: call(MediaService.getPopularMedia, "tv"),
            moviesCategories: call(MediaService.getGenresByMediaType, "movie"),
            tvSeriesCategories: call(MediaService.getGenresByMediaType, "tv"),
        }))

        expect(gen.next({movies, tvSeries, moviesCategories, tvSeriesCategories}).value).toEqual(call(helpers.handleNetworkError));

    });
});