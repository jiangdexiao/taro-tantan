/*
 * @Author: 289608944@qq.com
 * @Date: 2019-11-18 18:58:57
 * @LastEditors: 289608944@qq.com
 * @LastEditTime: 2020-03-30 11:04:11
 * @Description: In User Settings Edit
 */
export interface IMenu {
  id: number;
  categoryName: string;
  parentId: string;
  children: Array<IMenu>;
}

export interface IUser {
  id:string;
  userName:string;
  mobile:string;
  /**
   * 微信头像
   */
  avatar:string;
}