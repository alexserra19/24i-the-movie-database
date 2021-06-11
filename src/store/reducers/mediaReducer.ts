import { Media } from '../../utils/typings';
import moviesTypes from '../types/mediaTypes';

export interface IMediaReducerState {
  movies: Array<Media>;
  tvSeries: Array<Media>;
  tvSeriesCategories: Array<{ id: number, name: string }>;
  moviesCategories: Array<{ id: number, name: string }>;
  selectedMedia: Media,
  listsLoaded: boolean
}

export const initialState: IMediaReducerState = {
  movies: [],
  tvSeries: [],
  moviesCategories: [],
  tvSeriesCategories: [],
  selectedMedia: null,
  listsLoaded: false
};

const mediaReducer = (state: IMediaReducerState = initialState, action: any) => {
  switch (action.type) {
    case moviesTypes.INITIALIZE_FINISH:
      return {
        ...state,
        movies: action.data.movies,
        tvSeries: action.data.tvSeries,
        moviesCategories: action.data.moviesCategories,
        tvSeriesCategories: action.data.tvSeriesCategories,
        listsLoaded: true
      }

    case moviesTypes.SELECT_MEDIA:
      return {
        ...state,
        selectedMedia: action.data
      }

    default:
      return state
  }
};

export default mediaReducer;


