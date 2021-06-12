import renderer from 'react-test-renderer';
import mediaTypes from '../../../src/store/types/mediaTypes';
import mediaActions from '../../../src/store/actions/mediaActions';


describe('Media Actions', () => {
    test('initializeStart', () => {
        const expectedAction = {
            type: mediaTypes.INITIALIZE_START,
        }

        expect(mediaActions.initializeStart()).toEqual(expectedAction)
    });

    test('initializeFinish', () => {
        const mockMovies = [
            {
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
        ]

        const mockTvSeries = [
            {
                id: 1,
                type: "tv",
                title: 'title',
                description: 'description',
                popularity: 10,
                date: '2021-12-01',
                rate: 10,
                image: 'image.jpg',
                categories: [1, 2, 3],
                numVotes: 10
            }
        ]

        const mockMoviesCategories = [
            {
                id: 1,
                genre: 'Comedy'
            }
        ]

        const mockTvSeriesCategories = [
            {
                id: 1,
                genre: 'Comedy'
            }
        ]

        const expectedAction = {
            type: mediaTypes.INITIALIZE_FINISH,
            data: {
                movies: mockMovies,
                tvSeries: mockTvSeries,
                moviesCategories: mockMoviesCategories,
                tvSeriesCategories: mockTvSeriesCategories
            }
        }

        expect(mediaActions.initializeFinish(mockMovies, mockTvSeries, mockMoviesCategories, mockTvSeriesCategories)).toEqual(expectedAction)
    });

    test('selectMedia', () => {

        const mockMedia = {
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

        const expectedAction = {
            type: mediaTypes.SELECT_MEDIA,
            data: mockMedia
        }

        expect(mediaActions.selectMedia(mockMedia)).toEqual(expectedAction)
    });
});