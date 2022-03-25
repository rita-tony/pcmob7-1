import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { commonStyles, lightStyles, darkStyles } from "../styles/commonStyles";
import axios from "axios";
import { API, API_TRANSACTION } from "../constants/API";
import { useSelector } from "react-redux";

export default function ShowScreen({ navigation, route }) {
  const [transaction, setTransaction] = useState({ note: "", amount: "" });
  const isDark = useSelector((state) => state.accountPrefs.isDark);
  const styles = { ...commonStyles, ...(isDark ? darkStyles : lightStyles) };

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={editTransaction} style={{ marginRight: 10 }}>
          <FontAwesome name="pencil-square-o" size={30} color={styles.headerTint} />
        </TouchableOpacity>
      ),
    });
  });

  useEffect(() => {
    //console.log(route.params.transaction)
    getTransaction();
  }, [])

  async function getTransaction() {
    const id = route.params.id
    console.log(id)
    try {
      const response = await axios.get(API + API_TRANSACTION + "/" + id, {
        headers: { Authorization: `JWT ${token}` },
      })
      console.log(response.data);
      setTransaction(response.data);
    } catch (error) {
      console.log(error.response.data);
      if (error.response.data.error = "Invalid token") {
        navigation.navigate("SignInSignUp");
      }
    }
  }

  function editTransaction() {
    navigation.navigate("Edit", transaction);
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.content, styles.text, { margin: 20 }]}>id: {transaction.id}</Text>
      <Text style={[styles.title, styles.text, { margin: 40 }]}>{transaction.note}</Text>
      <Text style={[styles.content, styles.text, { margin: 20 }]}>{transaction.amount}</Text>
    </View>
  );
}
