import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  Image,
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import React, { useEffect, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { openDatabase } from 'react-native-sqlite-storage';
import { FAB, Icon, Searchbar } from 'react-native-paper';

let db = openDatabase({ name: 'UserDatabase.db' });
const Home = () => {

  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [userList, setUserList] = useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filterUserList, setFilterUserList] = React.useState([])

  useEffect(() => {
    getData();
  }, [isFocused]);

  const getData = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM table_user', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setUserList(temp);
        setFilterUserList(temp)
      });
    });
  };

  let deleteUser = id => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM  table_user where user_id=?',
        [id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User deleted successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => {
                    getData();
                  },
                },
              ],
              { cancelable: false },
            );
          } else {
            Alert.alert('Please insert a valid User Id');
          }
        },
      );
    });
  };


  const handleSearch = (query) => {
    setSearchQuery(query)
    const filtered = userList.filter((contact) =>
      contact.name.toLowerCase().includes(query.toLowerCase())
    )
    setFilterUserList(filtered)
  }

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={handleSearch}
        value={searchQuery}
        style={{ margin: 8 }}
      />

      <SwipeListView
        data={filterUserList}
        renderItem={({ item, index }) => {
          return (
            <View
              style={styles.userItem}
            >
              <View style={styles.imageTextWrapper}>
                <Image
                  source={item.image ?
                    { uri: item.image } :
                    require('../images/image.png')
                  }
                  style={styles.userImage}
                />
                <View>
                  <Text style={styles.userName}>{'Name: ' + item.name}</Text>
                  <Text style={styles.userStatus}>{'Mobile: ' + item.mobile}</Text>
                  <Text style={styles.userStatus}>{'Landline: ' + item.landline}</Text>
                </View>
              </View>
            </View>
          )
        }}
        renderHiddenItem={(item, rowMap) => (
          <View style={[styles.rowBack, { padding: 10, flexDirection: 'row', justifyContent: 'space-between', color: '#000' }]}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('UpdateContact', {
                  data: {
                    name: item.item.name,
                    mobile: item.item.mobile,
                    landline: item.item.landline,
                    favorite: item.item.favorite,
                    image: item.item.image,
                    id: item.item.user_id,
                  },
                });
              }}>
              <Icon
                style={[{ color: '#000', margin: 10 }]}
                source='pencil'
                size={48}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => deleteUser(item.item.user_id)}
            >
              <Icon
                style={[{ color: '#000', margin: 10 }]}
                source='delete'
                size={48}
              />
            </TouchableOpacity>
          </View>
        )}
        disableRightSwipe={false}
        leftOpenValue={75}
        rightOpenValue={-75}
      />

      <TouchableOpacity
        style={styles.addNewBtn}
        onPress={() => {
          navigation.navigate('AddContact');
        }}>
        <FAB
          icon='plus'
          source='plus'
        />
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageTextWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
    // backgroundColor: '#8D3DAF',
    padding: 8,
    borderRadius: 10
  },
  userImage: {
    width: 75,
    height: 75,
    borderRadius: 75 / 2,
    marginRight: 14
  },
  addNewBtn: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
  },
  userItem: {
    // width: '100%',
    borderRadius: 30,
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    padding: 10,
  },
  belowView: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 20,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    height: 50,
  },
  icons: {
    width: 24,
    height: 24,
  },
  imageWrapper: {
    width: 100,
    height: 100,
    borderRadius: 60 / 2,
    marginRight: 14
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000'
  },
  userStatus: {
    fontSize: 16,
    color: '#000'
  }
});