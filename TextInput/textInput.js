import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Keyboard
} from 'react-native'
import { scaleSize, setSpText } from '../utils/util'

export default class MyTextInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: ''
        }
    }
    render() {
        let params = this.props;
        let { text } = this.state;
        return (
            <View style={{flex: 1,alignItems:'center',alignContent:'center',flexDirection:'row', justifyContent: 'space-between'}}>
                <TextInput autoCapitalize={'none'}
                    placeholder={params.placeholderText}
                    placeholderTextColor="#999999"
                    value={params.name}
                    maxLength={params.maxLength}
                    secureTextEntry={params.secureTextEntry}
                    onChangeText={(text) => {
                        this.setState({
                            text: text
                        })
                        params.onChangeText(text)
                    }}
                    style={[styles.loginText,params.isBackBlack?{color:'#999999'}:'']}></TextInput>
                    {/* icon 判断 需要的话打开 但是必须在调用的时候 传递过来 */}
                    {/* 
                        secureTextEntry： 如果true，文本输入模糊了输入的文本，以便像密码这样的敏感文本保持安全
                        iconText： eg: iconText={'\ue6a5'}
                     */}
                    {/* {
                        params.type === 'password' ? 
                        <TouchableOpacity onPress={params.clear}>
                            {text ? <Text style={styles.loginClear}>{params.secureTextEntry ? params.iconText : params.actIcon}</Text> : <Text></Text>}
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={params.clear}>
                            {text ? <Text style={styles.loginClear}>{params.iconText}</Text> : <Text></Text>}
                        </TouchableOpacity>
                    } */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loginText: {
        height: scaleSize(80),
        width: scaleSize(400),
        fontSize: setSpText(34),
        color: '#ffffff',
        fontWeight: '400',
        textAlign: 'left',
        justifyContent:'center',
        alignItems:'center',
    },
    loginClear: {
        fontSize: setSpText(38),
        color: '#5B5B5B',
        fontFamily: 'iconfont'
    }
})

MyTextInput.propTypes = {
    secureTextEntry: PropTypes.bool,
    placeholderText: PropTypes.string,
    isBackBlack:PropTypes.bool
}