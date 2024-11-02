import React from 'react';
import {Stack} from '../../types/pageTypes';

import SettingScreen from '../../page/SettingScreen';

const SettingStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {backgroundColor: '#FFFFFF'},
      }}>
      <Stack.Screen name="Settings" component={SettingScreen} />
    </Stack.Navigator>
  );
};

export default SettingStack;
