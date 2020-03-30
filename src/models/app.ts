/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-12 14:49:19
 * @LastEditTime: 2020-03-30 17:39:51
 * @LastEditors: 289608944@qq.com
 */
import { pageReducers } from './page'
import Api from '@/services';
import { Storage } from '@/utils'
const { getImageList } = Api;

export default {
  namespace: 'app',
  state: {
    global: {},
    user: Storage.get('user'),
    isConnected: true,
    networkType: '',
    imageList: []
  },
  subscriptions: {
    
  },
  effects: {
    *getImageList({payload}, { call }){
       return yield call(getImageList,{
         data: payload,
         isPatchToken: false,
         loading: false
       })
    }
  },
  reducers: {
    ...pageReducers.reducers
  },
}

