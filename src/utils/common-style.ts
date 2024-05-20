import { max, isEmpty } from 'lodash'

const commonstyleConfig = (config: any) => {
  if (!config) {
    return ''
  }

  let styleStr = ''
  if (config.borderRadius) {
    styleStr += `border-radius:${config.borderRadius}px;`
  }

  if (config.borderTopLeftRadius) {
    styleStr += `border-top-left-radius:${config.borderTopLeftRadius}px;`
  }

  if (config.borderTopRightRadius) {
    styleStr += `border-top-right-radius:${config.borderTopRightRadius}px;`
  }

  if (config.borderBottomLeftRadius) {
    styleStr += `border-bottom-left-radius:${config.borderBottomLeftRadius}px;`
  }

  if (config.borderBottomRightRadius) {
    styleStr += `border-bottom-right-radius:${config.borderBottomRightRadius}px;`
  }

  if (config.isShowShadow) {
    styleStr += `box-shadow:${config.shadow};`
  }

  if (config.backgroundColor) {
    styleStr += `background-color:${config.backgroundColor};`
  }

  if (config.textAlign) {
    styleStr += `text-align:${config.textAlign};`
  }

  if (config.displayHide) {
    styleStr += `display:${config.displayHide == true ? 'none' : 'block'};`
  }

  if (config.borderStyle) {
    // if (config.borderStyle.leftSize) {
    styleStr += `border-left-width:${config.borderStyle.leftSize}px;`
    // }
    if (config.borderStyle.leftDirveColor) {
      styleStr += `border-left-color:${config.borderStyle.leftDirveColor};`
    }
    if (config.borderStyle.leftDirveType) {
      styleStr += `border-left-style:${config.borderStyle.leftDirveType};`
    }

    // if (config.borderStyle.topSize) {
    styleStr += `border-top-width:${config.borderStyle.topSize}px;`
    // }
    if (config.borderStyle.topDirveColor) {
      styleStr += `border-top-color:${config.borderStyle.topDirveColor};`
    }
    if (config.borderStyle.topDirveType) {
      styleStr += `border-top-style:${config.borderStyle.topDirveType};`
    }

    // if (config.borderStyle.rightSize) {
    styleStr += `border-right-width:${config.borderStyle.rightSize}px;`
    // }
    if (config.borderStyle.rightDirveColor) {
      styleStr += `border-right-color:${config.borderStyle.rightDirveColor};`
    }
    if (config.borderStyle.rightDirveType) {
      styleStr += `border-right-style:${config.borderStyle.rightDirveType};`
    }

    // if (config.borderStyle.bottomSize) {
    styleStr += `border-bottom-width:${config.borderStyle.bottomSize}px;`
    // }
    if (config.borderStyle.bottomDirveColor) {
      styleStr += `border-bottom-color:${config.borderStyle.bottomDirveColor};`
    }
    if (config.borderStyle.bottomDirveType) {
      styleStr += `border-bottom-style:${config.borderStyle.bottomDirveType};`
    }
  }

  if (config.leftPaddingDistance) {
    styleStr += `padding-left:${config.leftPaddingDistance}px;`
  }

  if (config.topPaddingDistance) {
    styleStr += `padding-top:${config.topPaddingDistance}px;`
  }

  if (config.rightPaddingDistance) {
    styleStr += `padding-right:${config.rightPaddingDistance}px;`
  }

  if (config.bottomPaddingDistance) {
    styleStr += `padding-bottom:${config.bottomPaddingDistance}px;`
  }

  if (config.leftSpaceDistance) {
    styleStr += `margin-left:${config.leftSpaceDistance}px;`
  }

  if (config.topSpaceDistance) {
    styleStr += `margin-top:${config.topSpaceDistance}px;`
  }

  if (config.rightSpaceDistance) {
    styleStr += `margin-right:${config.rightSpaceDistance}px;`
  }

  if (config.bottomSpaceDistance) {
    styleStr += `margin-bottom:${config.bottomSpaceDistance}px;`
  }

  return styleStr
}

const textStyleConfig = (config: any) => {
  if (!config) {
    return ''
  }

  let textStyle = ''
  if (config.textColor) {
    textStyle += `color:${config.textColor};`
  }

  if (config.textBgColor) {
    textStyle += `background-color:${config.textBgColor};`
  }

  if (config.textHtmlBlod) {
    textStyle += `font-weight:${config.textHtmlBlod};`
  }

  if (config.textHtmlPosit) {
    textStyle += `text-align:${config.textHtmlPosit};`
  }

  if (config.textHtmlSize) {
    textStyle += `font-size:${config.textHtmlSize}px;`
  }

  if (config.textHtmlUnder) {
    textStyle += `text-decoration:underline;`
  }

  if (config.textHtmlTilt) {
    textStyle += `font-style:${config.textHtmlTilt};`
  }

  if (config.lineHeight) {
    let lineHeiht = max([config.textHtmlSize * 1.6, config.lineHeight])
    textStyle += `line-height:${lineHeiht}px;`
  }

  return textStyle
}

const pageStyleConfig = (config: any) => {
  if (!config) {
    return ''
  }

  let pageStyle = ''
  if (config.backgroundColor) {
    pageStyle += `background-color:${config.backgroundColor};`
  }

  if (config.leftPaddingDistance) {
    pageStyle += `padding-left:${config.leftPaddingDistance}px;`
  }

  if (config.topPaddingDistance) {
    pageStyle += `padding-top:${config.topPaddingDistance}px;`
  }

  if (config.rightPaddingDistance) {
    pageStyle += `padding-right:${config.rightPaddingDistance}px;`
  }

  if (config.bottomPaddingDistance) {
    pageStyle += `padding-bottom:${config.bottomPaddingDistance}px;`
  }
  return pageStyle
}

const bgImageStyleConfig = (config: any) => {
  if (!config) {
    return ''
  }

  let bgImageStyle = ''
  if (config.backgroundImage) {
    bgImageStyle += `background-image:url(${config.backgroundImage});`
  }

  if (!isEmpty(config.backgroundPosition)) {
    bgImageStyle += `background-position:${config.backgroundPosition};`
  }

  if (!isEmpty(config.backgroundRepeat)) {
    bgImageStyle += `background-repeat:${config.backgroundRepeat};`
  } else {
    bgImageStyle += `background-repeat:no-repeat;`
  }

  if (!isEmpty(config.backgroundSize)) {
    bgImageStyle += `background-size: ${config.backgroundSize};`
  } else {
    bgImageStyle += `background-size: cover;`
  }

  if (config.backgroundColor) {
    bgImageStyle += `background-color:${hexToRgba(config.backgroundColor, config.backgroundOpacity / 100)};`
  }
  return bgImageStyle
}

function hexToRgba(hex: string, opacity: number, output = 'string') {
  if (!opacity) {
    opacity = 1
  }
  let red = parseInt('0x' + hex.slice(1, 3))
  let green = parseInt('0x' + hex.slice(3, 5))
  let blue = parseInt('0x' + hex.slice(5, 7))
  if (output === 'string') {
    return `rgba(${red},${green},${blue},${opacity})`
  } else {
    return {
      red,
      green,
      blue,
      alpha: opacity * 255
    }
  }
}

export { commonstyleConfig, textStyleConfig, pageStyleConfig, bgImageStyleConfig, hexToRgba }
