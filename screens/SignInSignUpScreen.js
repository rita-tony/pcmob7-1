
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, UIManager, ActivityIndicator, Keyboard, LayoutAnimation, Platform } from 'react-native';
import { API, API_LOGIN, API_SIGNUP, API_WHOAMI } from '../constants/API';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { logInAction } from "../redux/ducks/TransactionAuth";
import { commonStyles } from "../styles/commonStyles";

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
} //Needs to be manually enabled for android

export default function SignInSignUpScreen({ navigation }) {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorText, setErrorText] = useState('')
  const [isLogIn, setIsLogIn] = useState(true)

  const dispatch = useDispatch();

  async function login() {
    console.log("---- Login time ----");
    Keyboard.dismiss();

    try {
      setLoading(true);
      const response = await axios.post(API + API_LOGIN, {
        username,
        password,
      });
      console.log("Success logging in!");
      //console.log(response);
      //console.log(response.data.access_token);
      dispatch({ ...logInAction(), payload: response.data.access_token });

      setLoading(false);
      setUsername("");
      setPassword("");
      navigation.navigate("Logged In");

    } catch (error) {
      setLoading(false);
      console.log("Error logging in!");
      console.log(error);
      setErrorText(error.response.data.description);
      if (error.response.status = 404) {
        setErrorText("User does not exist")
      }
    }
  }

  async function signUp() {
    if (password != confirmPassword) {
      setErrorText("Your passwords don't match. Check and try again.")
    } else {
      try {
        setLoading(true);
        const response = await axios.post(API + API_SIGNUP, {
          username,
          password,
        });

        //console.log(response);

        if (response.data.Error) {
          // We have an error message for if the user already exists
          setErrorText(response.data.Error);
          setLoading(false);
        } else {
          console.log("Success signing up!");
          setLoading(false);
          login();
        }
      } catch (error) {
        setLoading(false);
        console.log("Error logging in!");
        console.log(error.response);
        setErrorText(error.response.data.description);
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isLogIn ? "Log In" : "Sign Up"}
      </Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Username:"
          placeholderTextColor="#003f5c"
          maxLength={30}
          value={username}
          onChangeText={(username) => setUsername(username)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Password:"
          placeholderTextColor="#003f5c"
          maxLength={30}
          secureTextEntry={true}
          value={password}
          onChangeText={(pw) => setPassword(pw)}
        />
      </View>

      {isLogIn ? <View /> :
        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder="Confirm Password:"
            placeholderTextColor="#003f5c"
            maxLength={30}
            secureTextEntry={true}
            onChangeText={(pw) => setConfirmPassword(pw)}
          />
        </View>}

      <View />
      <View>
        <View style={{ flexDirection: "row", justifyContent:'center' }}>
          <TouchableOpacity style={commonStyles.button} onPress={isLogIn ? login : signUp}>
            <Text style={commonStyles.buttonText}> {isLogIn ? "Log In" : "Sign Up"} </Text>
          </TouchableOpacity>
          {loading ? <ActivityIndicator style={{ marginLeft: 10 }} /> : <View />}
        </View>
      </View>
      <Text style={styles.errorText}>
        {errorText}
      </Text>

      <TouchableOpacity
        onPress={() => {
          LayoutAnimation.configureNext({
            duration: 700,
            create: { type: 'linear', property: 'opacity' },
            update: { type: 'spring', springDamping: 0.4 }
          });

          setIsLogIn(!isLogIn);
          setErrorText("");
        }}>
        <Text style={styles.switchText}> {isLogIn ? "No account? Sign up now." : "Already have an account? Log in here."}</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'seashell',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 40,
    margin: 20
  },
  switchText: {
    fontWeight: '400',
    fontSize: 20,
    marginTop: 20
  },
  inputView: {
    backgroundColor: "wheat",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  textInput: {
    height: 50,
    flex: 1,
    padding: 10,
  },
  errorText: {
    fontSize: 15,
    color: 'red',
    marginTop: 20
  }
});
