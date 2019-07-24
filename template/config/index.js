'use strict'
// Template version: {{ template_version }}
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
const chalk = require('chalk')

const buildConfig = () => {
  const { DEPLOY_ENV, NODE_ENV } = process.env;
  if (NODE_ENV !== 'production') return {};
  const maps = {
    dev: {
      notes: '开发环境',
      assetsPublicPath: '/',
    },
    test108: {
      notes: '测试服务器108',
      assetsPublicPath: '/',
    },
    test109: {
      notes: '测试服务器109',
      assetsPublicPath: '/',
    },
    staging: {
      notes: '预上线环境',
      assetsPublicPath: '/',
    },
    release: {
      notes: '正式环境',
      assetsPublicPath: '/',
    },
  };
  const res = maps[DEPLOY_ENV] ? maps[DEPLOY_ENV] : {};
  const { notes, ...others } = res;
  if(DEPLOY_ENV === undefined) {
    console.log(chalk.green(`【提示】: 可以布署到任意域名根目录下`));
    console.log(chalk.green(`【提示】: {assetsPublicPath: '/'}`));
  } else {
    console.log(chalk.green(`【发布分支为】: ${DEPLOY_ENV}分支`));
    console.log(chalk.green(`【布署环境为】: ${notes}`));
    console.log(chalk.green(`【build】: ${JSON.stringify(others)}`));
  }
  console.log(chalk.yellow(`【注意】检查projectName.conf中PRONAME是否与其他项目冲突`))
  return others;
};

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    {{#lint}}// Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,
    {{/lint}}

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    // assetsPublicPath不需配置
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

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
    bundleAnalyzerReport: process.env.npm_config_report,
    ...buildConfig()
  }
}
