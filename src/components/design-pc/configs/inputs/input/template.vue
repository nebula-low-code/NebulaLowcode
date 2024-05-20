<template>
  <div class="custom_component_label" :style="flexStyle">
    <label
      :class="options.required ? 'required' : ''"
      :style="{
        display: options.labelShow ? '' : 'none',
        width: options.labelAlign == 'top' ? '100%' : options.width + 'px',
        textAlign: options.labelAlign == 'top' ? 'left' : options.labelAlign as 'left' | 'center' | 'right',
        lineHeight: options.size == 'large' ? '40px' : options.size == 'small' ? '24px' : '32px'
      }"
    >
      {{ options.label }}
    </label>
    <div style="flex: 1">
      <a-input-password
        v-if="options.isPassword || options.inputType === 'password'"
        v-model:value="options.value"
        :placeholder="options.placeholder"
        :size="options.size"
        :disabled="options.disabled"
        :addon-after="options.addonAfter"
        :addon-before="options.addonBefore"
        :maxlength="options.maxlength"
        :allowClear="options.clearable"
      />
      <a-textarea
        v-else-if="options.inputType === 'textarea'"
        v-model:value="options.value"
        :placeholder="options.placeholder"
        :size="options.size"
        :disabled="options.disabled"
        :addon-after="options.addonAfter"
        :addon-before="options.addonBefore"
        :maxlength="options.maxlength"
        :allowClear="options.clearable"
        :auto-Size="autoSize"
      />
      <a-input
        v-else
        v-model:value="options.value"
        :placeholder="options.placeholder"
        :size="options.size"
        :disabled="options.disabled"
        :addon-after="options.addonAfter"
        :addon-before="options.addonBefore"
        :maxlength="options.maxlength"
        :allowClear="options.clearable"
      >
        <template #prefix>
          <i :class="options.customtimageIcon.fontClass" v-if="options.iconPreShow" />
        </template>
        <template #suffix>
          <i :class="options.suffixIcon.fontClass" v-if="options.iconPosShow" />
        </template>
      </a-input>
    </div>
  </div>
</template>

<script lang="ts">
import optionsConfig from './options-config'

export default {
  name: 'nebula-component-input',
  components: {},
  data() {
    return {
      options: optionsConfig
    }
  },
  watch: {},
  mounted() {},
  computed: {
    flexStyle() {
      if (this.options.labelAlign != 'top') {
        return {
          display: 'flex'
        }
      }
      return {}
    },
    autoSize(){
        if(this.options.autoSize){
            return true;
        }else{
            let value={} ;
            if(this.options.minRows){
                value.minRows=this.options.minRows
            }
            if(this.options.maxRows){
                value.maxRows=this.options.maxRows
            }
            if(Object.keys(value).length > 0){
                return value
            }
        }
        return false
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped></style>
