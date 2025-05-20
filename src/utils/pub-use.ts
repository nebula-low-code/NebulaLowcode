export function getAssetsFile(url: string) {
  return new URL(`../assets/${url}`, import.meta.url).href
}

//根据名字在树形数据中搜索
export function searchTreeData(nodes: any[], searchTerm: string, keyName: string): any[] {
  // 忽略大小写进行模糊匹配
  const lowerCaseSearchTerm = searchTerm.toLowerCase()

  // 递归搜索函数
  const searchRecursively = (nodes: any[]): any[] => {
    return nodes.reduce((acc, node) => {
      // 检查当前节点的label是否匹配
      if (node[keyName].toLowerCase().includes(lowerCaseSearchTerm)) {
        // 如果是叶子节点，直接添加到结果中
        if (!node.children || node.children.length === 0) {
          acc.push(node)
        } else {
          // 如果不是叶子节点，递归搜索子节点并合并结果
          const childrenResults = searchRecursively(node.children || [])
          if (childrenResults.length > 0) {
            acc.push({
              ...node,
              children: childrenResults
            })
          }
        }
      } else if (node.children) {
        // 如果当前节点不匹配，递归搜索子节点
        const childrenResults = searchRecursively(node.children)
        if (childrenResults.length > 0) {
          acc.push({
            ...node,
            children: childrenResults
          })
        }
      }
      return acc
    }, [] as any[])
  }

  // 开始递归搜索
  return searchRecursively(nodes)
}
