import React from 'react'

import { layerNameToPinyin, isNotNullObject } from './'

export class ConfigJSONtoNode {
  private container: ReactNode
  private css: string = ''
  private flag = false

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
      return <div>{ value } < /div>
    }

    return <img className='${className}' data - name='${className}'src = 'https://yun.dui88.com/taobaomini/psd/test/${name}.png' />
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
      this.container += <div className='${name}' >
    }
    children && children.forEach(child => {
      let { name } = child
      if (child.children && Array.isArray(child.children)) {
        this.buildHTML(child.children, child.name)
      }

      this.container += this.renderContainer(child)

    })
    if (name) this.container += </div>
  }

  getHTML() {
    return this.container
  }

}


// function render()
