<template>
  <a-dropdown>
    <a class="ant-dropdown-link" @click.prevent>
      {{ options.title }}
      <DownOutlined />
    </a>
    <template #overlay>
      <a-menu>
        <a-menu-item v-for="(item, index) in options.menus" :key="index">
          {{ item.value }}
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script lang="ts">
import optionsConfig from './options-config'
import { DownOutlined } from '@ant-design/icons-vue'

export default {
  name: 'nebula-component-dropdown-menu',
  components: {
    DownOutlined
  },
  data() {
    return {
      options: optionsConfig
    }
  },
  computed: {},
  methods: {}
}
</script>

<style lang="scss" scoped></style>
