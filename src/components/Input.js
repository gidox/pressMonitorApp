import React from 'react';
import { Text, View, TextInput } from 'react-native';

const styless = StyleSheet.create({
  input: {


  }
})

const Input = ({
    styles, onChangeText
}) => (
  <TextInput 
    style={[styles, styless.input]}
    onChangeText={onChangeText}
    underlineColorAndroid={'transparent'}
  />
);

export default Input;
