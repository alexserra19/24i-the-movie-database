
export default {
    routes: {
        getPopularMovies: "3/movie/popular?api_key={key}",
        getPopularTvSeries: "3/tv/popular?api_key={key}",
        getGenresTvSeries: "/3/genre/tv/list?api_key={key}&language=en-US",
        getGenresMovies: "/3/genre/movie/list?api_key={key}&language=en-US"
    }
}
