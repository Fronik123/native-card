/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';

import Navigation from './src/navigation/Navigation';

import store from './src/redux/store';

// const Tab = createBottomTabNavigator();

// function TabNavigator(): React.JSX.Element {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{headerTitle: ''}}
//       />
//     </Tab.Navigator>
//   );
// }
// const dispatch = useDispatch<DispatchType>();
// const {loginTest} = useSelector((state: StateType) => state.auth);

// useEffect(() => {
//   console.log('home login??', loginTest);
// }, [loginTest]);

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
