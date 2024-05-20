import numeral from 'numeral'
import f from 'lodash/fp'

const formatTypeListGenerator = f.compose(
  f.map((key) => ({ name: formatName[key], type: key })),
  f.keys
)

export const FormatType = {
  NORMAL_TEXT: 'NORMAL_TEXT',
  NUM_THOUSAND: 'NUM_THOUSAND',
  NUM_THOUSAND_DECIMAL2: 'NUM_THOUSAND_DECIMAL2',
  PERCENT: 'PERCENT',
  PERCENT_DECIMAL2: 'PERCENT_DECIMAL2',
  DOLLAR_THOUSAND: 'DOLLAR_THOUSAND',
  DOLLAR_THOUSAND_DECIMAL2: 'DOLLAR_THOUSAND_DECIMAL2'
}

export const formatName = {
  [FormatType.NORMAL_TEXT]: '普通文本',
  [FormatType.NUM_THOUSAND]: '12,345',
  [FormatType.NUM_THOUSAND_DECIMAL2]: '1,234.10',
  [FormatType.PERCENT]: '12%',
  [FormatType.PERCENT_DECIMAL2]: '12.34%',
  [FormatType.DOLLAR_THOUSAND]: '¥123,456',
  [FormatType.DOLLAR_THOUSAND_DECIMAL2]: '¥123,346.78'
}

export function formatText(text: any, formatType: string) {
  switch (formatType) {
    case FormatType.NORMAL_TEXT:
      return text
    case FormatType.NUM_THOUSAND:
      return numeral(text).format('0,0')
    case FormatType.NUM_THOUSAND_DECIMAL2:
      return numeral(text).format('0,0.00')
    case FormatType.PERCENT:
      return numeral(text).format('0%')
    case FormatType.PERCENT_DECIMAL2:
      return numeral(text).format('0.00%')
    case FormatType.DOLLAR_THOUSAND:
      return `¥${numeral(text).format('0,0')}`
    case FormatType.DOLLAR_THOUSAND_DECIMAL2:
      return `¥${numeral(text).format('0,0.00')}`
    default:
      return text
  }
}

export const formatTypeList = formatTypeListGenerator(FormatType)
