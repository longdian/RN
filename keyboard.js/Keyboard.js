//  调用直接 state:{
    // getKeyBoardHeight: 0
// }
//  <KeyboardComponent getKeyBoardHeight={this.getKeyBoardHeight}/>

import React, {Component} from 'react';
import {
    Platform,
    Dimensions,
    Keyboard,
    View
} from 'react-native';
let { height } = Dimensions.get('window')
import Toast from 'react-native-root-toast';//导入组件

export default class KeyboardComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // 初始状态
            keyboardHeight: 0
        }
    }
    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
    }

    _keyboardDidShow(e){
        this.setState({
            keyboardHeight:Platform.OS === "ios" ? e.startCoordinates.height : e.endCoordinates.height
        }, () => {
            this.props.getKeyBoardHeight(this.state.keyboardHeight)
        })
        
    }

    _keyboardDidHide(e){
        this.setState({
            keyboardHeight:0
        })
    }

    render() {
        return (
            <View></View>
        )
    }
}
