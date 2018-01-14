
'use strict'
// Template version: 1.1.3
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: process.env.PORT || 9000,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/search': {
        target: 'http://localhost:8080/unusedgoods/goods_search',//接口域名
        changeOrigin: true,//是否跨域ev
        pathRewrite: {
          '^/search': ''    //需要rewrite重写
        }
       },
       '/logIn': {
        target: 'http://localhost:8080/unusedgoods/login_userIn',//接口域名
        changeOrigin: true,//是否跨域ev
        pathRewrite: {
          '^/logIn': ''    //需要rewrite重写
        }
       },
       '/add_user_recode': {
        target: 'http://localhost:8080/unusedgoods/user_registered',//接口域名
        changeOrigin: true,//是否跨域ev
        pathRewrite: {
          '^/add_user_recode': ''    //需要rewrite重写
        }
       },
       '/add_user': {
        target: 'http://localhost:8080/unusedgoods/user_add',//接口域名
        changeOrigin: true,//是否跨域ev
        pathRewrite: {
          '^/add_user_recode': ''    //需要rewrite重写
        }
       },
       '/user_feedback': {
        target: 'http://localhost:8080/unusedgoods/suggestion_submit',//接口域名
        changeOrigin: true,//是否跨域ev
        pathRewrite: {
          '^/user_feedback': ''    //需要rewrite重写
        }
       },
       '/unusedgoods/user_detail': {
        target: 'http://localhost:8080/unusedgoods/user_userDetail',//接口域名
        changeOrigin: true,//是否跨域ev
        pathRewrite: {
          '^/unusedgoods/user_detail': ''    //需要rewrite重写
        }
       },
       '/unusedgoods/logIn_account_proving_new': {
        target: 'http://localhost:8080/unusedgoods/user_registered',//接口域名
        changeOrigin: true,//是否跨域ev
        pathRewrite: {
          '^/unusedgoods/logIn_account_proving_new': ''    //需要rewrite重写
        }
       },
       '/unusedgoods/logIn_account_proving_code': {
        target: 'http://localhost:8080/unusedgoods/user_retrievePassword',//接口域名
        changeOrigin: true,//是否跨域ev
        pathRewrite: {
          '^/unusedgoods/logIn_account_proving_code': ''    //需要rewrite重写
        }
       },
       '/unusedgoods/logIn__new': {
        target: 'http://localhost:8080/unusedgoods/user_add',//接口域名
        changeOrigin: true,//是否跨域ev
        pathRewrite: {
          '^/unusedgoods/logIn__new': ''    //需要rewrite重写
        }
       },
       '/unusedgoods/logIn_code': {
        target: 'http://localhost:8080/unusedgoods/user_add',//接口域名
        changeOrigin: true,//是否跨域ev
        pathRewrite: {
          '^/unusedgoods/logIn_code': ''    //需要rewrite重写
        }
       },
       '/unusedgoods/add_userdlg': {
        target: 'http://localhost:8080/unusedgoods/user_addDialog',//接口域名
        changeOrigin: true,//是否跨域ev
        pathRewrite: {
          '^/unusedgoods/add_userdlg': ''    //需要rewrite重写
        }
       },
       '/unusedgoods/add_save': {
        target: 'http://localhost:8080/unusedgoods/user_collection',//接口域名
        changeOrigin: true,//是否跨域ev
        pathRewrite: {
          '^/unusedgoods/add_save': ''    //需要rewrite重写
        }
       },
       '/unusedgoods/account_proving': {
        target: 'http://localhost:8080/unusedgoods/user_verification',//接口域名
        changeOrigin: true,//是否跨域ev
        pathRewrite: {
          '^/unusedgoods/account_proving': ''    //需要rewrite重写
        }
       }
       ,
       '/unusedgoods/out': {
        target: 'http://localhost:8080/unusedgoods/login_out',//接口域名
        changeOrigin: true,//是否跨域ev
        pathRewrite: {
          '^/unusedgoods/out': ''    //需要rewrite重写
        }
       },
       '/unusedgoods/user_onsell_goods': {
        target: 'http://localhost:8080/unusedgoods/goods_ownPostList',//接口域名
        changeOrigin: true,//是否跨域ev
        pathRewrite: {
          '^/unusedgoods/user_onsell_goods': ''    //需要rewrite重写
        }
       },
       '/unusedgoods/user_upsell_goods': {
        target: 'http://localhost:8080/unusedgoods/goods_ownUnderShelfList',//接口域名
        changeOrigin: true,//是否跨域ev
        pathRewrite: {
          '^/unusedgoods/user_upsell_goods': ''    //需要rewrite重写
        }
       },
       '/unusedgoods/user_save_upsell_save': {
        target: 'http://localhost:8080/unusedgoods/goods_ownCollectUnderShelf',//接口域名
        changeOrigin: true,//是否跨域ev
        pathRewrite: {
          '^/unusedgoods/user_save_upsell_save': ''    //需要rewrite重写
        }
       },
       '/unusedgoods/user_save_onsell_save': {
        target: 'http://localhost:8080/unusedgoods/goods_ownCollect',//接口域名
        changeOrigin: true,//是否跨域ev
        pathRewrite: {
          '^/unusedgoods/user_save_onsell_save': ''    //需要rewrite重写
        }
       },
       '/unusedgoods/user_message': {
        target: 'http://localhost:8080/unusedgoods/user_listDialog',//接口域名
        changeOrigin: true,//是否跨域ev
        pathRewrite: {
          '^/unusedgoods/user_message': ''    //需要rewrite重写
        }
       },
       '/unusedgoods/user_goods_up': {
        target: 'http://localhost:8080/unusedgoods/goods_underShelfGoods',//接口域名
        changeOrigin: true,//是否跨域ev
        pathRewrite: {
          '^/unusedgoods/user_goods_up': ''    //需要rewrite重写终点
        }
       },
       '/unusedgoods/user_goods_delete': {
        target: 'http://localhost:8080/unusedgoods/goods_deleteUnderShelfGoods',//接口域名
        changeOrigin: true,//是否跨域ev
        pathRewrite: {
          '^/unusedgoods/user_goods_delete': ''    //需要rewrite重写
        }
       },
       '/unusedgoods/user_save_delete': {
        target: 'http://localhost:8080/unusedgoods/goods_cancleCollection',//接口域名
        changeOrigin: true,//是否跨域ev
        pathRewrite: {
          '^/unusedgoods/user_save_delete': ''    //需要rewrite重写
        }
       },
       '/unusedgoods/user_islogin': {
        target: 'http://localhost:8080/unusedgoods/login_currentInfo',//接口域名
        changeOrigin: true,//是否跨域ev
        pathRewrite: {
          '^/unusedgoods/user_islogin': ''    //需要rewrite重写
        }
       }
      },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
