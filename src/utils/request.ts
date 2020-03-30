/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-12 11:17:59
 * @LastEditTime: 2019-12-12 10:26:24
 * @LastEditors: 289608944@qq.com
 */
import Taro from '@tarojs/taro'
import pathToRegexp from 'path-to-regexp';
import { ACCESS_TOKEN } from '@/config';
import { ERROR_CODE } from '@/config/code'
import { Storage,TipsUtils,cloneDeep } from '@/utils/'

declare type Methods = 'GET' | 'OPTIONS' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT';
declare type Headers = { [key: string]: string };
interface Options {
  url: string;
  method?: Methods;
  host?: string;
  data?: object;
  header?: Headers;
  /**
   * 是否显示loading
   */
  loading?: {title:string,duration?:number};
  /**
   * 是否需要附加token
   */
  isPatchToken?: boolean;
  /**
   * 请求参数 querystring
   */
  params?: object;
  callback?: (...arg: any)=>{};
}

export default class Request {
  // 导出的api对象
  static apiLists: { [key: string]: () => any; } = {}
  // token
  static token: string = ''

  static conbineOptions(opts, reqOpt: Options): Options {
    let { url } = opts
    reqOpt = reqOpt||{}
    const { data,isPatchToken = true,callback,params,loading={title:'加载中'} } = reqOpt
    const cloneData = cloneDeep(data||{});
    try {
      let domain = '';
      const urlMatch = url.match(/[a-zA-z]+:\/\/[^/]*/);
      if (urlMatch) {
        ;[domain] = urlMatch;
        url = url.slice(domain.length);
      }
  
      const match = pathToRegexp.parse(url);
      url = pathToRegexp.compile(url)(data);
 
      for (const item of match) {
        if (item instanceof Object && item.name in cloneData) {
          delete cloneData[item.name];
        }
      }
      url = domain + url;
    } catch (e) {
      console.log(e)
    }
    let query = ''
    if(params && params instanceof Object){
      Object.keys(params).forEach(key=> {
        query += `${key}=${params[key]}&`
      })
      url += `?${query}`
    }
    return {
      loading,
      isPatchToken,
      data: {...cloneData },
      method: opts.method || reqOpt.method || 'GET',
      url: `${url}`,
      header:Object.assign({},reqOpt.header,{'originType':'2'}),
      callback
    }
  }
  /**
   * 
   * @static request请求 基于 Taro.request
   * @param {Options} opts 
   */
  static async request(opts: Options) {
    const { loading,isPatchToken,callback,...rest } = opts
    let options = rest
    //需要校验token
    const token = Storage.get(ACCESS_TOKEN)
    if(isPatchToken){
      // token不存在
      if (!token) { 
        await Taro.navigateTo({ url:'/packageA/pages/login/index' }) 
        return {}
      }
      options = Object.assign(rest, {header:{...rest.header,'token': token}})
    }
    let isConnected = Storage.get('isConnected')
    if( !isConnected ){
      //如果是手动清除了缓存 再次获取判断有无网络
      const net = await Taro.getNetworkType()
      Storage.set('isConnected',net.networkType != 'none')
      if(net.networkType === 'none'){
        TipsUtils.toast('啊哦~网络错误～')
        return {}
      }
    }
    
    loading && TipsUtils.showLoading(loading.title)
    
    //  Taro.request 请求
    const res = await Taro.request(options)
    const data = res.data
    if(data && (data.code === ERROR_CODE.NOT_LOGIN 
      || data.code === ERROR_CODE.WECHAT_GRANT_INVALID
      || data.code === ERROR_CODE.WECHAT_CODE_EXPIRE )   ){
      //未登录
      loading && TipsUtils.hideLoading()
      //判断是否已经在登录页面 否则再跳转登录页面
      if(!~opts.url.indexOf('login')){
        await Taro.reLaunch({
          url:'/packageA/pages/login/index'
        }) 
      }
      return {...data,success:false}
    }
    else if(data && data.code === ERROR_CODE.ACCESS_TOKEN_INVALID) { 
      // token失效 把该请求加入队列 等待刷新token后重新调用
      if(callback){
        Storage.globalData.promiseQueue.push(callback)
      }
      //请求刷新token
      const isFreshed = await Storage.globalData.globalApp.dispatch({
        type:'account/refleshToken'
      })
      //刷新token完毕 重新执行队列请求事件
      if(isFreshed){
        const { promiseQueue } = Storage.globalData
        let promiseItem = promiseQueue.shift() //出队
        while(promiseItem && Storage.globalData.exeQueueCount< 3){ //限制重新执行三次 防止陷入死循环
          Storage.globalData.exeQueueCount +=1
          await promiseItem()
          promiseItem = promiseQueue.shift() 
        }
      }
    }
    loading && TipsUtils.hideLoading()
    if (data) { return data }

    // 请求错误
    const d = { ...data, err: (data && data.msg) || '网络错误～' }
    TipsUtils.toast(d.err);
    throw new Error(d.err)
  }

  static creatRequests(opts:object){
    return async (data: Options) => {
      const _opts = this.conbineOptions(opts, data)
      let res
      try {
        res = await this.request(_opts)
      } catch (error) {
        await TipsUtils.hideLoading()
        TipsUtils.toast('啊哦~网络错误～')
        console.log(error.errMsg)
      }
      return res
    }
  }
}


