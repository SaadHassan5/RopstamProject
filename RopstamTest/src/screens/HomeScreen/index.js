import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import { HP, WP } from '../../assets/config/screen-ratio';
import { GlobalStyles } from '../../global/globalStyles';
import { HomeStyles as styles } from './styles';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Input } from '../../components/Input/Input';
import { mvs } from '../../assets/config/screenMvs';
import { CustomBtn1 } from '../../components/CustomButton/CustomBtn1';
import { API_Calls } from '../../auth/ApiCalls';
import { ApiConsts } from '../../auth/Api_Consts';
import { AppFormField } from '../../components/AppFormField/AppFormField';
import { handleSignOut, ZeroNav } from '../../assets/basic-funs/basicFuns';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/Header/Header';
import DropDownPicker from 'react-native-dropdown-picker';
import { palette } from '../../assets/config/colors';
import fontFamily from '../../assets/config/fontFamily';
import { CONSTANTS } from '../../assets/config/constants';
import AddCarModal from '../../components/Modals/AddCarModal/AddCarModal';
import AlertService from '../../assets/service/alert';

export default function HomeScreen(props) {
  const { currentUser } = useSelector((state) => state.user);
  const [selectedValue, setSelectedValue] = useState(null);
  const [OpenDrop, setOpenDrop] = useState(false);
  const [mod, setMod] = useState(false);
  const [items, setItems] = useState(CONSTANTS?.car_Color);
  const [editItem, setEditItem] = useState({});
  
  const [showCars, setShowCars] = useState([])
  const [cars, setCars] = useState([])
  useEffect(() => {
    getUser()
    getCars()
  }, [])
  async function getUser() {
    console.log('Currenst===>', currentUser);
  }
  async function getCars() {
    const res = await API_Calls.For_GET(ApiConsts.cars);
    console.log('====>', res);
    setCars(res)
    console.log('SELC',selectedValue);

    if(selectedValue==null)
    setShowCars(res)
    else{
    await onFilterColor(selectedValue,res)}
  }
  async function onDelete(item){
    AlertService.confirm('Are You Sure?').then(async(r)=>{
      if(r){
        await API_Calls.Delete(`${ApiConsts.cars}/${item?.id}`)
        getCars()
      }
    })
  }
  const carRender = ({ item, index }) => {
    return (
      <View style={{ ...styles?.carContainer }}>
        <View style={{ ...GlobalStyles?.row,alignItems:'flex-start', justifyContent: 'space-between' }}>
          <View>
            <Text style={{ ...GlobalStyles?.boldTxt }}>{item?.make}</Text>
            <Text style={{ ...GlobalStyles?.mediumTxt, paddingTop: mvs(15) }}>{item?.year}</Text>
          </View>
          <View>
            <Text style={{ ...GlobalStyles?.semiTxt }}>{item?.model}</Text>
            <Text style={{ ...GlobalStyles?.mediumTxt, paddingTop: mvs(15) }}>{item?.reg_no}</Text>
          </View>
        </View>
        <View style={{...GlobalStyles.row,justifyContent:'space-between',marginTop:mvs(10)}}>
          <CustomBtn1 onPress={()=>{setEditItem(item);setMod(true)}} txtStyle={styles.editTxt} style={styles.editBtn} txt={'Edit'}/>
          <CustomBtn1 onPress={()=>{onDelete(item)}} txtStyle={{...styles.editTxt,color:'red'}} style={styles.editBtn} txt={'Delete'}/>
        </View>
        <View style={{...styles.carColor,backgroundColor:item?.color?.toLowerCase()}}>
        </View>
      </View>
    )
  }
  async function onFilterColor(col='all',allCars=cars){
    if(col=='None'){
      setShowCars(allCars);
      return
    }
    let temp=allCars?.filter(k=> k?.color?.toLowerCase()==col?.toLowerCase())
    console.log('==>FIL',temp);
    setShowCars(temp)
  }
  return (
    <SafeAreaView style={GlobalStyles?.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: mvs(200) }}>
          {/*Custom Header*/}
          <Header title={'Dashboard'} goBack={false} rightOptionTxt={'Logout'} rightOptionPress={()=>{handleSignOut(props)}} leftTxt={'New Car'} leftPress={()=>{setEditItem({});setMod(true)}} />
        <View>
          <FlatList
            numColumns={1}
            data={showCars}
            style={{ paddingTop:mvs(100) }}
            keyExtractor={(item, index) => index}
            renderItem={carRender}
          />
          {/*Using absolute position for Drop down so its items dont get overlapped*/}
          <View style={{position:'absolute',top:mvs(20), alignSelf: 'center'}}>
            <DropDownPicker
              open={OpenDrop}
              setOpen={setOpenDrop}
              value={selectedValue}
              items={items}
              setValue={setSelectedValue}
              setItems={setItems}
              dropDownDirection={'BOTTOM'}
              // onChangeValue={(val) => { console.log('valueeeeeee', val); onDropDownCity(val) }}
              style={{ borderColor: palette?.livreur, borderWidth: 2, height: HP(8), zIndex: -5, width: mvs(200) }}
              placeholder={"Color"}
              placeholderStyle={{ color: palette?.labelGray }}
              textStyle={{ color: palette?.livreur, fontFamily: fontFamily?.semi_bold }}
              dropDownContainerStyle={{
                backgroundColor: palette?.white, borderColor: palette.livreur, borderWidth: 2
              }}
              containerStyle={{ paddingTop: 10, backgroundColor: palette?.white, }}
              childrenContainerStyle={{
                height: 1030,
                color: 'red'
              }}
              onChangeValue={(item)=>{onFilterColor(item)}}
              // showArrowIcon={false}
            />
          </View>
        </View>
      </ScrollView>
          {/* A Modal For Update/New Car */}
      {mod &&
      <AddCarModal getCars={getCars} editItem={editItem} setMod={setMod} onPress={()=>{setMod(false)}} mod={mod}/>
      }
    </SafeAreaView>
  );
}