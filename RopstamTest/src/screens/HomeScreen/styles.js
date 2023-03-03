import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { palette } from '../../assets/config/colors'
import { HP, WP } from '../../assets/config/screen-ratio'
import { mvs } from '../../assets/config/screenMvs'
import { GlobalStyles } from '../../global/globalStyles'

export const HomeStyles = StyleSheet.create({
    carContainer: {
        ...GlobalStyles?.card, paddingVertical: mvs(15), ...GlobalStyles?.shadow, marginTop: mvs(15)
    },
    carColor:{
        position:'absolute',top:mvs(5),right:mvs(5),
        width:mvs(15),height:mvs(15),borderRadius:mvs(8)
    },
    dropdown: {
        width: '80%',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 0,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
      },
      dropdownItem: {
        justifyContent: 'flex-start',
      },
      dropdownLabel: {
        fontSize: 16,
        color: '#333',
      },
      dropdownPlaceholder: {
        fontSize: 16,
        color: '#9b9b9b',
      },
      editBtn:{
        // width:mvs(120),
        backgroundColor:'transparent',
      },
      editTxt:{
        ...GlobalStyles?.mediumTxt,color:palette?.blackGray
      }
}
)