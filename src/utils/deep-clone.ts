export function deepClone<T>(source: T): T {
  if (source === null || typeof source !== 'object') {
    // 如果是原始类型或 null，则直接返回
    return source
  }

  if (Array.isArray(source)) {
    // 如果是数组，递归拷贝数组的每个元素
    const cloneArray = source.map((item) => deepClone(item))
    return cloneArray as any
  }

  // 如果是对象，递归拷贝对象的每个属性
  const cloneObject = {} as T
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      cloneObject[key] = deepClone(source[key])
    }
  }
  return cloneObject
}

export function deepMerge<T>(target: T, source: Partial<T>): T {
  if (source === null || typeof source !== 'object') {
    // 如果源对象是原始类型或者 null，则直接返回源对象
    return source as T
  }

  const mergedObject = { ...target }

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const targetValue = target[key]
      const sourceValue = source[key]

      if (
        targetValue !== null &&
        typeof targetValue === 'object' &&
        sourceValue !== null &&
        typeof sourceValue === 'object'
      ) {
        // 如果目标值和源值都是对象，则递归合并两个对象
        mergedObject[key] = deepMerge(targetValue, sourceValue)
      } else {
        // 否则，直接用源值覆盖目标值
        mergedObject[key] = sourceValue as NonNullable<T[Extract<keyof T, string>]>
      }
    }
  }

  return mergedObject
}
