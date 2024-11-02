import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

type Props = {};

const SearchInput: React.FC<Props> = ({}) => {
  const onChangeText = () => {
    console.log('jerer sear');
  };
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/icon/search-inuput/search-input.png')}
      />
      <TextInput
        onChangeText={onChangeText}
        // onBlur={onBlur}
        style={styles.input}
        placeholder="Search"
        // value={value}
        autoCapitalize="none"
        placeholderTextColor="#272727"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 24,
    height: 40,
    backgroundColor: '#F4F4F4',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    borderRadius: 100,
    paddingLeft: 20,
    paddingRight: 25,
  },
  input: {
    fontSize: 13,
    marginLeft: 12,
    paddingRight: 12,
  },
});

export default SearchInput;
