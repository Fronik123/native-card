import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  ImageSourcePropType,
} from 'react-native';

type Props = {
  text: string;
  onPress: () => void;
  withImg?: boolean;
  img?: ImageSourcePropType;
};

const CustomLongButton: React.FC<Props> = ({
  onPress,
  text,
  withImg = false,
  img,
}) => {
  return (
    <>
      {withImg ? (
        <TouchableOpacity onPress={onPress} style={styles.button}>
          <View style={styles.wrapperName}>
            <Image source={img} style={styles.img} />

            <Text style={styles.buttonText}>{text}</Text>
          </View>

          <Image
            source={require('../assets/icon/custom-long-button/arrow-right.png')}
            style={styles.arrowRight}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onPress} style={styles.button}>
          <Text style={styles.buttonText}>{text}</Text>

          <Image
            source={require('../assets/icon/custom-long-button/arrow-right.png')}
            style={styles.arrowRight}
          />
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  buttonOutline: {
    borderWidth: 1,
    borderStyle: 'solid',
    padding: 15,
    borderRadius: 100,
    height: 49,
  },

  button: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 8,
    backgroundColor: '#F4F4F4',
    marginBottom: 8,
  },

  wrapperName: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  img: {
    width: 30,
    height: 30,
    marginRight: 10,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: 500,
  },

  arrowRight: {
    width: 24,
    height: 24,
  },
});

export default CustomLongButton;
