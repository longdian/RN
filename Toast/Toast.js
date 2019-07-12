// 弹窗组件
import React, {Component} from 'react';
import {
    Platform,
    Dimensions
} from 'react-native';
let { height } = Dimensions.get('window')
import Toast from 'react-native-root-toast';//导入组件

export default class ToastShow extends Component {
    static toastShort = (content) => {
        if (this.toast !== undefined) {
            Toast.hide(this.toast);
        }
        this.toast = Toast.show(content.toString(), {
            duration: Toast.durations.SHORT,
            position: Platform.OS === 'android' ? Toast.positions.CENTER : Toast.positions.CENTER,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
            textColor: '#000000',
            backgroundColor: '#ffffff'
        });
    };
    static toastLong = (content) => {
        if (this.toast !== undefined) {
            Toast.hide(this.toast);
        }
        this.toast = Toast.show(content.toString(), {
            duration: 500,
            position: Platform.OS === 'android' ? Toast.positions.CENTER : Toast.positions.CENTER,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
            textColor: '#ffffff',
            backgroundColor: '#000000'
        });
    };

    static toastShortTop = (content) => {
        if (this.toast !== undefined) {
            Toast.hide(this.toast);
        }
        this.toast = Toast.show(content.toString(), {
            duration: 500,
            position: 50,
            shadow: true,
            animation: false,
            hideOnPress: true,
            delay: 0,
            textColor: '#000000',
            backgroundColor: '#ffffff'
        });
    };

    static toastShortBottom = (content, HG) => {
        if (this.toast !== undefined) {
            Toast.hide(this.toast);
        }
        this.toast = Toast.show(content.toString(), {
            duration: 500,
            position: (height - HG - 100),
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
            textColor: '#000000',
            backgroundColor: '#ffffff'
        });
    };
}
