import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import AlertService from "../service/alert";

export async function ZeroNav(props) {
    props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: 'Splash' },
        ]
      })
    );
  }
  export async function logout() {
    await AsyncStorage.removeItem("User")
  }
  export const handleSignOut = async (props) => {
    AlertService.confirm("Are you sure you want to Logout?").then(async (res) => {
      if (res) {
        await logout()
        await ZeroNav(props)
      }
    })
  }