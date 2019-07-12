
import {
  Dimensions,
  PixelRatio,
  Platform
} from 'react-native';

export const deviceWidth = Dimensions.get('window').width;      //设备的宽度
export const deviceHeight = Dimensions.get('window').height;    //设备的高度
let fontScale = PixelRatio.getFontScale();                      //返回字体大小缩放比例

let pixelRatio = PixelRatio.get();      //当前设备的像素密度
let screenPxW = PixelRatio.getPixelSizeForLayoutSize(deviceWidth);
let screenPxH = PixelRatio.getPixelSizeForLayoutSize(deviceHeight);

const defaultPixel = 2;                           //iphone6的像素密度
//px转换成dp
const w2 = Math.round(750 / defaultPixel);
const h2 = Math.round(1334 / defaultPixel);
const scale = Math.min(deviceHeight / h2, deviceWidth / w2);   //获取缩放比例
/**
* 设置text为sp
* @param size sp
* @returns number dp
*/
export function setSpText(size:Number) {
    var scaleWidth = deviceWidth / 750;
    var scaleHeight = deviceHeight / 1334;
    var scale = Math.min(scaleWidth, scaleHeight);
    size = Math.round(size * scale/fontScale + 0.5);
    return size;
}

/**
 *
 * @param size 元素的大小 类型为数值类型
 * @returns number dp
 */
export const scaleSize = function(size) {
    if(size == 750){
        return deviceWidth
    }
  size = Math.round(size * scale + 0.5) / defaultPixel;
  return size;
}
export function scaleSizeW(size) {
    var scaleWidth = size * screenPxW / 750;
    size = Math.round((scaleWidth/pixelRatio + 0.5));
    return size;
}
export function scaleSizeH(size) {
    var scaleHeight = size * screenPxH / 1334;
    size = Math.round((scaleHeight / pixelRatio + 0.5));
    return size;
}

const X_WIDTH = 375;
const X_HEIGHT = 812;

function isIphoneX() {
  return (
    Platform.OS === 'ios' &&
    ((deviceWidth === X_WIDTH && deviceHeight === X_HEIGHT) || (deviceHeight === X_WIDTH && deviceWidth === X_HEIGHT))
  )
}

export function ifIphoneX(iphoneXStyle, regularStyle) {
  if (isIphoneX()) {
    return iphoneXStyle;
  } else {
    return regularStyle;
  }
}

/**
 *
 * @param time 需要转换的日期 类型为字符串
 * @returns ms 传入时间的时间戳
 */
export function time2Date(time) {
  if (!time) {
    return time
  }
  let date = time.split(' ');
  let y = date[0];
  let t = date[1];
  let nowYear = parseInt(y.split('-')[0]);
  let nowMonth = parseInt(y.split('-')[1]);
  let nowDay = parseInt(y.split('-')[2]);
  let nowHour = parseInt(t.split(':')[0]);
  let nowMinute = parseInt(t.split(':')[1]);
  let nowSecond = parseInt(t.split(':')[2]);
  let myDate = new Date(nowYear, nowMonth - 1, nowDay, nowHour, nowMinute, nowSecond);
  let ms = myDate.getTime()
  return ms;
}

/**
 * @param format 时间的格式
 * @param time 需要格式化的时间戳
 * @returns format  当前格式化时间
 */
export function getFormatDate( format, time ) {
  let date = '';
  if (!time) {
    date = new Date()
  } else {
    date = new Date(time)
  }
  let args = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
    "q+": Math.floor((date.getMonth() + 3) / 3),  //quarter
    "S": date.getMilliseconds()
  };
  if (/(y+)/.test(format))
  format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var i in args) {
    var n = args[i];
    if (new RegExp("(" + i + ")").test(format))
    format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
  }
  return format;
}

/**
 * 创建action
 * @param type 传入的指示动作
 * @param obj  传入的需要改变的数据对象
 * @return obj 返回创建的动作
 */
export function actionCreator(type, obj) {
  obj = obj || {};
  obj.type = type;
  return obj;
}

/**
 * 上传图片
 * @param callback 上传成功后的回调函数
 */
export function uploadImag(callback) {
  const options = {
    quality:0.2,
    title: '选择图片',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '从相册选择',
    mediaType: 'photo',
    storageOptions: {
      skipBackup: true
    },
    permissionDenied: {
      title: '没有权限',
      text: '可以用你的相机拍照并从你的库中选择图片。',
      reTryTitle: '重试',
      okTitle: '确认'
    }
  };
  ImagePicker.showImagePicker(options, (response) => {
    if (response.didCancel) {
      return
    } else if (response.error) {
      Toast.message('上传图片失败')
    } else {
      if (!response.fileName) {
        let str = response.uri.toString();
        let last = str.lastIndexOf('/') + 1;
        response.fileName = str.substr(last, str.length)
      }
      let source = { uri: response.uri, type: 'multipart/form-data', name: response.fileName };
      let params = {
        image: source,
        imageFileName: 'images'
      }
      Api.upload(params).then(res => {
        if (res.success) {
          if (typeof callback === 'function') {
            res.fileName = response.fileName;
            typeof callback === 'function' && callback(res)
          }
        } else {
          Toast.message('上传图片失败')
        }
      })
    }
  });
}

export function uploadFile(callback) {
  DocumentPicker.show({
    filetype: [DocumentPickerUtil.allFiles()],
  }, (error, res) => {
    if (error) {
      Toast.message('上传文件失败')
    } else {
      let source = { uri: res.uri, type: 'multipart/form-data', name: res.fileName };
      let params = {
        image: source,
        imageFileName: 'images'
      }
      Api.uploadFile(params).then(res => {
        if (res.success) {
          if (typeof callback === 'function') {
            callback(res)
          }
        } else {
          Toast.message('上传图片失败')
        }
      })
    }
  })
}

function array_remove_repeat(a) { // 去重
  var r = [];
  for (var i = 0; i < a.length; i++) {
    var flag = true;
    var temp = a[i];
    for (var j = 0; j < r.length; j++) {
      if (temp === r[j]) {
        flag = false;
        break;
      }
    }
    if (flag) {
      r.push(temp);
    }
  }
  return r;
}

export function union(a, b) {
  return array_remove_repeat(a.concat(b));
}


export default {
  setSpText,
  scaleSize
}


