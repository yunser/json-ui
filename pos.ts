import * as fs from 'fs'

const obj = {
    "diagram": {
        "elements": {
            "elements": {
                "17bae78cefe76": {
                    "parent": "",
                    "link": "",
                    "shapeStyle": {
                        "alpha": 1
                    },
                    "textBlock": [
                        {
                            "position": {
                                "w": "w-20",
                                "x": 10,
                                "h": "h",
                                "y": 0
                            },
                            "text": "矩形"
                        }
                    ],
                    "anchors": [
                        {
                            "x": "w/2",
                            "y": "0"
                        },
                        {
                            "x": "w/2",
                            "y": "h"
                        },
                        {
                            "x": "0",
                            "y": "h/2"
                        },
                        {
                            "x": "w",
                            "y": "h/2"
                        }
                    ],
                    "title": "矩形",
                    "props": {
                        "zindex": 1,
                        "w": 169,
                        "x": 107,
                        "h": 68,
                        "y": 108,
                        "angle": 0
                    },
                    "path": [
                        {
                            "actions": [
                                {
                                    "x": "0",
                                    "action": "move",
                                    "y": "0"
                                },
                                {
                                    "x": "w",
                                    "action": "line",
                                    "y": "0"
                                },
                                {
                                    "x": "w",
                                    "action": "line",
                                    "y": "h"
                                },
                                {
                                    "x": "0",
                                    "action": "line",
                                    "y": "h"
                                },
                                {
                                    "action": "close"
                                }
                            ]
                        }
                    ],
                    "lineStyle": {},
                    "children": [],
                    "resizeDir": [
                        "tl",
                        "tr",
                        "br",
                        "bl"
                    ],
                    "name": "rectangle",
                    "fillStyle": {},
                    "theme": {},
                    "id": "17bae78cefe76",
                    "attribute": {
                        "container": false,
                        "rotatable": true,
                        "visible": true,
                        "collapsable": false,
                        "collapsed": false,
                        "linkable": true,
                        "markerOffset": 5
                    },
                    "category": "basic",
                    "locked": false,
                    "group": ""
                }
            },
            "page": {
                "padding": 20,
                "backgroundColor": "transparent",
                "orientation": "portrait",
                "gridSize": 15,
                "width": 1487,
                "showGrid": true,
                "lineJumps": false,
                "height": 684
            }
        }
    },
    "meta": {
        "diagramInfo": {
            "title": "未命名文件",
            "category": "flow"
        },
        "id": "6132cea2e0b34d35500338d3",
        "type": "ProcessOn Schema File",
        "version": "1.0"
    }
}

fs.writeFileSync('out.pos', JSON.stringify(obj, null, 4), 'utf8')
