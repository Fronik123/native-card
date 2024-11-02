import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Tab} from '../../types/pageTypes';

import HomeStack from './HomeStack';
import NewCardStack from './NewCardStack';
import SettingStack from './SettingStack';

import HomeIcon from '../../assets/icon/navigation/home.png';
import CardIcon from '../../assets/icon/navigation/create.png';
import ProfileIcon from '../../assets/icon/navigation/profile.png';

import HomeIconActive from '../../assets/icon/navigation/home-active.png';
import CardIconActive from '../../assets/icon/navigation/create-active.png';
import ProfileIconActive from '../../assets/icon/navigation/profile-active.png';

interface CustomTabBarProps {
  state: any;
  navigation: any;
  icons: {[key: string]: any};
  iconsActive: {[key: string]: any};
}

const TabNavigator: React.FC = () => {
  const icons = {
    HomeStack: HomeIcon,
    NewCardStack: CardIcon,
    SettingStack: ProfileIcon,
  };

  const iconsActive = {
    HomeStack: HomeIconActive,
    NewCardStack: CardIconActive,
    SettingStack: ProfileIconActive,
  };

  return (
    <Tab.Navigator
      tabBar={props => (
        <CustomTabBar {...props} icons={icons} iconsActive={iconsActive} />
      )}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{tabBarLabel: 'Home'}}
      />
      <Tab.Screen
        name="NewCardStack"
        component={NewCardStack}
        options={{tabBarLabel: 'Create'}}
      />
      <Tab.Screen
        name="SettingStack"
        component={SettingStack}
        options={{tabBarLabel: 'Setting'}}
      />
    </Tab.Navigator>
  );
};

const CustomTabBar: React.FC<CustomTabBarProps> = ({
  state,
  navigation,
  iconsActive,
  icons,
}) => {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route: any, index: string) => {
        const isFocused = state.index === index;

        const iconSource = icons[route.name];
        const iconSourceActive = iconsActive[route.name];

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && event.defaultPrevented === false) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={styles.tabButton}>
            {isFocused ? (
              <Image source={iconSourceActive} style={styles.icon} />
            ) : (
              <Image source={iconSource} style={styles.icon} />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    elevation: 4,
    height: 75,
  },
  icon: {
    width: 24,
    height: 24,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 13,
  },
});

export default TabNavigator;
