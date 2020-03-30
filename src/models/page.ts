/*
 * @Author: 289608944@qq.com
 * @Date: 2019-11-09 18:54:39
 * @LastEditors: 289608944@qq.com
 * @LastEditTime: 2019-11-13 11:11:48
 * @Description: In User Settings Edit
 */

export const pageReducers = {
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
    querySuccess(state, { payload }) {
      const { list, pagination } = payload
      return {
        ...state,
        list,
        pagination: {
          ...state.pagination,
          ...pagination,
        },
      }
    },
  },
}

export const pageState = {
  state: {
    list: [],
    pagination: {
      current: 1,
      total: 0,
      totalPage: 0,
      pageSize: 10,
    },
  },
}
