import 'react-native';
import React from 'react';
import HomeScreen from '../../src/pages/HomeScreen';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import { Store, AnyAction } from 'redux';
import { render } from '@testing-library/react-native'
import { Dimensions } from 'react-native';

jest.useFakeTimers()

describe('HomeScreen', () => {

  let store: Store<any, AnyAction>
  const mockStore = configureStore()

  const initialState = {
    mediaReducer: {
      selectedMedia: {}
    }
  }

  beforeEach(() => {
    store = mockStore(initialState)
  });

  const mockProps = {
    navigation: {},
    setLoading: jest.fn()
  }

  it('should match the snapshot', () => {
    const wrapper = render(
      <Provider store={store}>
        <HomeScreen {...mockProps} />
      </Provider>
    );
    expect(wrapper.toJSON()).toMatchSnapshot();
  })

  it('useEffect', () => {
    jest.spyOn(Dimensions, 'addEventListener')
    const wrapper = render(
      <Provider store={store}>
        <HomeScreen {...mockProps} />
      </Provider>
    );
    expect(Dimensions.addEventListener).toBeCalled()
  })

});
