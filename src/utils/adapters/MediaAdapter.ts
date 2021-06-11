import AppConstants from "../AppConstants";
import { Category, Media, Movie, Serie } from "../typings";

class MediaAdapter {

    JSONToMediaList(mediaList: Array<any>, type: Movie | Serie | null): Array<Media> {
        let mediaListAdapted = mediaList.map((item) => {
            return (
                {
                    id: item.id,
                    type: type ? type : item.media_type,
                    title: item.title || item.name,
                    description: item.overview,
                    popularity: item.popularity,
                    date: item.release_date || item.first_air_date,
                    rate: item.vote_average,
                    image: item.poster_path ? (AppConstants.imageUrl + item.poster_path) : '',
                    categories: item.genre_ids,
                    numVotes: item.vote_count
                }
            )
        })
        return mediaListAdapted
    }



    JSONToCategoryList(categoryList: Array<any>, type: Movie | Serie): Array<Category> {
        let categoryListAdapted = categoryList.map((item) => {
            return (
                {
                    id: item.id,
                    genre: item.name
                }
            )
        })
        return categoryListAdapted
    }
}

export default new MediaAdapter();
