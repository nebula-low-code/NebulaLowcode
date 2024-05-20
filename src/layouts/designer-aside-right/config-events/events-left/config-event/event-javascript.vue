<template>
  <div class="code-editor-event" style="display: flex">
    <CodeEditor ref="editor" width="100%" height="350px" :mode="'javascript'" @onChange="onChange" />
    <div style="background-color: #f8f8f8; width: 165px; padding: 10px">
      <div class="codeSnippetTitle">代码片段：</div>
      <ul>
        <li class="codeSnippet" @click="snippetHandler('getComponents')">
          获取组件
          <a-tooltip class="item" title="通过组件名获取匹配的组件列表" placement="right">
            <question-circle-filled />
          </a-tooltip>
        </li>
        <li class="codeSnippet" @click="snippetHandler('getComponentValue')">
          获取组件值
          <a-tooltip class="item" effect="dark" title="通过获取到的组件获取组件值" placement="right">
            <question-circle-filled />
          </a-tooltip>
        </li>
        <li class="codeSnippet" @click="snippetHandler('setComponentValue')">
          设置组件值
          <a-tooltip class="item" effect="dark" title="通过获取到的组件设置组件值" placement="right">
            <question-circle-filled />
          </a-tooltip>
        </li>
        <li class="codeSnippet" @click="snippetHandler('toggleComponentDisplay')">
          显隐组件
          <a-tooltip class="item" effect="dark" title="控制组件的显示隐藏" placement="right">
            <question-circle-filled />
          </a-tooltip>
        </li>
        <li class="codeSnippet" @click="snippetHandler('showComponentDisplay')">
          显示组件
          <a-tooltip class="item" effect="dark" title="显示组件" placement="right">
            <question-circle-filled />
          </a-tooltip>
        </li>
        <li class="codeSnippet" @click="snippetHandler('hideComponentDisplay')">
          隐藏组件
          <a-tooltip class="item" effect="dark" title="隐藏组件" placement="right">
            <question-circle-filled />
          </a-tooltip>
        </li>
        <li class="codeSnippet" @click="snippetHandler('refreshComponentData')">
          组件刷新
          <a-tooltip class="item" effect="dark" title="传入获取到的组件引用刷新该组件的数据" placement="right">
            <question-circle-filled />
          </a-tooltip>
        </li>
        <li class="codeSnippet" @click="snippetHandler('getPageParamsData')">
          页面入参
          <a-tooltip class="item" effect="dark" title="页面入参" placement="right">
            <question-circle-filled />
          </a-tooltip>
        </li>
        <li class="codeSnippet" @click="snippetHandler('getGloableParamsData')">
          全局变量
          <a-tooltip class="item" effect="dark" title="全局变量" placement="right">
            <question-circle-filled />
          </a-tooltip>
        </li>
        <li class="codeSnippet" @click="snippetHandler('getListFunction')">
          列表
          <a-tooltip class="item" effect="dark" title="列表相关方法封装" placement="right">
            <question-circle-filled />
          </a-tooltip>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import CodeEditor from '@/components/tools/code-editor/index.vue'
import { useDataStore } from '@/stores'
import { QuestionCircleFilled } from '@ant-design/icons-vue'

const editor = ref()
const store = useDataStore()
const properties = computed(() => store.curDiagram.properties)

const getComponentsCodeSnippet = `// 返回页面所有名称为【component_name】的组件数组，
var coms = pm.components.get('component_name');`

const getPageParamsDataCodeSnippet = `// 返回页面的所有参数，使用【params.参数名】获得单一参数值
var params = pm.page.getParams();
var value=params.参数名;`

const getGlobalParamsDataCodeSnippet = `// 返回全局变量的所有参数，使用pm.global.getParamByName 获取单个范围里的单一参数值，使用pm.global.saveParamByName 保存全局变量
var params = pm.global.getParams();
var param = pm.global.getParamByName('scopeName', 'variableKey');
pm.global.saveParamByName('scopeName', 'variableKey','value');`

const getListFunctionSnippet = `/**
* 获取列表值
* @param {*} component 列表组件
* @returns 列表绑定的数值
*/
var params = pm.list.getList(component);
/**
* 动态添加列表item
* @param {*} component 列表组件
* @param {*} item 
*/
pm.list.addItem(component,item);`

// onMounted(() => {
//   console.log('onMounted=', properties.value)
//   console.log('editor=', editor.value.content)

//   if (properties.value) {
//     editor.value.content = properties.value.sourceCodeStr
//   }
// })

function onOpen(content: string) {
  editor.value.content = content
}

function onChange(value: string) {
  properties.value.sourceCodeStr = value
}

function snippetHandler(key: string) {
  const codeSnippetDict = {
    getComponents: getComponentsCodeSnippet,
    getComponentValue: `pm.components.getValue(component);`,
    setComponentValue: `pm.components.setValue(component, 'value');`,
    toggleComponentDisplay: `pm.components.toggle(component);`,
    showComponentDisplay: `pm.components.show(component);`,
    hideComponentDisplay: `pm.components.hide(component);`,
    refreshComponentData: `pm.components.refreshData(component);`,
    getPageParamsData: getPageParamsDataCodeSnippet,
    getGloableParamsData: getGlobalParamsDataCodeSnippet,
    getListFunction: getListFunctionSnippet
  } as any
  // console.log(key, this.curDiagram.properties)

  // insertValue = `\n${codeSnippetDict[key]}`
  editor.value.content += `\n${codeSnippetDict[key]}`
}

defineExpose({
  onOpen
})
</script>

<style lang="scss" scoped>
.code-editor-event {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 360px;
  padding: 0px 10px;
  box-sizing: border-box;
  background-color: #fff;
}

.codeSnippetTitle {
  height: 30px;
  line-height: 30px;
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: 500;
}

.codeSnippet {
  cursor: pointer;
  padding-left: 10px;
  height: 30px;
  line-height: 30px;
  color: #1890ff;
}

.codeSnippet:hover {
  background-color: #ede9f9;
}
</style>
