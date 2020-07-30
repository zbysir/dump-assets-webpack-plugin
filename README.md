# dump-assets-webpack-plugin
dump assets of entry to a json file.

导出编译生成的文件名, 只包括在entry中定义的资源, 不包括异步加载的资源. 你可以利用导出的信息向index.html写入需要的资源.

## usage
```
module.exports = {
  entry: {
    index: ["@babel/polyfill", './src/index.js'],
  },
  output: {
    path: __dirname + '/dist',
    filename: 'js/[name].[chunkHash:8].js'
  }
  ...

  plugins: [
    ...
    new DumpAssetsPlugin()
  ]
}
```

将会在指定的`output.path`下写入一个文件`assets.json`, 即 'dist/assets.json', 内容像下面这样:

```
{
  "js": [
    "js/manifest.f8898276.js",
    "js/vendor.e6beb115.js",
    "js/common.86a59f40.js",
    "js/index.0ec79a2c.js",
  ],
  "css": [
    "css/index.0ec79a2c.css",
  ]
}
```

它只包含了在entry中定义的资源, 而不包括异步加载的资源.

## config

```
new DumpAssetsPlugin({
  filename: './dist/assets.json'
})
```

|key|description|default|note|
|---|---|---|---|
|filename|指定输出到哪一个文件, 如 './dist/assets.json'|`outputPath + "/assets.json"`|文件如果不存在则会自动创建, 但需要文件夹必须存在.|
