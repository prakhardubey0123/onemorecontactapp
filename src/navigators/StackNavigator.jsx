import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ContactScreen from "../screens/ContactScreen";
import { IconButton } from "react-native-paper";
import { DrawerActions } from "@react-navigation/native";
import AddContact from "../screens/AddContact";
import UpdateContact from "../screens/UpdateContact";
import FavoriteScreen from "../screens/FavoriteScreen";

const Stack = createNativeStackNavigator()

const StackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="Contacts"
    >
      <Stack.Screen
        name='ContactScreen'
        component={ContactScreen}
        options={{
          headerTitle: 'Contacts',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <IconButton
              icon="menu"
              iconColor='black'
              size={20}
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            />
          )
        }}
      />
      <Stack.Screen
        name="AddContact"
        component={AddContact}
      />
      <Stack.Screen
        name="UpdateContact"
        component={UpdateContact}
      />
      <Stack.Screen
        name="FavoriteScreen"
        component={FavoriteScreen}
        // initialParams={{ contacts }}
        options={{
          headerTitle: 'Favorites',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <IconButton
              icon="menu"
              iconColor='black'
              size={20}
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            />
          ),
        }}
      />
    </Stack.Navigator>
  )
}

export default StackNavigator