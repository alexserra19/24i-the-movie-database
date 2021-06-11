import AppConstants from "../utils/AppConstants";
import asyncStorageService from "./AsyncStorageService";
import interceptorService from './InterceptorService'
import configuration from "../api/config";
import { Platform } from "react-native";
import { Category, Media, Movie, Serie } from "../utils/typings";
import MediaAdapter from "../utils/adapters/MediaAdapter";

class MediaService {

    async getPopularMedia(media: Movie | Serie): Promise<Array<Media>> {
        let urlMedia = media === "movie" ? configuration.routes.getPopularMovies : configuration.routes.getPopularTvSeries
        let url = AppConstants.domain + urlMedia.replace('{key}', AppConstants.apiKey);
        let response = await interceptorService.doRequest(url);
        let data: Array<Media> = []
        if (response?.isSuccess) {
            data = MediaAdapter.JSONToMediaList(response.body.results, media)
        }
        return data
    }

    async getGenresByMediaType(media: Movie | Serie): Promise<Array<Category>> {
        let urlMedia = media === "movie" ? configuration.routes.getGenresMovies : configuration.routes.getGenresTvSeries
        let url = AppConstants.domain + urlMedia.replace('{key}', AppConstants.apiKey);
        let response = await interceptorService.doRequest(url);
        let data: Array<Category> = []
        if (response?.isSuccess) {
            data = MediaAdapter.JSONToCategoryList(response.body.genres, media)
        }
        return data
    }

    async searchMedia(query: string): Promise<Array<Media>> {
        console.log('query', query)
        let urlMedia = configuration.routes.searchMedia + "&query=" + query
        let url = AppConstants.domain + urlMedia.replace('{key}', AppConstants.apiKey);
        let response = await interceptorService.doRequest(url);
        let data: Array<Media> = []
        if (response?.isSuccess) {
            const values = response.body.results.filter(value => value.media_type === "movie" || value.media_type === "tv" );
            data = MediaAdapter.JSONToMediaList(values, null)
        }
        return data
    }
}

export default new MediaService();
