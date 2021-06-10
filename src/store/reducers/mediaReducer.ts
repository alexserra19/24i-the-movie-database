import { Media } from '../../utils/typings';
import moviesTypes from '../types/mediaTypes';

export interface IMediaReducerState {
  movies: Array<Media>;
  tvSeries: Array<Media>;
  tvSeriesCategories: Array<{id: Number, name: string}>;
  moviesCategories: Array<{id: Number, name: string}>;


}

export const initialState: IMediaReducerState = {
  movies: [],
  tvSeries: [],
  moviesCategories: [],
  tvSeriesCategories: [],
};

const mediaReducer = (state: IMediaReducerState = initialState, action: any) => {
  switch (action.type) {
    case moviesTypes.INITIALIZE_FINISH:
      return {
        ...state,
        movies: action.data.movies,
        tvSeries: action.data.tvSeries,
        moviesCategories: action.data.moviesCategories,
        tvSeriesCategories: action.data.tvSeriesCategories
      }

    default:
      return state
  }
};

export default mediaReducer;


