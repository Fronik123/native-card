import ImagePicker from 'react-native-image-crop-picker';

import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  FlatList,
} from 'react-native';

type Props = {
  onImageSelect: (uri: string) => void;
};

const AddNewImage: React.FC<Props> = ({onImageSelect}) => {
  const [imageUris, setImageUris] = useState([]);

  const selectMultipleImages = () => {
    console.log('herer first img');
    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo',
    })
      .then(images => {
        const uris = images.map(image => ({uri: image.path}));

        setImageUris(uris);
        onImageSelect(uris);
      })
      .catch(error => {
        console.log('Error picking images: ', error);
      });
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = imageUris.filter((item, i) => i !== index);
    setImageUris(updatedImages);
    onImageSelect(updatedImages);
  };

  return (
    <View>
      <FlatList
        horizontal
        keyExtractor={(item, index) => index.toString()}
        data={imageUris}
        renderItem={({item, index}) => (
          <View style={styles.containerImg}>
            <Image
              key={index}
              source={{uri: item.uri}}
              style={styles.mainImg}
            />

            <TouchableOpacity
              onPress={() => handleRemoveImage(index)}
              style={styles.removeButton}>
              <Image
                style={styles.imgDelete}
                source={require('../assets/icon/add-product/delete-icon.png')}
              />
            </TouchableOpacity>
          </View>
        )}
      />

      {!imageUris.length ? (
        <TouchableOpacity
          onPress={selectMultipleImages}
          style={styles.containerSelect}>
          <Image
            source={require('../assets/icon/add-product/add-image.png')}
            style={styles.imgAdd}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={selectMultipleImages}
          style={styles.containerAddMore}>
          <Image
            source={require('../assets/icon/add-product/add-image.png')}
            style={styles.imgAddMore}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  containerImg: {
    position: 'relative',
    marginTop: 10,
  },

  removeButton: {
    position: 'absolute',
    right: 0,
    top: -10,
  },

  mainImg: {
    width: 100,
    height: 100,
    marginRight: 10,
  },

  containerSelect: {
    borderColor: '#8E6CEF',
    borderWidth: 1,
    height: 100,
    marginBottom: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  selectText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
  },

  imgAdd: {
    width: 55,
    height: 55,
  },

  containerAddMore: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginVertical: 10,
  },

  imgAddMore: {
    width: 35,
    height: 35,
  },

  imgDelete: {
    width: 25,
    height: 25,
  },
});

export default AddNewImage;
