import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

type Props = {
  text: string;
  onPress: () => void;
  bgColor?: string;
  textColor: string;
  outline?: boolean;
  borderColor?: string;
};

const CustomButton: React.FC<Props> = ({
  onPress,
  text,
  bgColor,
  textColor,
  borderColor,
  outline = false,
}) => {
  return (
    <>
      {outline ? (
        <TouchableOpacity
          onPress={onPress}
          style={[styles.buttonOutline, {borderColor: borderColor}]}>
          <Text style={[styles.buttonText, {color: textColor}]}>{text}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={onPress}
          style={[styles.button, {backgroundColor: bgColor}]}>
          <Text style={[styles.buttonText, {color: textColor}]}>{text}</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  buttonOutline: {
    borderWidth: 1,
    borderStyle: 'solid',
    padding: 10,
    borderRadius: 5,
    width: 120,
    height: 40,
  },

  button: {
    padding: 10,
    borderRadius: 5,
    width: 120,
    height: 40,
  },

  buttonText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 500,
  },
});

export default CustomButton;
