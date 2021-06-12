import renderer from 'react-test-renderer';
import mediaTypes from '../../../src/store/types/mediaTypes';
import mediaReducer from '../../../src/store/reducers/mediaReducer';


describe('Media Reducer', () => {

    let initialState = {
        movies: [],
        tvSeries: [],
        moviesCategories: [],
        tvSeriesCategories: [],
        selectedMedia: null,
        listsLoaded: false,
        selectedMedia: null
    }

    it('should return the initial state', () => {
        expect(mediaReducer(initialState, {})).toEqual(initialState);
    });

    it('should handle INITIALIZE_FINISH', () => {

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

        const mockInitializeFinishAction = {
            type: mediaTypes.INITIALIZE_FINISH,
            data: {
                movies: mockMovies,
                tvSeries: mockTvSeries,
                moviesCategories: mockMoviesCategories,
                tvSeriesCategories: mockTvSeriesCategories,
                listsLoaded: true
            }
        };


        const mockResultState = {
            ...initialState,
            movies: mockMovies,
            tvSeries: mockTvSeries,
            moviesCategories: mockMoviesCategories,
            tvSeriesCategories: mockTvSeriesCategories,
            listsLoaded: true
        }

        expect(mediaReducer(initialState, mockInitializeFinishAction)).toEqual(mockResultState);
    });

    it('should handle SELECT_MEDIA', () => {

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

        const mockSelectMediaAction = {
            type: mediaTypes.SELECT_MEDIA,
            data: mockMedia
        };


        const mockResultState = {
            ...initialState,
            selectedMedia: mockMedia
        }

        expect(mediaReducer(initialState, mockSelectMediaAction)).toEqual(mockResultState);
    });
});
