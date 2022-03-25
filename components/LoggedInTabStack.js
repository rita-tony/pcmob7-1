import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TransactionStack from '../components/TransactionStack';
import AccountStack from '../components/AccountStack';
import SummaryStack from '../components/SummaryStack';
import { FontAwesome, FontAwesome5, Entypo } from '@expo/vector-icons'; 
import { useSelector } from "react-redux";

const Tab = createBottomTabNavigator();

export default function LoggedInTabStack() {
  const isDark = useSelector((state) => state.accountPrefs.isDark);
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Transaction') {
              iconName = "piggy-bank"
              return <FontAwesome5 name={iconName} size={size} color={color} />;
          } else if (route.name === 'Balance') {
              iconName = "wallet"
              return <Entypo name={iconName} size={size} color={color} />;
          } else if (route.name === 'Settings') {
              iconName = "cog"
              return <FontAwesome name={iconName} size={size} color={color} />;
          }
        },
        headerShown: false,
        tabBarActiveTintColor:'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: [
          {
            display: "flex",
            backgroundColor: isDark ? "#181818" : "white",
          },
          null
        ],
      })}
      >
        <Tab.Screen name="Transaction" component={TransactionStack} />
        <Tab.Screen name="Balance" component={SummaryStack} />
        <Tab.Screen name="Settings" component={AccountStack} />
      </Tab.Navigator>
  )
} 