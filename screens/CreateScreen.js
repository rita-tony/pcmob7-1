import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { lightStyles, commonStyles, darkStyles } from "../styles/commonStyles";
import axios from "axios";
import { API, API_CREATE } from "../constants/API";
import { useSelector } from "react-redux";

export default function CreateScreen({ navigation }) {
  const token = useSelector((state) => state.auth.token);
  const isDark = useSelector((state) => state.accountPrefs.isDark);
  const styles = { ...commonStyles, ...(isDark ? darkStyles : lightStyles) };

  const currentUserId = useSelector((state) => state.auth.currentUserId);

  const [note, setNote] = useState("");
  const [amount, setAmount] = useState("");

  async function saveTransaction() {
    const trx = {
      note: note,
      amount: amount,
      userid: currentUserId,
    };

    try {
      console.log("Create Transaction");
      //console.log(token);
      const response = await axios.post(API + API_CREATE, trx, {
        headers: { Authorization: `JWT ${token}` },
      });
      //console.log(response.data);
      navigation.navigate("Index", { transaction: trx });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ margin: 20 }}>
      <Text style={[additionalStyles.label, styles.text]}>User Id: {currentUserId}</Text>
        <Text style={[additionalStyles.label, styles.text]}>Enter Note:</Text>
        <TextInput
          style={additionalStyles.input}
          value={note}
          onChangeText={(text) => setNote(text)}
        />

        <Text style={[additionalStyles.label, styles.text]}>Enter Amount:</Text>
        <TextInput
          style={additionalStyles.input}
          value={amount}
          onChangeText={(text) => setAmount(text)}
        />

        <TouchableOpacity
          style={[styles.button, { margin: 20 }]}
          onPress={saveTransaction}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const additionalStyles = StyleSheet.create({
  input: {
    fontSize: 24,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 15,
  },
  label: {
    fontSize: 28,
    marginBottom: 10,
    marginLeft: 5,
  },
});