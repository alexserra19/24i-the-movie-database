import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import StackNavigator from './navigation/Navigator'
import { NavigationContainer } from '@react-navigation/native';
import Store from './store/configureStore'
import { navigationRef, isReadyRef } from './navigation/RootNavigation';

const store = Store()

export default class App extends React.Component {

  componentDidMount() {
    isReadyRef.current = false;
  }

  render() {
    return (
      <Provider store={store}>
        <NavigationContainer
          ref={navigationRef}
          onReady={() => {
            isReadyRef.current = true;
          }}
        >
          {StackNavigator()}
        </NavigationContainer>
      </Provider>
    );
  }
}

AppRegistry.registerComponent("TheMovieDatabase", () => App);
