import moviesTypes from '../types/mediaTypes';
import { Action } from 'redux';
import { Category, Media } from '../../utils/typings';

const mediaActions: IMediaActions = {
  initializeStart() {
    return {
      type: moviesTypes.INITIALIZE_START,
    };
  },
  initializeFinish(
    movies: Array<Media>,
    tvSeries: Array<Media>,
    moviesCategories: Array<Category>,
    tvSeriesCategories: Array<Category>
  ) {
    return {
      type: moviesTypes.INITIALIZE_FINISH,
      data: { movies, tvSeries, moviesCategories, tvSeriesCategories }
    };
  },
}

export default mediaActions;

export interface IMediaActions {
  initializeStart: () => Action;
  initializeFinish: (
    movies: Array<Media>,
    tvSeries: Array<Media>,
    moviesCategories: Array<Category>,
    tvSeriesCategories: Array<Category>
  ) => Action;
}
