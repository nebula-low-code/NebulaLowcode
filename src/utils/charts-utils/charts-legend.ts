export function legend(legendAlign: string) {
  let legend: any
  switch (legendAlign) {
    case 'top':
      legend = {
        orient: 'horizontal',
        right: 'center',
        top: 0
      }
      break
    case 'left':
      legend = {
        orient: 'vertical',
        left: 0,
        top: 'center'
      }
      break
    case 'right':
      legend = {
        orient: 'vertical',
        right: 0,
        top: 'center'
      }
      break
    case 'bottom':
      legend = {
        orient: 'horizontal',
        right: 'center',
        bottom: 0
      }
      break
    case 'none':
      legend = undefined
      break
  }
  if (legend) {
    legend['type'] = 'scroll'
  }
  return legend
}
