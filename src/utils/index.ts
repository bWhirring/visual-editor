import pinyin from 'pinyin'

export function layerNameToPinyin(name) {
  return pinyin(name, {
    style: pinyin.STYLE_TONE2
  }).join('_')
}

export function isNotNullObject(obj): boolean {
  for (let i in obj) {
    if (obj[i]) return true
  }
  return false
}

export function toTree(data) {
  data.forEach(function (item) {
    delete item.children
  })

  var map = {}
  data.forEach(function (item) {
    map[item.id] = item
  })
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


