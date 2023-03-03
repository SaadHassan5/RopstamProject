import { View, TouchableOpacity, Platform, StatusBar, SafeAreaView,Text } from "react-native";
import React from "react";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { HP,WP } from "../../assets/config/screen-ratio";
import { palette } from "../../assets/config/colors";
import fontFamily from "../../assets/config/fontFamily";

export default function Header({ goBack = true, onPress, title, titleStyle, style, logout, rightOptionTxt, rightOptionPress,white,leftTxt,leftPress,leftStyle={},rightStyle={} }) {
    return (
        <View
            style={[{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                position: 'relative',
                paddingTop: Platform.OS === "android" ? HP(3) : 0
            }, style]}
        >
            {goBack && (
                <TouchableOpacity
                    style={{
                        position: "absolute",
                        left: 0,
                        paddingHorizontal: 20,
                        paddingTop: Platform.OS === "android" ? HP(3) : 0
                    }}
                    onPress={onPress}
                >
                    {white ?
                        <></>
                        :
                        <Ionicons name="arrow-back" size={30} color={palette?.black}/>
                        // <ArrowLeft />
                    }
                </TouchableOpacity>
            )}
            {rightOptionTxt && (
                <TouchableOpacity
                    style={{
                        position: "absolute",
                        right: 0,
                        paddingHorizontal: 20,
                        paddingTop: Platform.OS === "android" ? HP(3) : 0
                    }}
                    onPress={rightOptionPress}
                >
                    <Text
                        style={{
                            fontSize: 13,
                            color: palette.black,
                            fontFamily: fontFamily.bold,
                            // textDecorationLine:"underLine",
                            ...titleStyle,
                        }}
                    >{rightOptionTxt}</Text>
                    {/* <ArrowLeft /> */}
                </TouchableOpacity>
            )}
            {leftTxt && (
                <TouchableOpacity
                    style={{
                        position: "absolute",
                        left: 0,
                        paddingHorizontal: 20,
                        paddingTop: Platform.OS === "android" ? HP(3) : 0
                    }}
                    onPress={leftPress}
                >
                    <Text
                        style={{
                            fontSize: 13,
                            color: palette.black,
                            fontFamily: fontFamily.bold,
                            // textDecorationLine:"underLine",
                            ...titleStyle,
                        }}
                    >{leftTxt}</Text>
                    {/* <ArrowLeft /> */}
                </TouchableOpacity>
            )}
            <Text
                style={{
                    fontSize: 18,
                    color: palette.black, textAlign: 'center',
                    fontFamily: fontFamily.bold, width: WP(65),
                    ...titleStyle,
                }}
            >
                {title}
            </Text>
        </View>
    );
}
