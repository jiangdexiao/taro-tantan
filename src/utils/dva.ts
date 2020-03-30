/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-12 11:07:52
 * @LastEditTime: 2019-11-25 17:06:12
 * @LastEditors: 289608944@qq.com
 */
import { create } from 'dva-core'
import { createLogger } from 'redux-logger'
import createLoading from 'dva-loading'

let app
let store
let dispatch
let registered

function createApp(options?: any) {
  const { models } = options

  if (process.env.NODE_ENV === 'development') {
    // options.onAction = [createLogger()]
  }
  app = create({
    ...options
  })
  app.use(createLoading({}))

  if (!registered) {models.forEach((model) => app.model(model))}
  registered = true
  app.start()

  store = app._store
  app.getStore = () => store

  dispatch = store.dispatch

  app.dispatch = dispatch
  return app
}

export default {
  createApp,
  getDispatch() {
    return app.dispatch
  }
}