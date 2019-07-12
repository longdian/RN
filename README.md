## 介绍
# 要求的依赖提添加 react-native  react

> 1、utils 文件  根据设备的分辨率设置像素
> 2、需要调用的组件 直接 import 过来 eg:
import MyTextInput from '../components/MyTextInput'

> 3、
    <MyTextInput
        secureTextEntry={false}  // 是否遮挡输入的文字 一般用于password
        clear={this.clear} // 调用清楚文字的方法
        maxLength={6} //限制长度
        placeholderText='请输入手机验证码' 
        onChangeText={(text) => {
            .. textchange 改变的时候操作
    }} />

>4 、 温馨提示 如果想使用点击textInput之外的位置 关闭键盘 请将最外层的父元素包裹TouchableOpacity 组件
> 头部 var dismissKeyboard = require('dismissKeyboard');   TouchableOpacity点击事件中添加 dismissKeyboard() 即可