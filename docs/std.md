## 标准规范（v0.1.0）

坐标系：

![](./images/coord.svg)

采用绝对坐标。

图形分成基本图形和分组。基本图形是不可分割的，没有子图形。分组下可以有图形和分组。

* 基本图形
    * 矩形（rect）
    * 圆形（circle）
    * 直线（rect）
    * 文本（text）
    * 多边形（polygon）
    * 折线（polyline）
    * 椭圆（ellipse）
    * 路径（Path）
    * 图片（image）
* 分组（group）
* 样式（style）
    * 填充（color）
    * 描边（border）
    * 透明度（opacity）
    * 线性渐变（gradient）
    * 阴影（shadow）

矩形（rect）

```json
{
    "_type": "rect",
    "x": 300,
    "y": 300,
    "width": 300,
    "height": 300
}
```

圆形（circle）

```json
{
    "_type": "circle",
    "cx": 300,
    "cy": 300,
    "radius": 50
}
```

直线（rect）

```json
{
    "_type": "line",
    "x1": 0,
    "y1": 0,
    "x2": 100,
    "y2": 0
}
```

文本（text）

```json
{
    "_type": "text",
    "x": 0,
    "y": 0,
    "text": "hello",
    "textSize": 16
}
```

多边形（polygon）

```json
{
    "_type": "polygon",
    "points": [
        {
            "x": 50,
            "y": 100,
        },
        {
            "x": 0,
            "y": 200,
        },
        {
            "x": 100,
            "y": 200,
        }
    ]
}
```

折线（polyline）

```json
{
    "_type": "polyline",
    "points": [
        {
            "x": 0,
            "y": 100
        },
        {
            "x": 50,
            "y": 0
        },
        {
            "x": 100,
            "y": 100
        }
    ]
}
```

椭圆（ellipse）

```json
{
    "_type": "ellipse",
    "cx": 50,
    "cy": 250,
    "rx": 50,
    "ry": 25,
    "color": "#E56D6D",
    "border": {
        "color": "#526BFF",
        "width": 2
    }
}
```

路径（Path）

```json
{
    "_type": "path",
    "d": "M200,200.490196 L199.509804,300 C212.323108,269.060446 229.153174,253.590669 250,253.590669 C270.846826,253.590669 287.513493,268.897047 300,299.509804 L300,200 L200,200.490196 Z"
}
```

图片（image）

```json
{
    "_type": "image",
    "x": 300,
    "y": 0,
    "width": 100,
    "height": 100,
    "href": "data:image/png;base64,......"
}
```

分组（group）

```json
{
    "_type": "group",
    "_children": []
}
```

填充（color）

支持 `#ffffff` 或 `#fff` 格式的颜色表示。

```json
{
    "_type": "rect",
    ...
    "color": "#f00"
}
```

描边（border）

```json
{
    "_type": "rect",
    ...
    "border": {
        "color": "#000",
        "width": 1
    }
}
```

透明度（opacity）

值为 0 - 1。

```json
{
    "_type": "rect",
    ...
    "opacity": 0.8
}
```

线性渐变（gradient）

```json
{
    "_type": "rect",
    ...
    "fill": {
        "type": "linearGradient",
        "direction": "bottom",
        "colors": ["#09c", "#c90"]
    }
}
```


阴影（shadow）

```json
{
    "_type": "rect",
    ...
    "shadow": {
        "x": 5,
        "y": 5,
        "blur": 10,
        "spread": 10,
        "color": "#09c",
        "alpha": 0.2
    }
}
```


## 历史规范

点击查看[历史规范](./old/README.md)。
