import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { HP } from '../../assets/config/screen-ratio';
import { GlobalStyles } from '../../global/globalStyles';
import { RegisterStyles as styles } from './styles';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Input } from '../../components/Input/Input';
import { mvs } from '../../assets/config/screenMvs';
import { CustomBtn1 } from '../../components/CustomButton/CustomBtn1';
import { API_Calls } from '../../auth/ApiCalls';
import { ApiConsts } from '../../auth/Api_Consts';
import { AppFormField } from '../../components/AppFormField/AppFormField';
import { ZeroNav } from '../../assets/basic-funs/basicFuns';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const validationSchema = yup.object().shape({
  email: yup.string().email().required('Email is required'),
  password: yup.string()?.min(5).required('Password is required'),
  first_Name: yup.string().min(4)?.required('First Name is required'),
  last_Name: yup.string().min(4)?.required('First Name  is required'),
});

export default function RegisterScreen(props) {
  const [loginError, setLoginError] = useState(null);

  const handleLogin = async (values) => {
    console.log('====>', values);
    let userObj = {
      email: values?.email,
      password: values?.password,
      first_Name: values?.first_Name,
      last_Name: values?.last_Name,
    }
    const res = await API_Calls.For_POST(ApiConsts.users, userObj)
    if (res) {
      await AsyncStorage.setItem('User', JSON?.stringify(userObj))
      ZeroNav(props)
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        // ref={scrollRef}
        extraScrollHeight={mvs(4)}
        keyboardShouldPersistTaps="handled" behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        contentContainerStyle={styles.container}>
        <Text style={styles.title}>REGISTER</Text>
        <Formik
          initialValues={{ email: '', password: '', first_Name: '', last_Name: '' }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <AppFormField value={values?.first_Name} placeTxt="First Name" onChangeText={handleChange('first_Name')} errors={errors?.first_Name} touched={touched?.first_Name} onBlur={handleBlur('first_Name')} />
              <AppFormField value={values?.last_Name} placeTxt="Last Name" onChangeText={handleChange('last_Name')} errors={errors?.last_Name} touched={touched?.last_Name} onBlur={handleBlur('last_Name')} />
              <AppFormField value={values?.email} placeTxt="Email" onChangeText={handleChange('email')} errors={errors?.email} touched={touched?.email} onBlur={handleBlur('email')} />
              <AppFormField secureText value={values?.password} placeTxt="Password" onChangeText={handleChange('password')} errors={errors?.password} touched={touched?.password} onBlur={handleBlur('password')} />

              {loginError && <Text style={styles.errorText}>{loginError}</Text>}

              <CustomBtn1 onPress={handleSubmit} txt={'Register'} style={styles.button} />
            </>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}