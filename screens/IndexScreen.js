import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, FlatList, RefreshControl } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { API, API_TRANSACTIONS, API_TRANSACTION, API_WHOAMI } from "../constants/API";
import { lightStyles, darkStyles } from "../styles/commonStyles";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUserId, setCurrentUserName } from "../redux/ducks/TransactionAuth";
import { setCurrentUserTheme } from "../redux/ducks/accountPref";


export default function IndexScreen({ navigation, route }) {

  const dispatch = useDispatch();
  const [transactions, setTransactions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const isDark = useSelector((state) => state.accountPrefs.isDark);
  const styles = isDark ? darkStyles : lightStyles;

  // This is to set up the top right button
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={addTransaction}>
          <FontAwesome
            name="plus"
            size={24}
            style={{ color: styles.headerTint, marginRight: 15 }}
          />
        </TouchableOpacity>
      ),
    });
  });

  useEffect(() => {
    console.log("Setting up nav listener");

    // Check for when we come back to this screen
    const removeListener = navigation.addListener("focus", () => {
      console.log("Running nav listener");
      getTransactions();
    });

    console.log('%%%%')
    
    getTransactions();

    return removeListener;
  }, []);

  async function getTransactions() {
    try {
      const responseWhoAmI = await axios.get(API + API_WHOAMI, {
        headers: { Authorization: `JWT ${token}` },
      });
      dispatch({ ...setCurrentUserId(), payload: responseWhoAmI.data.id });
      dispatch({ ...setCurrentUserName(), payload: responseWhoAmI.data.username });
      dispatch({ ...setCurrentUserTheme(), payload: responseWhoAmI.data.isDark });

      const response = await axios.get(API + API_TRANSACTIONS + `/${responseWhoAmI.data.id}`, {
        headers: { Authorization: `JWT ${token}` },
      });
      console.log("Get Transactions for userid: " + responseWhoAmI.data.id);
      console.log("User theme: " + responseWhoAmI.data.isDark);
      console.log(response.data);
      setTransactions(response.data);
      return "completed";
    } catch (error) {
      console.log(error.response.data);
      if (error.response.data.error = "Invalid token") {
        navigation.navigate("SignInSignUp");
      }
    }
  }

  async function onRefresh() {
    setRefreshing(true);
    const response = await getTransactions();
    setRefreshing(false);
  }

  function addTransaction() {
    navigation.navigate("Add");
  }

  async function deleteTransaction(id) {
    console.log("Deleting " + id);
    try {
      const response = await axios.delete(API + API_TRANSACTION + `/${id}`, {
        headers: { Authorization: `JWT ${token}` },
      })
      console.log(response);
      onRefresh();

    } catch (error) {
      console.log(error)
    }
  }

  
  // The function to render each row in our FlatList
  function renderItem({ item }) {
    return (
      <TouchableOpacity onPress={() => navigation.navigate("Details", {id: item.id})}>
        <View
          style={{
            padding: 10,
            paddingTop: 20,
            paddingBottom: 20,
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
          <Text style={styles.text}>{item.note} ${item.amount}</Text>
          <TouchableOpacity onPress={() => deleteTransaction(item.id)}>
            <FontAwesome name="trash" size={20} color="#a80000" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={transactions}
        renderItem={renderItem}
        style={{ width: "100%" }}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#9Bd35A", "#689F38"]}
          />
        }
      />
    </View>
  );
}

