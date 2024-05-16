import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { openDatabase } from 'react-native-sqlite-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button, TextInput, Icon, Checkbox} from 'react-native-paper';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

let db = openDatabase({ name: 'UserDatabase.db' });

const UpdateContact = () => {
  const route = useRoute();
  
  console.log(route.params.data);

  const navigation = useNavigation();

  const [name, setName] = useState(route.params.data.name);
  const [mobile, setMobile] = useState(route.params.data.mobile);
  const [landline, setLandline] = useState(route.params.data.landline);
  const [image, setImage] = useState(route.params.data.image)
  const [isFavorite, setIsFavorite] = useState(route.params.data.favorite)

  const updateUser = () => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE table_user set name=?, mobile=? , landline=?, favorite=?, image=? where user_id=?',
        [name, mobile, landline, isFavorite, image, route.params.data.id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User updated successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('ContactScreen'),
                },
              ],
              { cancelable: false },
            );
          } else Alert.alert('Updation Failed');
        },
      );
    });
  };
  useEffect(() => {
    setName(route.params.data.name);
    setMobile(route.params.data.mobile)
    setLandline(route.params.data.landline)
    setImage(route.params.data.image)
    setIsFavorite(route.params.data.favorite)

  }, []);

  // image selection
  const selectImageFromGallery = () => {
    let options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      includeBase64: true
    }
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker')
      }
      else if (response.error) {
        console.log(response.error)
      }
      else {
        setImage(response.assets[0])
      }
    })
  }

  const selectImageFromCamera = () => {
    let options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      includeBase64: true
    }
    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker')
      }
      else if (response.error) {
        console.log(response.error)
      }
      else {
        const imageUri = `data:${response.assets[0].type};base64,${response.assets[0].base64}`
        setImage(imageUri)
      }
    })
  }

  return (
    <View style={styles.containerWrapper}>
      <View style={styles.container}>
        <Image
          source={image ? {uri: image} : require('../images/image.png')}
          style={styles.addImage}
        />
        <View
          style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => selectImageFromCamera()}
          >
            <Button
              icon='camera'
              mode='outlined'
            >
              Open Camera
            </Button>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => selectImageFromGallery()}
          >
            <Button
              icon='folder-open'
              mode='contained'
            >
              Open Gallery
            </Button>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity>
        <Icon
          name='person'
          size={48}
          label='Person'
        >
          Photo
        </Icon>
      </TouchableOpacity>
      <TextInput
        placeholder="Enter User Name"
        mode='outlined'
        value={name}
        style={styles.textInput}
        onChangeText={txt => setName(txt)}
      />
      <TextInput
        placeholder="Enter User Mobile"
        value={mobile}
        style={styles.textInput}
        keyboardType='numeric'
        mode='outlined'
        onChangeText={txt => setMobile(txt)}
      />
      <TextInput
        placeholder="Enter User Landline"
        keyboardType='numeric'
        value={landline}
        style={[styles.textInput, { marginBottom: 32 }]}
        mode='outlined'
        onChangeText={txt => setLandline(txt)}
      />
      <TouchableOpacity
        onPress={() => setIsFavorite(!isFavorite)}
      >
        <Checkbox
          label="Favorite"
          mode='outlined'
          status={isFavorite ? 'checked' : 'unchecked'} // not showing checked box for favorited contact
          onPress={() => setIsFavorite(!isFavorite)}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.saveButtonOpacity}
        onPress={() => { updateUser() }}
      >
        <Button
          style={styles.saveButton}
          icon='floppy'
          mode='contained'
          text='Update Contact'
        >
          Update Contact
        </Button>
      </TouchableOpacity>
    </View>
  );
};

export default UpdateContact;

const styles = StyleSheet.create({
  containerWrapper: {
    marginHorizontal: 16,
    marginTop: 50
  },
  textInput: {
    marginTop: 32,
    marginHorizontal: 16
  },
  saveButton: {
    paddingVertical: 4,
    marginHorizontal: 16
  },
  TouchableOpacity: {
    marginHorizontal: 16,
  },
  container: {
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 48,
  },
  button: {
    marginHorizontal: 24
  },
  addImage: {
    width: 200,
    height: 200,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 100,
    justifyContent: 'center',
  }
})