export function axisFormatter(value: any, formatter: string) {
  if (formatter && formatter.length > 0) {
    if (formatter == 'percent') {
      return toThousands(value * 100) + '%'
    } else if (formatter == 'KMB') {
      return abbreviateNumber(value)
    } else {
      return toThousands(value)
    }
  } else {
    return toThousands(value)
  }
}

//千分位
function toThousands(num: any) {
  return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
}

//将大数转为K、M、B、T
function abbreviateNumber(num: any, fixed = 0) {
  if (num === null) {
    return null
  } // terminate early
  if (num === 0) {
    return '0'
  } // terminate early
  let b = num.toPrecision(2).split('e'), // get power
    k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
    c = k < 1 ? num.toFixed(0 + fixed) : (num / Math.pow(10, k * 3)).toFixed(1), // divide by power
    d = c < 0 ? c : Math.abs(c), // enforce -0 is 0
    e = d + ['', 'K', 'M', 'B', 'T'][k] // append power
  return e
}
