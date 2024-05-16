// interface DrawerItemProps {
//     icon: string,
//     label: string,
//     navigateTo: string
// }




// import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer"
// import { useNavigation } from "@react-navigation/native"
// import { StyleSheet, View } from "react-native"
// import { Icon } from "react-native-paper"

// const DrawerList = [
//   {
//     icon: 'contacts',
//     label: 'AllContacts',
//     navigateTo: 'ContactScreen'
//   },
//   {
//     icon: 'star',
//     label: 'Favorites',
//     navigateTo: 'FavoriteScreen'
//   },
// ]

// const DrawerLayout = ({ icon, label, navigateTo }) => {
//   const navigation = useNavigation()

//   return (
//     <DrawerItem
//       icon={({ color, size }) =>
//         <Icon
//           name={icon}
//           source={icon}
//           color={color}
//           size={size}
//         />
//       }
//       label={label}
//       onPress={() => {
//         navigation.navigate(navigateTo)
//       }}
//     />
//   )
// }

// const DrawerItems = () => {
//   return DrawerList.map((el, i) => {
//     return (
//       <DrawerLayout
//         key={i}
//         icon={el.icon}
//         label={el.label}
//         navigateTo={el.navigateTo} />
//     )
//   })
// }

// const DrawerContent = (props) => {
//   return (
//     <View style={{flex: 1}}>
//       <DrawerContentScrollView {...props}>
//         <View style={styles.drawerContent}>
//           <View style={styles.drawerSection}>
//             <DrawerItems />
//           </View>
//         </View>
//       </DrawerContentScrollView>
//     </View>
//   )
// }

// export default DrawerContent

// const styles = StyleSheet.create({
//   drawerContent: {
//     flex: 1
//   },
//   drawerSection: {
//     marginTop: 15,
//     borderBottomWidth: 0,
//     borderBottomColor: '#dedede',
//     borderBottomWidth: 1
//   },

// })






import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { Icon } from "react-native-paper";

const DrawerList = [
  {
    icon: 'contacts',
    label: 'AllContacts',
    navigateTo: 'ContactScreen',
    color: 'green', // Set color for AllContacts icon
  },
  {
    icon: 'star',
    label: 'Favorites',
    navigateTo: 'FavoriteScreen',
    color: 'gold', // Set color for Favorites icon
  },
];

const DrawerLayout = ({ icon, label, navigateTo, color }) => {
  const navigation = useNavigation();

  return (
    <DrawerItem
      icon={({ color: iconColor, size }) =>
        <Icon
          name={icon}
          source={icon}
          color={color === 'green' ? 'green' : 'gold'} // Set color based on label
          size={size}
        />
      }
      label={label}
      onPress={() => {
        navigation.navigate(navigateTo);
      }}
    />
  );
};

const DrawerItems = () => {
  return DrawerList.map((el, i) => {
    return (
      <DrawerLayout
        key={i}
        icon={el.icon}
        label={el.label}
        navigateTo={el.navigateTo}
        color={el.color} // Pass color as a prop
      />
    );
  });
};

const DrawerContent = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.drawerSection}>
            <DrawerItems />
          </View>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1
  },
  drawerSection: {
    marginTop: 15,
    borderBottomWidth: 0,
    borderBottomColor: '#dedede',
    borderBottomWidth: 1
  },
});
