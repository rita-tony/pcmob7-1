import React, { useState, useEffect } from "react";
import { ActivityIndicator, Text, View, Switch, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from "react-native";
import { commonStyles, lightStyles, darkStyles } from "../styles/commonStyles";
import { useSelector, useDispatch } from "react-redux";
import { changeModeAction, clearFields } from "../redux/ducks/accountPref";
import { logOutAction } from "../redux/ducks/TransactionAuth";

import axios from "axios";
import { API, API_USER } from "../constants/API";


export default function AccountScreen({ navigation }) {
  const token = useSelector((state) => state.auth.token);
  const currUserId = useSelector((state) => state.auth.currentUserId);
  const currUserName = useSelector((state) => state.auth.currentUserName);
  const isDark = useSelector((state) => state.accountPrefs.isDark);
  const dispatch = useDispatch();

  const styles = { ...commonStyles, ...(isDark ? darkStyles : lightStyles) };


  async function updateUserProfile(id, bDarkMode) {
    const user = {
      isDark: !bDarkMode
    };

    console.log("Updating userid" + id + " .isDark: " + isDark);
    try {
      const response = await axios.put(API + API_USER + `/${id}`, user, {
        headers: { Authorization: `JWT ${token}` },
      })
      console.log("Is Dark Mode: " + response.data.isDark);
    } catch (error) {
      console.log(error)
    }
  }

  function signOut() {
    console.log("signing out now");
    dispatch(clearFields());
    dispatch(logOutAction());
    navigation.navigate("SignInSignUp");
  }

  function switchMode() {
    dispatch(changeModeAction());
    const response = updateUserProfile(currUserId, isDark);
  }

  return (
    <View style={[styles.container, { alignItems: "center" }]}>
      <Text style={[styles.title, styles.text, { marginTop: 30 }]}>
        {" "}
        Hello {currUserName} !
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          margin: 20,
        }}
      >
        <Text style={[styles.content, styles.text]}> Dark Mode? </Text>
        <Switch value={isDark} onChange={switchMode} />
      </View>
      <TouchableOpacity style={[styles.button]} onPress={signOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}
