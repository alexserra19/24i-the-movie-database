import 'react-native';
import React from 'react';
import DetailsScreen from '../../src/pages/DetailsScreen';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import { Store, AnyAction } from 'redux';
import { fireEvent, render } from '@testing-library/react-native'
import { Dimensions } from 'react-native';
import * as RootNavigation from "../../src/navigation/RootNavigation";

jest.useFakeTimers()
jest.mock('../../src/navigation/RootNavigation')

describe('DetailsScreen', () => {

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
        <DetailsScreen {...mockProps} />
      </Provider>
    );
    expect(wrapper.toJSON()).toMatchSnapshot();
  })

  it('useEffect', () => {
    jest.spyOn(Dimensions, 'addEventListener')
    const wrapper = render(
      <Provider store={store}>
        <DetailsScreen {...mockProps} />
      </Provider>
    );
    expect(Dimensions.addEventListener).toBeCalled()
  })

  it('When Press Arrow Back from HeaderBar we should navigate back', () => {
    const wrapper = render(
      <Provider store={store}>
        <DetailsScreen {...mockProps} />
      </Provider>
    );

    jest.spyOn(RootNavigation, 'goBack')
    const button = wrapper.getByTestId('headerBarButton')
    fireEvent.press(button)

    expect(RootNavigation.goBack).toBeCalled()
  })

});
