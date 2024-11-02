import React from 'react';
import {Stack} from '../../types/pageTypes';

import AddCardScreen from '../../page/AddCardScreen';

const NewCardScreen: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {backgroundColor: '#FFFFFF'},
      }}>
      <Stack.Screen
        name="AddCardScreen"
        component={AddCardScreen}
        options={{headerTitle: ''}}
      />
    </Stack.Navigator>
  );
};

export default NewCardScreen;
