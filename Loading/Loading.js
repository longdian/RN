/**
 * Created by guangqiang on 2017/12/12. 
    import { Loading } from '../../utils/Loading'
    Loading.show()
    Loading.hidden()
 */
import React, {Component} from 'react'
import {View, StyleSheet, ActivityIndicator, Dimensions} from 'react-native'
import RootSiblings from 'react-native-root-siblings'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
import { scaleSize, setSpText } from '../utils/util'

let sibling = undefined

const Loading = {

  show: () => {
    sibling = new RootSiblings(
      <View style={styles.maskStyle}>
        <View style={styles.backViewStyle}>
          <ActivityIndicator size="large" color="white"/>
        </View>
      </View>
    )
  },

  hidden: ()=> {
    if (sibling instanceof RootSiblings) {
      sibling.destroy()
    }
  }

}

const styles = StyleSheet.create({
    maskStyle: {
      position: 'absolute',
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      width: width,
      height: height,
      alignItems: 'center',
      justifyContent: 'center'
    },
    backViewStyle: {
      backgroundColor: 'rgba(0,0,0,0.5)',
      width: scaleSize(220),
      height: scaleSize(220),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: scaleSize(5),
    }
  }
)

export {Loading}