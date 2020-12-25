var data = [
  {
    "id": "关卡1",
    "parentId": "关卡1",
    "type": "group"
  },
  {
    "parentId": "关卡1",
    "id": "图层1",
    "type": "layer",
    "visible": true,
    "opacity": 1,
    "blendingMode": "normal",
    "name": "图层1",
    "left": 349,
    "right": 438,
    "top": 681,
    "bottom": 768,
    "height": 87,
    "width": 89,
    "mask": {},
    "image": {}
  },
  {
    "parentId": "图层1",
    "id": "aaaaa",
  },
  {
    "parentId": "活动规则",
    "id": "活动规则",
    "type": "layer",
    "visible": true,
    "opacity": 1,
    "blendingMode": "normal",
    "name": "活动规则",
    "left": 0,
    "right": 161,
    "top": 67,
    "bottom": 125,
    "height": 58,
    "width": 161,
    "mask": {},
    "image": {}
  }
]
function toTree(data) {
  data.forEach(function (item) {
    delete item.children
  })

  // 将数据存储为 以 id 为 KEY 的 map 索引数据列
  var map = {}
  data.forEach(function (item) {
    map[item.id] = item
  })
  console.log(map)
  var val = []
  data.forEach(function (item) {
    if (item.id === item.parentId) {
      val.push(item)
    } else {
      var parent = map[item.parentId]
      if (parent) {
        (parent.children || (parent.children = [])).push(item)
      }
    }

  })
  return val
}


function convert(list) {
  const ret = []
  let map = list.reduce((res, v) => {
    res[v.id] = v
    return res
  }, {})

  for (let item of list) {
    if (item.parentId in map) {
      const parent = map[item.parentId]
      parent.children = parent.children || []
      parent.children.push(item)
    } else {
      ret.push(item)
      continue
    }
  }
  return ret
}
console.log(toTree(data))
