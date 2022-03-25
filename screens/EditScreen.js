import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import { commonStyles, lightStyles, darkStyles } from "../styles/commonStyles";
import axios from "axios";
import { API, API_TRANSACTION } from "../constants/API";
import { useSelector } from "react-redux";

export default function EditScreen({ navigation, route }) {
  const [note, setNote] = useState(route.params.note);
  const [amount, setAmount] = useState(route.params.amount);
  const token = useSelector((state) => state.auth.token);

  const isDark = useSelector((state) => state.accountPrefs.isDark);
  const styles = { ...commonStyles, ...(isDark ? darkStyles : lightStyles) };

  /*
  console.log("updating");
  console.log(route);
  console.log("id: " + route.params.id);
  console.log("title: " + title);
  console.log("content: " + content);
  */

  async function updateTransaction(id) {
    const trx = {
      note: note,
      amount: amount,
    };

    console.log("Updating " + id);
    try {
      const response = await axios.put(API + API_TRANSACTION + `/${id}`, trx, {
        headers: { Authorization: `JWT ${token}` },
      })
      console.log(response);
      navigation.navigate("Index", { transaction: trx });

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ margin: 20 }}>
        <Text style={[additionalStyles.label, styles.text]}>Enter Note:</Text>
        <TextInput
          style={additionalStyles.input}
          value={note}
          onChangeText={(text) => setNote(text)}
        />

        <Text style={[additionalStyles.label, styles.text]}>Enter Amount: $</Text>
        <TextInput
          style={additionalStyles.input}
          value={amount.toString()}
          onChangeText={(text) => setAmount(text)}
        />

        <TouchableOpacity
          style={[styles.button, { marginTop: 20 }]}
          onPress={() => updateTransaction(route.params.id)}
        >
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const additionalStyles = StyleSheet.create({
  input: {
    fontSize: 20,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 40,
    padding:10,
  },
  label: {
    fontSize: 22,
    marginBottom: 10,
    marginLeft: 5,
  },
});
