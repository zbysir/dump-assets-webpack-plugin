// dump-assets-webpack-plugin
// dump assets of entry to a json file
class DumpAssetsPlugin {
  /*
  options: {
    filename: 'dist/access.json', // default: outputPath + "/assets.json"
  }
  */
  constructor(options) {
    options = options || {}
    this.options = {
      filename: options.filename || null,
    };
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tap("ExportAssets", (compilation) => {
      // see https://webpack.js.org/api/stats/
      let stats = compilation.getStats().toJson();

      let entrypoints = compilation.entrypoints;
      let entryNames = Array.from(entrypoints.keys());

      let files = []
      for (let i = 0; i < entryNames.length; i++) {
        const entryName = entryNames[i];
        const entryFiles = entrypoints.get(entryName).getFiles();
        files.push(...entryFiles)
      }

      function unique(arr) {
        return arr.filter(function (item, index, arr) {
          return arr.indexOf(item, 0) === index;
        });
      }

      files = unique(files)

      let assets = {
        js: [],
        css: [],
        uncase: [] // 意料之外的文件
      }

      files.forEach(f => {
        const sp = f.split('.')
        const ext = sp[sp.length - 1]
        if (assets[ext]) {
          assets[ext].push(f)
        } else {
          console.warn('uncased file ext:', f)
          assets.uncase.push(f)
        }
      })

      let filename = this.options.filename
      if (!filename) {
        filename = stats.outputPath + "/assets.json"
      }

      require("fs").writeFileSync(
        filename,
        JSON.stringify(assets)
      );
    });
  }
}

module.exports = DumpAssetsPlugin