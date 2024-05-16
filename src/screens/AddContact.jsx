import {
  View,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  Image
} from 'react-native';
import { Button, Checkbox, Icon, TextInput } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import { openDatabase } from 'react-native-sqlite-storage';
import { useNavigation } from '@react-navigation/native';
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

// database file config
let db = openDatabase({ name: 'UserDatabase.db' });

// add user to db
const AddContact = () => {
  const navigation = useNavigation();

  // input states
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [landline, setLandline] = useState('')
  const [image, setImage] = useState('')
  const [isFavorite, setIsFavorite] = useState(false)

  const saveUser = () => {
    console.log(name, mobile, landline);
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_user (name, mobile, landline, favorite, image) VALUES (?,?,?,?,?)',
        [name, mobile, landline, isFavorite, image],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            ToastAndroid.show('Contact added', ToastAndroid.SHORT)
            navigation.navigate('ContactScreen')
          }
          else {
            ToastAndroid.show('Registration failed', ToastAndroid.SHORT)
          }
        },
        error => {
          console.log(error);
        },
      );
    });
  };

  useEffect(() => {
    db.transaction(txn => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        (tx, res) => {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), mobile VARCHAR(10), landline VARCHAR(10), favorite BOOLEAN default 0, image TEXT)',
              [],
            );
          }
        },
        error => {
          console.log(error);
        },
      );
    });
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
        const imageUri = `data:${response.assets[0].type};base64,${response.assets[0].base64}`
        setImage(imageUri)
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

      {/* pick image here */}
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
              mode='outlined'
            >
              Open Gallery
            </Button>
          </TouchableOpacity>
        </View>
      </View>

      <TextInput
        placeholder="Enter User Name"
        mode='outlined'
        value={name}
        label='Name'
        style={styles.textInput}
        onChangeText={txt => setName(txt)}
      />
      <TextInput
        placeholder="Enter User Mobile"
        value={mobile}
        style={styles.textInput}
        keyboardType='numeric'
        label='Mobile'
        mode='outlined'
        onChangeText={txt => setMobile(txt)}
      />
      <TextInput
        placeholder="Enter User Landline"
        keyboardType='numeric'
        value={landline}
        label='Landline'
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
          status={isFavorite > 0 ? 'checked' : 'unchecked'}
          onPress={() => setIsFavorite(!isFavorite)}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.saveButtonOpacity}
        onPress={() => { saveUser() }}
      >
        <Button
          style={styles.saveButton}
          mode='contained'
          text='Save Contact'
          
        >
          Save Contact
        </Button>
      </TouchableOpacity>
    </View>
  );
};

export default AddContact;

const styles = StyleSheet.create({
  containerWrapper: {
    marginHorizontal: 16,
    marginTop: 50,
    
  },
  textInput: {
    marginTop: 32,
    marginHorizontal: 16,
    color: 'white'
  },
  saveButton: {
    paddingVertical: 4,
    marginHorizontal: 16,
    backgroundColor:'green',
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
    marginHorizontal: 24,
    
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