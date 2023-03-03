import React from 'react'
import { Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import { palette } from '../../assets/config/colors';
import fontFamily from '../../assets/config/fontFamily';
import { HP, WP, } from '../../assets/config/screen-ratio';
import { mvs } from '../../assets/config/screenMvs';
import { GlobalStyles } from '../../global/globalStyles';


const styles = StyleSheet.create({
  input: {
    height: 48,
    width: mvs(350),
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 16,
    fontFamily:fontFamily?.bold
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
      ...GlobalStyles?.mediumTxt,
    color: 'red',
    marginBottom: 8,
  },
})
export const AppFormField = ({ onChangeText,onBlur,value,placeTxt,touched,errors,secureText=false}) => {
  return (
    <View>
      <TextInput
        placeholder={placeTxt}
        placeholderTextColor="#999"
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
        secureTextEntry={secureText}
        style={[styles.input, touched && errors && styles.inputError]}
      />
      {/* <Input placeTxt="Email" styles={[styles.input, touched.email && errors.email && styles.inputError]} onChange={handleChange('email')} onBlur={handleBlur('email')} value={values.email}/> */}
      {touched && errors && (
        <Text style={styles.errorText}>{errors}</Text>
      )}
    </View>
  )
}
