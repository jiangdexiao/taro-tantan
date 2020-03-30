/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-09 13:55:30
 * @LastEditTime: 2020-03-30 11:34:35
 * @LastEditors: 289608944@qq.com
 */

const path = require('path')
const config = {
  projectName: 'taro-trip',
  date: '2019-8-9',
  designWidth: 750,
  deviceRatio: {
    '640': 2.34 / 2,
    '750': 1,
    '828': 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: {
    babel: {
      sourceMap: true,
      presets: [
        ['env', {
          modules: false
        }]
      ],
      plugins: [
        'transform-decorators-legacy',
        'transform-class-properties',
        'transform-object-rest-spread'
      ]
    },
    uglify: {
      enable: true,
      config: {
        
      }
    }
  },
  defineConstants: {
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  alias: {
    '@/components': path.resolve(__dirname, '..', 'src/components'),
    '@/utils': path.resolve(__dirname, '..', 'src/utils'),
    '@/assets': path.resolve(__dirname, '..', 'src/assets'),
    '@/services': path.resolve(__dirname, '..', 'src/services'),
    '@/models': path.resolve(__dirname, '..', 'src/models'),
    '@/config': path.resolve(__dirname, '..', 'src/config'),
    '@/interface': path.resolve(__dirname, '..', 'src/interface'),
  },
  weapp: {
    compile: {
      exclude: [
      ],
      compressTemplate: true
    },
    module: {
      postcss: {
        autoprefixer: {
          enable: true,
          config: {
            browsers: [
              'last 3 versions',
              'Android >= 4.1',
              'ios >= 8'
            ]
          }
        },
        pxtransform: {
          enable: true,
          config: {

          },
          selectorBlackList: [
            /^.van-.*?$/,  // 这里是vant-weapp中className的匹配模式 配置黑名单 不转换px的文件目录
          ]
        },
        url: {
          enable: true,
          config: {
            limit: 10240 // 设定转换尺寸上限
          }
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    module: {
      postcss: {
        autoprefixer: {
          enable: true,
          config: {
            browsers: [
              'last 3 versions',
              'Android >= 4.1',
              'ios >= 8'
            ]
          }
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      }
    }
  },
  esnextModules: ['taro-ui']
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
