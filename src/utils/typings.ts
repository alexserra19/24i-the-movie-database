export interface Media {
    id: number,
    type: Movie | Serie,
    title: String,
    description: String,
    popularity: number,
    date: String,
    rate: number,
    image: String
    categories: Array<number>
    numVotes: number
}

export interface Category {
    id: number,
    genre: string
}

export type Movie = "movie"
export type Serie = "tv"
