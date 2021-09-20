颜色封装

（目前仅支持前端，NodeJs，近期会支持小程序和 SVG），可以根据业务选择不同的渲染方式

* HTML
* SVG

* json
* sketch
* web canvas
* three.js
* webgl




目前版本是 v0.0.1。

## 安装

<p>install。</p>





xml2json.js
XML 格式转换成 JSON 格式
没解决：属性数据类型（number）
XML 无类型，不太好用

json2svg.js
JSON 格式转换成 SVG 格式



"type": "module",



## 使用

```html
<canvas id="canvas"></canvas>
```

```
import { StdCanvas } from 'std-ui/web'

const canvas = document.getElementById('canvas')
new StdCanvas(canvas, {
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
})
```

线性渐变 - 从上到下