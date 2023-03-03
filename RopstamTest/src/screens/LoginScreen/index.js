import React, { useState } from 'react';
import { Platform, SafeAreaView, Text, TouchableOpacity } from 'react-native'
import { GlobalStyles } from '../../global/globalStyles';
import { LoginStyles as styles } from './styles';
import { Formik } from 'formik';
import * as yup from 'yup';
import { CustomBtn1 } from '../../components/CustomButton/CustomBtn1';
import { API_Calls } from '../../auth/ApiCalls';
import { ApiConsts } from '../../auth/Api_Consts';
import { AppFormField } from '../../components/AppFormField/AppFormField';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ZeroNav } from '../../assets/basic-funs/basicFuns';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { mvs } from '../../assets/config/screenMvs';

const validationSchema = yup.object().shape({
    email: yup.string().email().required('Email is required'),
    password: yup.string().required('Password is required'),
});

export default function LoginScreen(props) {
    const [loginError, setLoginError] = useState(null);

    const handleLogin = async (values) => {
        console.log('====>', values);
       const res= await API_Calls.For_POST(`${ApiConsts.users}?email=:${values?.email}&password=:${values?.password}"`)
        if (res) {
            await AsyncStorage.setItem('User',JSON?.stringify(res))
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
            <Text style={styles.title}>LOGIN</Text>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleLogin}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <>
                        <AppFormField value={values?.email} placeTxt="Email" onChangeText={handleChange('email')} errors={errors?.email} touched={touched?.email} onBlur={handleBlur('email')} />
                        <AppFormField secureText value={values?.password} placeTxt="Password" onChangeText={handleChange('password')} errors={errors?.password} touched={touched?.password} onBlur={handleBlur('password')} />

                        {loginError && <Text style={styles.errorText}>{loginError}</Text>}

                        <CustomBtn1 onPress={handleSubmit} txt={'Login'} style={styles.button} />
                    </>
                )}
            </Formik>
            <TouchableOpacity onPress={() => { props?.navigation?.navigate('RegisterScreen') }} style={styles?.createView}>
                <Text style={{ ...GlobalStyles?.mediumTxt, fontSize: 15 }}>Create New Account</Text>
            </TouchableOpacity>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}

