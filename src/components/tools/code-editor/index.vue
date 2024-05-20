<template>
  <v-ace-editor v-model:value="content" theme="xcode" :lang="mode" :style="editorStyle" :options="{ showPrintMargin: false }" @change="onChange" />
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { VAceEditor } from 'vue3-ace-editor'
import 'ace-builds/src-noconflict/theme-xcode'
import ace from 'ace-builds'
import modeJsonUrl from 'ace-builds/src-noconflict/mode-json'
import modeJavascriptUrl from 'ace-builds/src-noconflict/mode-javascript'

const props = defineProps({
  mode: {
    type: String,
    default: 'json'
  },
  width: {
    type: String,
    default: '400px',
    required: false
  },
  height: {
    type: String,
    default: '300px',
    required: false
  }
})

const emit = defineEmits(['onChange'])

if (props.mode === 'json') {
  ace.config.setModuleUrl('ace/mode/json_worker', modeJsonUrl)
} else {
  ace.config.setModuleUrl('ace/mode/javascript_worker', modeJavascriptUrl)
}

const editorStyle = computed(() => {
  return {
    width: props.width,
    height: props.height
  }
})

let content = ref('')

function onChange(value: string) {
  emit('onChange', content.value)
}

defineExpose({
  content
})
</script>
<style></style>
