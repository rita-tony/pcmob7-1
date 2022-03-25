import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import IndexScreen from '../screens/IndexScreen';
import CreateScreen from '../screens/CreateScreen';
import EditScreen from '../screens/EditScreen';
import ShowScreen from '../screens/DetailsScreen';
import { lightStyles, darkStyles } from '../styles/commonStyles';
import { useSelector } from "react-redux";

const InnerStack = createStackNavigator();

export default function TransactionStack() {
  
  const isDark = useSelector((state) => state.accountPrefs.isDark);
  const styles = isDark ? darkStyles : lightStyles;

  const headerOptions = {
    headerStyle: styles.header,
    headerTitleStyle: styles.headerTitle,
    headerTintColor: styles.headerTint
  }

  return (
    <InnerStack.Navigator>
      <InnerStack.Screen name="Index" component={IndexScreen} options={{ title: "Transaction", ...headerOptions, headerLeft: null }} />
      <InnerStack.Screen name="Add" component={CreateScreen} options={{ title: "Add Transaction", ...headerOptions }} />
      <InnerStack.Screen name="Details" component={ShowScreen} options={headerOptions} />
      <InnerStack.Screen name="Edit" component={EditScreen} options={{ title: "Edit Transaction", ...headerOptions }} />
    </InnerStack.Navigator>
  )
}