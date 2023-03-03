import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { palette } from '../../assets/config/colors'
import { HP, WP } from '../../assets/config/screen-ratio'
import { mvs } from '../../assets/config/screenMvs'
import { GlobalStyles } from '../../global/globalStyles'

export const LoginStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
      },
      title: {
        ...GlobalStyles?.boldTxt,letterSpacing:2,
        fontSize: mvs(40),
        marginBottom: 32,
      },
      input: {
        height: 48,
        width: mvs(400),
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 16,
      },
      inputError: {
        borderColor: 'red',
      },
      errorText: {
          ...GlobalStyles?.mediumTxt,
        color: 'red',
        marginBottom: 8,
      },
      button: {
        backgroundColor: 'blue',
        padding: 16,
        borderRadius: 5,
        width:mvs(300),paddingVertical:mvs(10)
      },
      buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        
      },
      createView:{
        position:'absolute',
        bottom:0,
        paddingVertical:HP(1),
      }
}
)