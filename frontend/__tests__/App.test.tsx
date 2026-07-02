/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

jest.mock('@react-navigation/native', () => {
  const React = require('react');
  const { View } = require('react-native');

  return {
    NavigationContainer: ({children}: {children?: React.ReactNode}) =>
      React.createElement(View, null, children),
  };
});

jest.mock('../src/navigation/navigators/RootNavigator', () => {
  const React = require('react');
  const { View } = require('react-native');

  return function RootNavigatorMock() {
    return React.createElement(View, null);
  };
});

import App from '../App';

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});
