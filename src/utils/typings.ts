export interface Media {
    id: Number,
    type: Movie | Serie,
    title: String,
    description: String,
    popularity: Number,
    date: String,
    rate: Number,
    image: String
    categories: Array<Number>
    numVotes: number
}

export interface Category {
    id: Number,
    genre: string
}

export type Movie = "movie"
export type Serie = "tv"
