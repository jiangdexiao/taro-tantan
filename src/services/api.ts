/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-12 11:15:08
 * @LastEditTime: 2020-03-30 13:55:33
 * @LastEditors: 289608944@qq.com
 */
import { isDev,DEV_HOST,MAIN_HOST,COMMON_HOST } from '../config'

const host = isDev?DEV_HOST:MAIN_HOST
/**
 * 请求映射文件
 */
export const requestConfig = {
  //登录
  login: `POST ${host}/login`,
  //登出
  loginOut: `POST ${host}/loginOut`,
  //刷新token
  refleshToken: `POST ${host}/fleshtoken`,
  //图片数据
  getImageList: `GET ${host}/images`

}
export const uploadUrl = `${COMMON_HOST}/common/uploadImage`

