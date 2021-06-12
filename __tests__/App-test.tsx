/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../src/App';
import renderer from 'react-test-renderer';

jest.useFakeTimers();

it('renders correctly', () => {
  renderer.create(<App />);
});
