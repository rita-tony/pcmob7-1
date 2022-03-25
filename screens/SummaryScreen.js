import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { API, API_BALANCE_AMOUNT, API_WHOAMI } from "../constants/API";
import { commonStyles, lightStyles, darkStyles } from "../styles/commonStyles";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUserId, setCurrentUserName } from "../redux/ducks/TransactionAuth";
import { setCurrentUserTheme } from "../redux/ducks/accountPref";


export default function SummaryScreen({ navigation }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const isDark = useSelector((state) => state.accountPrefs.isDark);
  const styles = { ...commonStyles, ...(isDark ? darkStyles : lightStyles) };

  const currentUserId = useSelector((state) => state.auth.currentUserId);

  const [balAmt, setBalAmt] = useState(0);
  const [moneyIn, setMoneyIn] = useState(0);
  const [moneyOut, setMoneyOut] = useState(0);


  useEffect(() => {
    console.log("Setting up nav listener");

    // Check for when we come back to this screen
    const removeListener = navigation.addListener("focus", () => {
      console.log("Running nav listener");
      getBalanceAmount();
    });

    console.log('%%%%')
    
    getBalanceAmount();

    return removeListener;
  }, []);


  async function getBalanceAmount() {
    const id = currentUserId;
    console.log(id)
    try {
      const response = await axios.get(API + API_BALANCE_AMOUNT + "/" + id, {
        headers: { Authorization: `JWT ${token}` },
      })
      console.log("getBalanceAmount");
      console.log(response.data);
      setBalAmt(response.data.totalBal);
      setMoneyIn(response.data.totalMoneyIn);
      setMoneyOut(response.data.totalMoneyOut);
    } catch (error) {
      console.log(error.response.data);
      if (error.response.data.error = "Invalid token") {
        navigation.navigate("SignInSignUp");
      }
    }
  }


  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.text, { margin: 40, color: (balAmt) < 0 ? 'firebrick' : 'mediumaquamarine' }]}>Balance: ${balAmt}</Text>
      <Text style={[styles.headerTitle, styles.text, { marginLeft: 20, marginTop: 40, textAlign:'left', fontSize:18, textDecorationLine:'underline' }]}>Breakdown:</Text>
      <Text style={[styles.headerTitle, styles.text, { margin: 20, fontSize:20 }]}>Money In: ${moneyIn}</Text>
      <Text style={[styles.headerTitle, styles.text, { marginLeft: 20, fontSize:20 }]}>Money Out: ${moneyOut}</Text>
      
    </View>
  );
}

const styles = StyleSheet.create({});
