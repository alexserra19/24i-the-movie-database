import InterceptorService from '../../src/services/InterceptorService';
import MediaService from '../../src/services/MediaService';
import MediaAdapter from '../../src/utils/adapters/MediaAdapter';
import AppConstants from '../../src/utils/AppConstants';
import configuration from "../../src/api/config";

afterEach(() => {
    jest.clearAllMocks();
});

describe('MediaService', () => {

    const mockResponseAdapterMedia = [
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

    const mockResponseAdapterGenres = [
        {
            id: 1,
            genre: 'Comedy'
        }
    ]

    const mockResponseInterceptorMedia = {
        isSuccess: true,
        body: {
            results: [
                {
                    id: 1
                }
            ]
        }
    }

    const mockResponseInterceptorGenres = {
        isSuccess: true,
        body: {
            genres: [
                {
                    id: 1
                }
            ]
        }
    }

    const mockResponseInterceptorSearch = {
        isSuccess: true,
        body: {
            results: [
                {
                    id: 1,
                    media_type: "movie"
                }
            ]
        }
    }

    it('getPopularMedia', async () => {
        const mockUrl = AppConstants.domain + configuration.routes.getPopularMovies.replace('{key}', AppConstants.apiKey);
        const interceptorSpy = jest.spyOn(InterceptorService, 'doRequest').mockImplementation(() => Promise.resolve(mockResponseInterceptorMedia));
        const adapterSpy = jest.spyOn(MediaAdapter, 'JSONToMediaList').mockImplementation(() => mockResponseAdapterMedia);

        const data = await MediaService.getPopularMedia("movie")

        expect(interceptorSpy).toBeCalledWith(mockUrl)
        expect(adapterSpy).toBeCalledWith(mockResponseInterceptorMedia.body.results, "movie")
        expect(data).toBe(mockResponseAdapterMedia)
    });

    it('getGenresByMediaType', async () => {
        const mockUrl = AppConstants.domain + configuration.routes.getGenresMovies.replace('{key}', AppConstants.apiKey);

        const interceptorSpy = jest.spyOn(InterceptorService, 'doRequest').mockImplementation(() => Promise.resolve(mockResponseInterceptorGenres));
        const adapterSpy = jest.spyOn(MediaAdapter, 'JSONToCategoryList').mockImplementation(() => mockResponseAdapterGenres);

        const data = await MediaService.getGenresByMediaType("movie")

        expect(interceptorSpy).toBeCalledWith(mockUrl)
        expect(adapterSpy).toBeCalledWith(mockResponseInterceptorGenres.body.genres)
        expect(data).toBe(mockResponseAdapterGenres)
    });

    it('getGenresByMediaType', async () => {
        const mockQuery = 'query'
        const mockUrl = AppConstants.domain + configuration.routes.searchMedia.replace('{key}', AppConstants.apiKey) + "&query=" + mockQuery;

        const interceptorSpy = jest.spyOn(InterceptorService, 'doRequest').mockImplementation(() => Promise.resolve(mockResponseInterceptorSearch));
        const adapterSpy = jest.spyOn(MediaAdapter, 'JSONToMediaList').mockImplementation(() => mockResponseAdapterMedia);

        const data = await MediaService.searchMedia(mockQuery)

        expect(interceptorSpy).toBeCalledWith(mockUrl)
        expect(adapterSpy).toBeCalledWith(mockResponseInterceptorSearch.body.results, null)
        expect(data).toBe(mockResponseAdapterMedia)
    });
});
