const { override, fixBabelImports , addLessLoader,addWebpackAlias,addDecoratorsLegacy} = require('customize-cra');
const { resolve } = require("path");

module.exports = override(
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,
    }),
    addLessLoader({
      javascriptEnabled: true,
      modifyVars: { '@primary-color': '#e9c10f' },
    }),
    addWebpackAlias({
			"@": resolve(__dirname, "src")
    }),
    addDecoratorsLegacy()
  );