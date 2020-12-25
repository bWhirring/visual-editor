import { layerNameToPinyin, isNotNullObject } from './'
let f = 75

export class Generator {
  private container: string = ''
  private html: string = ''
  private css: string = ''
  private flag = false

  /**
   * 初始化CSS
   */
  init({ width, height, f = 75 }) {
    this.css += `
  * {
    margin: 0;
    padding: 0;
  }

  body {
    width: ${width / f}rem;
    height: ${height / f}rem;
  }
`
    this.flag = true
  }

  /**
   * render内容
   * @param {*} children
   * @returns
   * @memberof Generator
   */
  renderContainer(children) {
    let { name, type, text } = children
    let huhu = this.buildCSS(children)

    if (!name || type === 'group') return ''
    let className = layerNameToPinyin(name)

    if (isNotNullObject(text)) {
      let { value, font: { sizes, color } } = text
      return `<div className='${className}' style='${huhu}'>${value}</div>`
    }

    return `<img className='${className}' data-name='${className}' style='${huhu}' src='https://yun.dui88.com/taobaomini/psd/test/${name}.png' />`
  }

  /**
   * 创建css
   * @param {*} child
   * @returns
   * @memberof Generator
   */
  buildCSS(child) {
    let cssContent = ''
    let { left, top, width, height, name, type, text } = child
    let { flag } = this
    if (!flag) this.init({ width, height })
    let zIndex
    if (name === 'bgm') zIndex = 1
    if (type === 'group' || name === 'Backgro') return ''
    name = layerNameToPinyin(name)
    cssContent += `
      width: ${width / f}rem;
      height: ${height / f}rem;
      top: ${top / f}rem;
      left: ${left / f}rem;
      position: absolute;
      z-index: ${zIndex || 100};
   `
    if (isNotNullObject(text)) {
      let { value, font: { sizes, color } } = text
      cssContent += `
        fontSize: ${Math.ceil(sizes / 2)}px;
      `
    }

    // cssContent += `}

    // `
    return cssContent
  }

  buildHTML(children, name = '') {
    if (name) {
      name = layerNameToPinyin(name)
      this.container += `<div className='${name}'> `
    }
    children && children.forEach(child => {
      let { name } = child
      if (child.children && Array.isArray(child.children)) {
        this.buildHTML(child.children, child.name)
      }

      this.container += this.renderContainer(child)

    })
    if (name) this.container += `< /div>`
  }

  getHTML() {
    return this.container
    //     let html = `<!DOCTYPE html>
    // <html lang="en">
    // <head>
    //   <meta charset="UTF-8">
    //    <meta name="viewport"content="width=device-width,user-scalable=no,initial-scale=1.0,  maximum-scale=1.0,minimum-scale=1.0">
    //   <title>Document</title>
    //   <script src="https://yun.dui88.com/taobaomini/psd/index.js"></script>
    //   <style>
    //   ${this.css}
    //   img { width: 100%; }
    //   </style>
    // </head>
    // <body>
    //   ${this.container}
    // </body>
    // </html>`
    //     return html
  }

}


// function render()
