import React from 'react';
import {View, StyleSheet, TextInput, Text} from 'react-native';

type Props = {
  value: any; //change ts
  placeholder: string;
  secureTextEntry?: boolean;
  onChangeText: (text: string) => void;
  onBlur?: (text: any) => void; //chnge ts
  errors?: any;
  editable?: boolean;
};

const CustomInput: React.FC<Props> = ({
  value,
  placeholder,
  secureTextEntry = false,
  onChangeText,
  onBlur,
  errors,
  editable = true,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={onChangeText}
        onBlur={onBlur}
        style={[styles.input, editable ? '' : styles.inputDisable]}
        placeholder={placeholder}
        value={value}
        autoCapitalize="none"
        secureTextEntry={secureTextEntry}
        placeholderTextColor="rgba(39, 39, 39, 0.5)"
        editable={editable}
      />

      {errors && <Text style={styles.error}>{errors}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },

  input: {
    height: 56,
    backgroundColor: '#F4F4F4',
    padding: 10,
    fontSize: 16,
    borderRadius: 4,
    width: '100%',
  },

  inputDisable: {
    color: 'rgba(39, 39, 39, 0.5)',
  },

  error: {
    paddingTop: 5,
    color: 'red',
  },
});

export default CustomInput;
