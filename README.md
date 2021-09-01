# JSON UI


## 简介

JSON UI 是一套用 JSON 描述 UI 的解决方案。设计这套解决方案的目的是：

* 提供一个平台无关、框架无关的静态 UI 描述标准。
* 一套代码，多端渲染。
* 支持多种布局方式，告别绝对布局，轻松设计界面。
* 为不同的 UI 设计语言和工具提供一个中间层转换工具，便于相互转换。

目前版本是 v0.0.2。


## 快速开始

比如在一个 300 x 300 的黑色画布中间，绘制一个 100 x 100 的红色矩形：

```json
{
    "_type": "root",
    "width": 300,
    "height": 300,
    "color": "#000",
    "_children": [
        {
            "_type": "rect",
            "x": 100,
            "y": 100,
            "width": 100,
            "height": 100,
            "color": "#f00"
        }
    ]
}
```


## 规范

在这里可以查看[标准规范](docs/std.md)


## 使用

转成 SVG 代码。

```js
import { StdUI } from '@yunser/ui-std/svg'

console.log(StdUI.toSvg({
    root: {
        "_type": "root",
        "width": 300,
        "height": 300,
        "color": "#fff",
        "_children": [
            {
                "_type": "rect",
                "x": 100,
                "y": 100,
                "width": 100,
                "height": 100,
                "color": "#f00"
            }
        ]
    }
}))
```
