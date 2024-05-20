// import { componentConfigItemType } from '@/views/report/type'
export function componentDeepClone(obj: any, valueType = {} as any, isDeleteAttr = false): any {
  const target = valueType
  // 遍历 复制数组或对象
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (obj[key] && typeof obj[key] === 'object') {
        let container = {}
        if (typeof obj[key].push === 'function') {
          container = []
        }
        target[key] = componentDeepClone(obj[key], container, isDeleteAttr)
      } else {
        target[key] = obj[key]
      }
    }
  }
  // 组件data与options引用同一对象
  // TODO::: 待优化，可能有bug，没有深层过滤，需要移到上面的循环中过滤
  if (
    target &&
    target.component &&
    target.options &&
    (target.component.data || target.component.template)
  ) {
    target.component.data = () => {
      return {
        options: target.options,
        extraData: target.extraData
      }
    }
  }
  return target
}

// export function componentDeepClone<T>(source: T): T {
//   if (source === null || typeof source !== 'object') {
//     // 如果是原始类型或 null，则直接返回
//     return source
//   }

//   if (Array.isArray(source)) {
//     // 如果是数组，递归拷贝数组的每个元素
//     const cloneArray = source.map((item) => componentDeepClone(item))
//     return cloneArray as any
//   }

//   // 如果是对象，递归拷贝对象的每个属性
//   const cloneObject = {} as T
//   for (const key in source) {
//     if (Object.prototype.hasOwnProperty.call(source, key)) {
//       cloneObject[key] = componentDeepClone(source[key])
//     }
//   }
//   return cloneObject
// }
