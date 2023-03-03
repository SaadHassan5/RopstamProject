import React, { useEffect, useState, useCallback } from 'react';
import { ReactNativeModal } from 'react-native-modal';
import { ActivityIndicator, ImageBackground, Platform, SafeAreaView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View, Image, ScrollView, KeyboardAvoidingView } from 'react-native';
import fontFamily from '../../../assets/config/fontFamily';
import { mvs } from '../../../assets/config/screenMvs';
import { Input } from '../../Input/Input';
import { CustomBtn1 } from '../../CustomButton/CustomBtn1';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AlertService from '../../../assets/service/alert';
import { API_Calls } from '../../../auth/ApiCalls';
import { ApiConsts } from '../../../auth/Api_Consts';

const AddCarModal = ({ mod, onPress, setMod, editItem, getCars }) => {
    const [make, setMake] = useState(editItem?.make ? editItem?.make : '')
    const [model, setModel] = useState(editItem?.model ? editItem?.model : '')
    const [year, setYear] = useState(editItem?.year ? editItem?.year + '' : '')
    const [reg, setReg] = useState(editItem?.reg_no ? editItem?.reg_no : '')
    const [color, setColor] = useState(editItem?.color ? editItem?.color : '')

    async function onSave() {
        {/* A Check to Validate that User All Data*/ }
        if (make?.trim() == "" || model?.trim() == "" || year?.trim() == "" || reg?.trim() == "" || color?.trim() == "") {
            AlertService?.show('Enter Required Data!!')
            return
        }
        AlertService?.confirm(('Are You Sure')).then(async (c) => {
            if (c) {
                let obj = {
                    make: make,
                    model: model,
                    reg_no: reg,
                    year: parseInt(year),
                    color: color,
                }
                if (editItem?.id)
                    await API_Calls.Update(`${ApiConsts.cars}/${editItem?.id}`, obj)
                else
                    await API_Calls.For_POSTServer(ApiConsts.cars, obj)
                setMod(false)
                getCars()
            }
        })
    }
    return (
        <ReactNativeModal isVisible={mod} style={{ margin: 0 }} onBackButtonPress={onPress} onBackdropPress={onPress}>
            <View style={{ paddingHorizontal: mvs(15), paddingTop: mvs(20), height: mvs(700), width: mvs(400), backgroundColor: "#fff", alignSelf: 'center', borderRadius: mvs(10) }}>
                {/* KeyboardAwareScrollView to Avoid keyboard */}

                <KeyboardAwareScrollView
                style={{flexGrow:1}}
                    extraScrollHeight={mvs(4)}
                    keyboardShouldPersistTaps="handled" behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
                    contentContainerStyle={{justifyContent:"center",paddingTop:mvs(120)}}>
                        <Input value={make} onChange={(e) => { setMake(e) }} styles={Styles.inp} placeTxt={'Make'} />
                        <Input value={model} onChange={(e) => { setModel(e) }} styles={Styles.inp} placeTxt={'Model'} />
                        <Input keyboardType='number-pad' value={year} onChange={(e) => { setYear(e) }} styles={Styles.inp} placeTxt={'Year'} />
                        <Input value={reg} onChange={(e) => { setReg(e) }} styles={Styles.inp} placeTxt={'Reg No'} />
                        <Input value={color} onChange={(e) => { setColor(e) }} styles={Styles.inp} placeTxt={'Color'} />
                    <CustomBtn1 onPress={onSave} txt={'Save'} style={Styles.btn} />
                </KeyboardAwareScrollView>
            </View>
        </ReactNativeModal>
    )
}
export default AddCarModal;
const Styles = StyleSheet.create({
    inp: {
        marginTop: mvs(20)
    },
    btn: {
        width: mvs(200), alignSelf: 'center', marginTop: mvs(40)
    }
})