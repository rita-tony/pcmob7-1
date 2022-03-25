import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import SummaryScreen from "../screens/SummaryScreen";
import { lightStyles, darkStyles } from '../styles/commonStyles';
import { useSelector } from "react-redux";

const Stack = createStackNavigator();

export default function SummaryStack() {

  const isDark = useSelector((state) => state.accountPrefs.isDark);
  const styles = isDark ? darkStyles : lightStyles;

  return (
  <Stack.Navigator>
    <Stack.Screen component={SummaryScreen} name="Summary" options={{
        title: "Balance",
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        headerLeft: null
      }} />
  </Stack.Navigator>
  )
}
