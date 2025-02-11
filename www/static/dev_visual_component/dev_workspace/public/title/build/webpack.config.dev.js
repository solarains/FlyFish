
/**
 * @description webpack开发配置
 */
const baseConf = require('../../../webpack.config.base');
const path = require('path');
const _ = require('lodash');

module.exports = _.defaultsDeep({
    // 用于生成源代码的mapping
    devtool: '#source-map',
    mode: 'development',
    entry:{
        "title/main":"./src/main.js",
        "title/setting":"./src/setting.js",
    },
    output: {
        // 编译的目录
        path: path.resolve(__dirname, '../') + '/components/',
    },
}, baseConf);

