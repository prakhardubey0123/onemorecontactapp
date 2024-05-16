import { createDrawerNavigator } from "@react-navigation/drawer"
import { NavigationContainer } from "@react-navigation/native"
import StackNavigator from "./StackNavigator"
import DrawerContent from "./DrawerContent"


const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="ContactListDrawer"
        screenOptions={{
          headerShown: false
        }}
        drawerContent={props => <DrawerContent {...props} />}
      >
        <Drawer.Screen
          name="ContactsStack"
          component={StackNavigator}
        />
        {/* <Drawer.Screen
          name="FavoritesScreen"
          component={FavoriteScreen}
        /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default DrawerNavigator
