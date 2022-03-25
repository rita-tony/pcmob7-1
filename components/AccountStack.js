import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/AccountScreen";
import { lightStyles, darkStyles } from '../styles/commonStyles';
import { useSelector } from "react-redux";

const Stack = createStackNavigator();

export default function AccountStack() {

  const isDark = useSelector((state) => state.accountPrefs.isDark);
  const styles = isDark ? darkStyles : lightStyles;

  return (
  <Stack.Navigator>
    <Stack.Screen component={AccountScreen} name="Account" options={{
        title: "Profile",
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        headerLeft: null
      }} />
  </Stack.Navigator>
  )
}
