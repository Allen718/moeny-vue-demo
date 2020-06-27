/* eslint-disable*/
const path = require('path')
module.exports = {
  lintOnSave: false,
  chainWebpack:config=>{
    const dir=path.resolve(__dirname,'src/assets/icons')
    config.module
      .rule('svg-sprite')
      .test(/\.svg$/)//只要以svg结尾的
      .include.add(dir).end()
      .use('svg-sprite-loader').loader('svg-sprite-loader').options({extract:false}).end()
      .use('svgo-loader').loader('svgo-loader')
      .tap(options=>({...options,plugins:[{removeAttrs:{attrs:'fill'}}]})).end()//删除fill属性
    config.plugin('svg-sprite').use(import('svg-sprite-loader/plugin'), [{plainSprite: true}])
    config.module.rule('svg').exclude.add(dir)
  }
}
