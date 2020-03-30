/*
 * @Author: 289608944@qq.com
 * @Date: 2019-11-11 16:42:35
 * @LastEditors: 289608944@qq.com
 * @LastEditTime: 2020-03-30 11:06:55
 * @Description: In User Settings Edit
 */
/**
 * 状态码
 */
export enum ERROR_CODE{
  /**
   * 未登录
   */
  NOT_LOGIN = 'B003',
  /**
   * token失效
   */
  ACCESS_TOKEN_INVALID = 'B000',
  /**
   * 无效的微信授权
   */
  WECHAT_GRANT_INVALID = 10002,

  /**
   * 微信登录code过期
   */
  WECHAT_CODE_EXPIRE = 10003,
}