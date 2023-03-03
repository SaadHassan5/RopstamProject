import React from 'react'
import { Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import { palette } from '../../assets/config/colors';
import fontFamily from '../../assets/config/fontFamily';
import { HP,WP, } from '../../assets/config/screen-ratio';

export interface Props {
  password?: any,
  onChange?: any,
  onBlur?: any,
  value?: any,
  eye?: any,
  editable?: any,
  placeTxt?: any,
  isEmail?: any,
  keyboardType?: string,
  autoCapitalization?: string,
  onPressIn?: any;
  multi?: any;
  styles?: any;
  numLines?: any;
  numOfCharacters?: any;
  ref?:any;
}

export interface State {
  count: 0,
}

const Styles = StyleSheet.create({
  inp: {
    fontFamily: fontFamily.medium,
    fontSize: 17,
    // borderWidth: 1,
    // borderColor: '#B7C1DF',
    // borderRadius: WP(2),
    // paddingHorizontal: WP(6),
    // color:palette.black,
    // height:55,
    // width: '100%',
  },
  inpView: {
    // paddingVertical: HP(1.5),
    borderWidth: 1,
    borderColor: '#B7C1DF',
    borderRadius: WP(2),
    paddingHorizontal: WP(6),
    color: palette.black,
  }
})
export class Input extends React.Component<Props, State> {
  render() {
    return (
      <View style={{ ...Styles.inpView,...this?.props?.styles, }}>
        {this.props.password ?
          <TextInput onBlur={this?.props?.onBlur} ref={this.props.ref} autoCapitalize='none' onChangeText={this.props.onChange} secureTextEntry={this.props.eye} textContentType={'password'} placeholder={this.props.placeTxt} placeholderTextColor={'#B7C1DF'} style={{ ...Styles.inp, ...this?.props?.styles, }} />
          :
          <TextInput onBlur={this?.props?.onBlur} maxLength={this.props.numOfCharacters} ref={this.props.ref} numberOfLines={this?.props?.numLines} textAlignVertical='top'  multiline={this.props?.multi} autoCapitalize='none' keyboardType={this.props.keyboardType} onChangeText={this.props.onChange} value={this.props.value} editable={this.props.editable ? false : true} placeholder={this.props.placeTxt} placeholderTextColor={'#B7C1DF'} style={{ ...Styles.inp, letterSpacing:1 }} />
        }
      </View>
    );
  }
}
