<template>
  <div :class="options.elUUID" style="word-break: break-all">
    <a-table
      :columns="filterColumn"
      :dataSource="tableData"
      :pagination="pagination"
      :row-selection="
        options.rowSelectKey
          ? {
              selectedRowKeys: options.selectedRowKeys,
              preserveSelectedRowKeys: true,
              onChange: onSelectChange
            }
          : null
      "
      :rowKey="(record:any) => record[options.rowSelectKey]"
      bordered
      size="middle"
      :scroll="{ x: 'max-content', y: tableHeight }"
    >
      <!-- <template #customFilterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }">
      <CustomColumns
        type="original"
        :uuid="options.commonConfigAssignSign"
        :columnsReference="options.columnsReference"
        :columsBackups="options.columnsData"
        :columnByKeyMap="options.columnByKeyMap"
        @onLoadLocalColumns="onLoadLocalColumns"
        @onReloadColumns="onReloadColumns"
        @onResetColumns="onResetColumns"
      />
    </template>

    <template #customFilterIcon="{ filtered, column }">
      <SettingOutlined v-if="column.dataIndex == '_980355088_'" />
    </template> -->
      <template #bodyCell="{ column, record }">
        <div class="table-cell" v-if="column.dataIndex !== '_980355088_'" v-for="(item, key) in options.specialColumnsConfigs" :key="key">
          <span v-for="(actionItem, actionKey) in item" :key="actionKey">
            <!-- (key === column.colIndex||item.parentIndex==column.colIndex) 这块的处理逻辑是，1 防止一个表中重复配置相同字段，2 子列处理，-->
            <span v-if="actionItem.valueType === 'value' && column.dataIndex === actionItem.dataIndex && (key === column.colIndex || item.parentIndex == column.colIndex)">
              <CustomCell v-if="record" :rowData="record" :isOperate="false" :actionItem="actionItem" :columnItem="column" />
              <a-divider type="vertical" v-if="actionKey < item.length - 1 && onHandleStatusConfigRender(record, actionItem, actionItem.colValue, column) !== '<span></span>'" />
            </span>
            <span
              v-else-if="actionItem.valueType === 'text' && column.dataIndex === actionItem.dataIndex && key === column.colIndex && (key === column.colIndex || item.parentIndex == column.colIndex)"
            >
              <CustomCell v-if="record" :rowData="record" :actionItem="actionItem" :defaultValue="actionItem.colValue" :columnItem="column" :isOperate="true" />
              <a-divider type="vertical" v-if="actionKey < item.length - 1 && onHandleStatusConfigRender(record, actionItem, actionItem.colValue, column) !== '<span></span>'" />
            </span>
            <span
              v-else-if="actionItem.valueType === 'file' && column.dataIndex === actionItem.dataIndex && key === column.colIndex && (key === column.colIndex || item.parentIndex == column.colIndex)"
            >
              <!-- 文件特殊处理 ，图片，word pdf等 -->
              <span v-if="isFileArray(record[actionItem.colValue])">
                <span v-for="(fileItem, fileIndex) in JSON.parse(record[actionItem.colValue])" :key="'file' + fileIndex" @click="downloadFile(fileItem)">
                  <a-tooltip placement="bottom" effect="light" color="#fff">
                    <template #title>
                      <span style="color: #000">名称：{{ fileItem.fileName }}<br />{{ filterType(fileItem.size) }}</span>
                      <span class="download-span" @click="downloadFile(fileItem)">下载</span>
                    </template>
                    <img v-if="fileItem.type.indexOf('image') != -1" class="file-img" :src="fileItem.url" />
                    <!-- text -->
                    <img v-else-if="fileItem.type.indexOf('image') != -1" class="file-img" :src="textUrl" />
                    <!-- pdf -->
                    <img v-else-if="fileItem.type.indexOf('pdf') != -1" class="file-img" :src="pdfUrl" />
                    <!-- ppt -->
                    <img v-else-if="fileItem.type.indexOf('presentation') != -1 || fileItem.type.indexOf('powerpoint') != -1" class="file-img" :src="pptUrl" />
                    <!-- rar -->
                    <img v-else-if="fileItem.type.indexOf('rar') != -1" class="file-img" :src="zipUrl" />
                    <!-- word -->
                    <img v-else-if="fileItem.type.indexOf('document') != -1 || fileItem.type.indexOf('word') != -1" class="file-img" :src="wordUrl" />
                    <!-- excel -->
                    <img v-else-if="fileItem.type.indexOf('excel') != -1 || fileItem.type.indexOf('sheet') != -1" class="file-img" :src="excelUrl" />
                    <!-- else 文件doc -->
                    <img v-else class="file-img" :src="docUrl" />
                  </a-tooltip>
                </span>
              </span>
              <span v-else>{{ record[actionItem.colValue] }}</span>
            </span>
            <span
              v-else-if="actionItem.valueType === 'pic' && column.dataIndex === actionItem.dataIndex && key === column.colIndex && (key === column.colIndex || item.parentIndex == column.colIndex)"
            >
              <!-- 文件特殊处理 ，图片，word pdf等 -->
              <img class="file-img" :src="record[actionItem.colValue]" />
            </span>
            <span
              v-else-if="actionItem.valueType === 'color' && column.dataIndex === actionItem.dataIndex && key === column.colIndex && (key === column.colIndex || item.parentIndex == column.colIndex)"
            >
              <span v-if="record[actionItem.colValue].indexOf('#') != -1">
                <div class="color-div" :style="{ backgroundColor: record[actionItem.colValue] }"></div>
              </span>
              <span v-else>
                <div class="color-div" :style="{ backgroundColor: '#' + record[actionItem.colValue] }"></div>
              </span>
              <!-- 文件特殊处理 ，图片，word pdf等 -->
            </span>
            <span
              v-else-if="actionItem.valueType === 'link' && column.dataIndex === actionItem.dataIndex && key === column.colIndex && (key === column.colIndex || item.parentIndex == column.colIndex)"
            >
              <!-- 文件特殊处理 ，图片，word pdf等 -->
              <a>{{ record[actionItem.colValue] }}</a>
            </span>
            <span v-else-if="!actionItem.valueType && column.dataIndex === actionItem.dataIndex && (key === column.colIndex || item.parentIndex == column.colIndex)">
              <span v-if="record">{{ actionItem.colValue }}</span>
            </span>
            <span class="table-cell-operation" v-if="actionItem.isEditField && column.dataIndex === actionItem.dataIndex && (key === column.colIndex || item.parentIndex == column.colIndex)">
              <CheckOutlined class="save-icon" v-if="record.editable && actionItem.colValue === record.editCol" @click="onSaveIcon(record, actionItem, record[actionItem.colValue])" />
              <EditOutlined v-else class="edit-icon" @click="onEditIcon(record, actionItem)" />
            </span>
          </span>
        </div>
      </template>
    </a-table>
    <div style="position: absolute; margin-top: -40px; cursor: pointer" v-if="options.columnSetSwitch">
      <a-popover trigger="click">
        <template #content>
          <CustomColumns
            type="original"
            :uuid="tableUUID"
            :columnsReference="options.columnsReference"
            :columsBackups="options.columnsData"
            :columnByKeyMap="options.columnByKeyMap"
            @onLoadLocalColumns="onLoadLocalColumns"
            @onReloadColumns="onReloadColumns"
            @onResetColumns="onResetColumns"
          />
        </template>
        <SettingOutlined style="margin-right: 5px" />列设置
      </a-popover>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, watch } from 'vue'
import optionsConfig from './options-config'
import { mapActions } from 'pinia'
import { useDataStore } from '@/stores'
import CustomCell from './custom-cell/index.vue'
import CustomColumns from './custom-columns/index.vue'
import { SettingOutlined, EditOutlined, CheckOutlined } from '@ant-design/icons-vue'
import { isFileArray } from '@/utils/param-value'
export default defineComponent({
  name: 'AntdTableTemplate',
  components: { CustomColumns, CustomCell, SettingOutlined, EditOutlined, CheckOutlined },
  data() {
    return {
      options: optionsConfig
    }
  },
  computed: {
    filterColumn() {
      return this.options.columnsData.length ? this.options.columnsData : this.options.defaultColumnsData
    },
    pagination() {
      let pTemp = false
      if (this.options.paginationSwitch) {
        if (this.options.columnsData.length > 0) {
          pTemp = this.options.pagination
        } else {
          pTemp = this.options.defaultPagination
        }
      }
      return pTemp
    },
    tableHeight() {
      if (this.options.commonConfigCompHeightUnit === 'auto') {
        return 240
      } else if (this.options.commonConfigCompHeightUnit === '%') {
        return this.options.commonConfigCompHeight + 'vh'
      } else {
        return this.options.commonConfigCompHeight
      }
    },
    tableData() {
      let interfaceTableData = []
      if (this.options.interfaceDataConfig.uuid) {
        let resp = this.interfaceDataById(this.options.interfaceDataConfig.uuid)
        interfaceTableData = []
        if (resp && resp.data.responseData) {
          interfaceTableData = resp.data.responseData[this.options.interfaceDataConfig.key]
          //   interfaceTableData = resp[this.options.interfaceDataConfig.key]
          if (this.options.pagingTotalKey) {
            this.options.pagination.total = resp.data.responseData[this.options.pagingTotalKey]
          }
        }
        return interfaceTableData
      } else {
        interfaceTableData = this.options.defaultTableData
        return interfaceTableData
      }
    }
  },
  watch: {
    'options.interfaceDataConfig': {
      deep: true,
      handler(vals: any) {
        // 设计器使用
        // this.handlerData()
      }
    },
    'options.rowIndexSwitch': {
      immediate: true,
      handler(val: any) {
        this.handleRowIndexSwitch(val)
      }
    },
    'options.columnsConfigList': {
      deep: true,
      handler(vals: any) {
        this.handleColumnsConfigList(vals)
      }
    }
  },
  created() {
    this.handleColumnsConfigList(this.options.columnsConfigList)
    if (this.options.rowIndexSwitch) {
      this.handleRowIndexSwitch(this.options.rowIndexSwitch)
    }
    this.options.pagination.current = this.options.pagination.current || 1
    if (typeof this.options.paginationSwitch == 'undefined') {
      this.options.paginationSwitch = true
    }
  },
  methods: {
    ...mapActions(useDataStore, ['interfaceDataById']),
    isFileArray,
    handleColumnsConfigList(vals: any) {
      this.options.columnsData = []
      let language = navigator.language.substr(0, 2)

      vals &&
        vals.forEach((item: any, index: any) => {
          let columnItem = JSON.parse(JSON.stringify(item)) || {}
          if (this.options.leftFixedIndex) {
            if (index < this.options.leftFixedIndex) {
              columnItem.fixed = 'left'
            }
          }
          if (columnItem.dataIndex == '操作') {
            if (columnItem.isRightFixed) {
              if (columnItem.isFixedWidth) {
                columnItem.width = columnItem.operatorWidth
              } else {
                columnItem.width = 0
              }
              columnItem.fixed = 'right'
              if (!columnItem.operatorWidth) {
                columnItem.operatorWidth = 100
              }
            } else {
              delete columnItem.fixed
              columnItem.width = columnItem.operatorWidth
            }
          }
          columnItem._isSpecialConfig = true
          columnItem.type = 'special-component-table-column'
          let titleValue = ''
          if (language == 'zh') {
            titleValue = item.value || item.enValue
          } else {
            titleValue = item.enValue || item.value
          }
          columnItem.title = titleValue
          columnItem.dataIndex = item.dataIndex || ''
          columnItem.key = item.key || item.value
          columnItem.colAlign = item.align || 'center'
          columnItem.align = 'center'
          columnItem.colValueType = item.colValueType || 'single-row'
          columnItem.colIndex = index
          // columnItem.specialColumnsConfigs = this.options.specialColumnsConfigs
          // columnItem.interfaceDataConfig = this.options.interfaceDataConfig
          /************** 修改20230108 start ***************/
          const _componentListTemp = columnItem.componentList

          // let componentList = handlerValueColumn(columnItem, _componentListTemp)
          this.handlerValueColumnV2(columnItem, _componentListTemp)
          // columnItem.componentList = componentList
          // 2023-06-26 新增子列处理逻辑
          this.onHandleChildren(columnItem)
          this.options.columnsData.push(columnItem)
          this.renderTd(columnItem)
          //   this.options.columns.push({
          //     specialUUID: 'table-column-' + generateUUID(),
          //     value: item.value,
          //     _specialConfig: columnItem // 暂时不能删
          //     // componentList,
          //   })
        })

      this.options.reloadAsideMenu = Date.now() // TODO::: 特殊处理，待优化，解决侧边栏页面结构不实时的问题
    },
    handlerValueColumnV2(columnItem: any, _componentListTemp: any) {
      //   let specialConfigs = columnItem.specialColumnsConfigs[columnItem.colIndex]
      //   // 列值配置
      //   specialConfigs &&
      //     specialConfigs.forEach((item, index) => {
      //       /************** 修改20230108 start ***************/
      //       let _componentItemTemp = {}
      //       if (_componentListTemp && _componentListTemp.length) {
      //         _componentItemTemp = _componentListTemp[index]
      //       }
      //     })
    },
    onHandleChildren(columnItem: any) {
      let language = navigator.language.substr(0, 2)
      let childrenConfigs = columnItem.children || []
      if (childrenConfigs && childrenConfigs.length) {
        childrenConfigs.forEach((item: any) => {
          let titleValue = ''
          if (language == 'zh') {
            titleValue = item.title || item.enValue
          } else {
            titleValue = item.enValue || item.title
          }
          let obj = {
            name: titleValue,
            dataIndex: item.dataIndex,
            key: item.dataIndex,
            colValue: item.dataIndex,
            parentIndex: columnItem.colIndex,
            valueType: 'value'
          }
          //   this.options.specialColumnsConfigs.push([obj])
        })
      }
    },
    onHandleStatusConfigRender(rowData: any, actionItem: any, defaultValue: any, columnItem: any) {
      let returnElement = `<span></span>`
      let obj = {
        displayValue: '',
        color: 'rgba(0,0,0,0.65)',
        isShow: true
      }
      // 数据接入
      let colValue = rowData[actionItem.colValue]
      let statusEventList = []
      if (actionItem.dataIndex == '操作') {
        obj.color = '#1890ff'
        statusEventList = actionItem.statusEventList
      } else {
        statusEventList = columnItem.statusEventList
      }
      if (statusEventList) {
        let backItem: any = {
          tableRowData: rowData
        }
        // let watchStatus = new WatchStatus(props.pageId, backItem, rowData)
        // watchStatus.init(statusEventList);
        if (backItem.isNotRender) {
          return '<span></span>'
        }
        if (backItem.colValue) {
          colValue = backItem.colValue
        }
        if (backItem.textColor) {
          obj.color = backItem.textColor
        }
      }

      returnElement = `<span style="color: ${obj.color}">${colValue || defaultValue}</span>`
      return returnElement
    },
    renderTd(columnItem: any) {
      columnItem.customCell = (record: any) => {
        return {
          style: {
            padding: 0
          }
        }
      }
      // customCell
      // 字 customRender
    },
    handleRowIndexSwitch(val: any) {
      if (val) {
        if (this.options.columnsData[0].dataIndex === '_980355088_') return false
        let rowIndex = {
          title: '序号',
          dataIndex: '_980355088_',
          width: 80,
          key: '_980355088_',
          align: 'center',
          //   customFilterDropdown: true,
          //   fixed:'left',
          customRender: (text: any) => {
            const startIndex = (Math.max(this.options.pagination.current || 1, 1) - 1) * this.options.pagination.pageSize
            return text.index + 1 + startIndex
          }
        }
        if (this.options.leftFixedIndex) {
          rowIndex.fixed = 'left'
        }
        this.options.columnsData.unshift(rowIndex)
      } else {
        if (this.options.columnsData[0] && this.options.columnsData[0].dataIndex === '_980355088_') {
          this.options.columnsData.shift()
        }
      }
    },
    onEditIcon(record: any, actionItem: any) {},
    onSaveIcon(record: any, actionItem: any, columnValue: any) {},
    downloadFile(fileItem: any) {},
    filterType(val: any) {
      if (val === 0) return '0 B'
      var k = 1024
      var sizes = ['B', 'KB', 'MB', 'GB', 'PB', 'TB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(val) / Math.log(k))
      return (val / Math.pow(k, i)).toPrecision(3) + '' + sizes[i]
    }
  }
})

// export default defineComponent({
//     name: "AntdTableTemplate",
//     components: {},
//     // data () {
//     //     return {
//     //         options: optionsConfig
//     //     };
//     // },
//     // watch: {
//     //     'options.interfaceDataConfig': {
//     //         deep: true,
//     //         handler (vals) {
//     //             console.log('interfaceId', 'interfaceId')
//     //         }
//     //     }
//     // },
//     // computed: {
//     //     ...mapState(['componentListMap']),
//     // },

//     setup () {
//         const options = ref(optionsConfig)
//         const dataEngine = useDataEngine();
//         // dataEngine.interfaceMap.value

//         // watch(options.value.interfaceDataConfig,
//         //     (newValue, oldValue) => {
//         //         console.log('interfaceId', 'interfaceId')
//         //     }, { deep: true }
//         // )
//         // console.log('setup')
//         // dataEngine.watchInterfaceReady(() => {
//         //     console.log('interfaceId', 'interfaceId', options.value.interfaceDataConfig, dataEngine.interfaceMap.value)
//         //     const interfaceId = options.value.interfaceDataConfig.id
//         //     if (!interfaceId) return false
//         //     options.value.interfaceDataConfig.tableData = dataEngine.interfaceMap.value[interfaceId].responseData
//         // })

//         return {
//             options
//         }
//     }
// })
</script>

<style lang="scss" scoped>
.table-cell {
  .table-cell-operation {
    // float: right;
    // margin-right: 10px;
    right: 10px;
    position: absolute;
    top: 26%;
    i {
      cursor: pointer;
      font-size: 18px;
    }
    .edit-icon {
      //   display: none;
    }
  }
}
.ant-table-cell {
  &:hover .table-cell-operation .edit-icon {
    display: initial;
  }
}

.download-span {
  margin-left: 20px;
  color: #004ea2;
  cursor: pointer;
}
.file-img {
  height: 24px;
  width: auto;
}
.color-div {
  border-radius: 50%;
  width: 20px;
  height: 20px;
  margin: auto;
}
</style>
