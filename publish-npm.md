# install microbundle

`npm i -D microbundle`

# change package.json

```json
{
  "source": "src/index.ts",
  "main": "dist/index.js",
  "module": "dist/index.module.js",
  "types": "dist/index.d.ts",
  "unpkg": "dist/index.umd.js",
  "scripts": {
    "build": "microbundle",
    "dev": "microbundle watch",
    "typedoc": "typedoc src/index.ts"
  }
}
```

source: 源代码入口
main: 默认的模块入口

# build

`npm run build`

生成 dist 目录及文件

`index.d.ts move to dist`

dist/src/index.d.ts => dist/index.d.ts

# 本地使用

`npm link osp-bas-sdk`
node_modules 目录下 导入 "osp-bas-sdk"

# generate docs

`npm run typedoc`
生成 docs 目录及文件

# publish

src 文件夹可以不发布

```
dist 文件夹
package.json
README.md
```

`npm publish`
