import React from 'react';
import {Stack} from '../../types/pageTypes';

import HomeScreen from '../../page/HomeScreen';

const HomeStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {backgroundColor: '#FFFFFF'},
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerTitle: '', headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
