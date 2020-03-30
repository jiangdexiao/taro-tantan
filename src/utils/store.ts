/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-12 14:56:47
 * @LastEditTime: 2019-11-09 18:08:13
 * @LastEditors: 289608944@qq.com
 */
import Taro from '@tarojs/taro'

export default class Storage {
  static globalData = {
    globalApp:{},
    exeQueueCount:0, //每一次执行次数累计
    isExeQueue:false, //队列是否可以执行 以保障队列只执行一次
    promiseQueue:[]  //待执行的promise队列
  }
  /**
   * 设置缓存
   */
  static set = (key: string, value: any): any => {
    Taro.setStorageSync(key, value)
  }
  /**
   * 获取缓存
   */
  static get = (key: string): any => {
    return Taro.getStorageSync(key)
  }
  /**
   * 移除缓存
   */
  static remove = (key: string) => {
    try {
      Taro.removeStorageSync(key)
    } catch (e) {
      console.log('remove storage error',e)
    }
  }
  /**
   * 清除缓存
   */
  static clear = () => {
    try {
      Taro.clearStorage()
    } catch(e) {
      console.log('clear storage error',e)
    }
  }
}
