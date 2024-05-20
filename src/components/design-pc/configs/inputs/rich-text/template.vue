<template>
  <div class="custom_component_label" :style="flexStyle">
    <label
      :class="options.required ? 'required' : ''"
      :style="{
        display: options.labelShow ? '' : 'none',
        width: options.labelAlign == 'top' ? '100%' : options.width + 'px',
        textAlign: options.labelAlign == 'top' ? 'left' : options.labelAlign as 'left' | 'center' | 'right',
      }"
    >
      {{ options.label }}
    </label>
    <div style="border: 1px solid #ccc">
      <Toolbar style="border-bottom: 1px solid #ccc" :editor="extraData.editor" />
      <Editor
        style="height: 400px; overflow-y: hidden"
        v-model="options.value"
        mode="default"
        :defaultConfig="{ placeholder: '请输入...' }"
        @onCreated="handleCreated"
      />
    </div>
  </div>
</template>
<script lang="ts">
import optionsConfig from './options-config'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
// @ts-ignore
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
export default {
  type: 'nebula-component-rich-text',
  components: {
    Editor,
    Toolbar
  },
  data() {
    return {
      options: optionsConfig,
      extraData: {
        editor: null
      }
    }
  },
  created() {},
  beforeDestroy() {
    const editor = this.extraData.editor as any
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  },
  computed: {
    flexStyle() {
      if (this.options.labelAlign != 'top') {
        return {
          display: 'flex'
        }
      }
      return {}
    }
  },
  methods: {
    handleCreated(editor: any) {
      // if (this.options.extraData.editor == null) {
      this.extraData.editor = Object.seal(editor)
      // }
    }
  }
}
</script>
<style></style>
