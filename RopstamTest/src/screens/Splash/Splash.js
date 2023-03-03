import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../root/userServices';
const Splash = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        getUser();
    }, [])
    async function getUser() {
        const res = await AsyncStorage?.getItem('User');
        if (res != null) {
            const updatedUs = JSON?.parse(res);
            console.log('===>', updatedUs);
            dispatch(updateUser(updatedUs));
            props?.navigation?.replace('HomeScreen')
            return;
        }
        props?.navigation?.replace('LoginScreen')
    }
    return (
        <View style={{ flex: 1, backgroundColor: "#004AAD" }}>
        </View>
    )
}
export default Splash;