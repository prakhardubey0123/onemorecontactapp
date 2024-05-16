import React from 'react'
import DrawerNavigator from './navigators/DrawerNavigator'
import 'react-native-gesture-handler'
import { Provider as PaperProvider, DarkTheme } from 'react-native-paper';
const App = () => {
  return (
    <PaperProvider theme={DarkTheme}>
    <DrawerNavigator/>
    </PaperProvider>
  )
}

export default App