/*
 * @Author: 289608944@qq.com
 * @Date: 2019-11-18 18:58:58
 * @LastEditors: 289608944@qq.com
 * @LastEditTime: 2020-03-30 11:17:09
 * @Description: In User Settings Edit
 */
import RequestUtils from './request'
import TipsUtils from './tips'
import Storage from './store'
import debounce from './debounce'
import { ACCESS_TOKEN, TIMER } from '../config/index';

export {
  RequestUtils,
  TipsUtils,
  Storage,
}

Array.prototype.remove = function(val) {
  const index = this.indexOf(val)
  if (index > -1) {
    this.splice(index, 1)
  }
}

export const cloneDeep = (obj, newObj)=> {
  var newObj = newObj || {};
  for (let key in obj) {
      if (typeof obj[key] == 'object') {
          newObj[key] = (obj[key].constructor === Array) ? [] : {}
          cloneDeep(obj[key], newObj[key]);
      } else {
          newObj[key] = obj[key]
      }
  }
  return newObj;
}

export const getAccessToken = (): string => {
  return Storage.get(ACCESS_TOKEN)
}

export const __debounce = (func) => {
  return debounce(func,TIMER,{leading:true})
}

export const trimAll = (str) => str.replace(/[ ]/g,"")

export const escape2Html = str => {
  var arrEntities = { lt: '<', gt: '>', nbsp: ' ', amp: '&', quot: '"' }
  return str.replace(/&(lt|gt|nbsp|amp|quot);/gi, function(all, t) {
    return arrEntities[t]
  })
}
//价格保留两位小数
export const priceToFixed = (price) => {
  if(price){
    price = typeof price === 'number'?price.toString():price
    price = ~price.indexOf('-')?price:Number(price).toFixed(2)
  }else{
    price = '0.00'
  }
  return price
}

export const getPageCount = (pagination: any,total:number)=>{
  // const { pagination } = this.state
  let size = total%pagination.pageSize
  let totalPage = Math.floor(total/pagination.pageSize)
  totalPage = size>0?(totalPage+1):totalPage
  return totalPage
}