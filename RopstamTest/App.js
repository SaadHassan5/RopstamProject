import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Provider } from 'react-redux';
import StackNavigator from './src/navigators/stackNavigator';
import store from './src/root/store';

const App = (props) => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </Provider>
    // <TestScreen />
  )
}
export default App;
