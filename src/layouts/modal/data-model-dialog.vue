<template>
  <a-modal title="数据模型" width="1000px" v-model:open="isShowDialog" cancelText="取消" okText="确定" @ok="save">
    <a-form ref="formRef" :rules="rules" :model="crudForm" class="demo-form-inline">
      <a-form-item label="数据库" name="dbConfigId" class="curd-form-item">
        <a-select placeholder="请选择" style="width: 200px" v-model:value="crudForm.dbConfigId" @change="dbChange">
          <a-select-option v-for="dbItem in dbList" :key="dbItem.businessId" :value="dbItem.businessId">
            {{ dbItem.dataSourceName }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="表名" name="tableName" class="curd-form-item">
        <a-input style="width: 200px" v-model:value="crudForm.tableName" placeholder="表名"></a-input>
      </a-form-item>
      <a-form-item label="文件名称" name="menuName">
        <a-input style="width: 200px" v-model:value="crudForm.menuName" placeholder="文件名称"></a-input>
      </a-form-item>
    </a-form>

    <a-table :dataSource="tableData" :columns="columns" style="width: 100%" max-height="400">
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.key === 'title'">
          <a-input v-model:value="record.colTitle" />
        </template>
        <template v-else-if="column.key === 'componentType'">
          <a-select v-model:value="record.editType" style="width: 150px; margin-right: 10px">
            <a-select-option v-for="(eItem, eKey) in editTypeList" :value="eItem.value" :key="eKey">
              {{ eItem.label }}
            </a-select-option>
          </a-select>
        </template>
        <template v-else-if="column.key === 'columnName'">
          <a-input v-model:value="record.columnName" />
        </template>
        <template v-else-if="column.key === 'dataType'">
          <a-input placeholder="请输入长度" v-model:value="record.precision" v-if="floatTypeMap.indexOf(record.dataType) === -1">
            <template #addonBefore>
              <a-select v-model:value="record.dataType" placeholder="请选择" style="width: 120px">
                <a-select-option :value="typeItem" v-for="(typeItem, key) in fieldDataTypeMap" :key="key">
                  {{ typeItem }}
                </a-select-option>
              </a-select>
            </template>
          </a-input>
          <a-input placeholder="请输入小数长度" v-model:value="record.scale" v-else>
            <template #addonBefore>
              <a-select v-model:value="record.dataType" placeholder="请选择" style="width: 120px">
                <a-select-option :value="typeItem" v-for="(typeItem, key) in fieldDataTypeMap" :key="key">
                  {{ typeItem }}
                </a-select-option>
              </a-select>
            </template>
          </a-input>
        </template>
        <template v-else-if="column.key === 'isTableCol'">
          <a-checkbox v-model:checked="record.isTableCol" />
        </template>
      </template>
    </a-table>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { crudByModelService } from '@/api/api'
import { getDbSrclist } from '@/api/api'
import { addDbTable } from '@/api/api'
import { useDataStore } from '@/stores'
import { message } from 'ant-design-vue'

const store = useDataStore()
const isShowDialog = ref(false)
let isSaving = false
const dbList = ref<any[]>([])
const formRef = ref()
const crudForm = reactive({
  dbConfigId: null,
  tableName: '',
  tablePrimaryKey: '',
  menuName: '',
  dataSourceName: ''
})
const fieldDataTypeMap = [
  'VARCHAR', // 字符型
  'INT', // 整数型
  'FLOAT',
  'DOUBLE', // 浮点型
  'DATE',
  'TIME',
  'YEAR',
  'DATETIME' // 日期型
]
const floatTypeMap = ['FLOAT', 'DOUBLE', 'DECIMAL']
const rules = {
  dbConfigId: [{ required: true, message: '请选择数据源', trigger: 'blur' }],
  tableName: [{ required: true, message: '请输入表名', trigger: 'blur' }],
  menuName: [{ required: true, message: '请输入文件名称', trigger: 'blur' }]
}
const tableData = ref<any[]>([])

const columns = [
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: '组件类型',
    dataIndex: 'componentType',
    key: 'componentType'
  },
  {
    title: '列名',
    dataIndex: 'columnName',
    key: 'columnName'
  },
  {
    title: '数据类型',
    dataIndex: 'dataType',
    key: 'dataType'
  },
  {
    title: '表格列',
    dataIndex: 'isTableCol',
    key: 'isTableCol'
  }
]

const editTypeList = [
  {
    label: '输入框',
    value: 'text'
  },
  {
    label: '日期选择器',
    value: 'date'
  },
  {
    label: '选择器',
    value: 'select'
  },
  {
    label: '单选',
    value: 'radio'
  },
  {
    label: '多选',
    value: 'checkbox'
  }
]

function initDb() {
  getDbSrclist().then((res: any) => {
    const dataList = res.dataList || []
    dbList.value = []
    dataList.forEach((element: any) => {
      if (element.type == 'database') {
        dbList.value.push(element)
      }
    })
  })
}

function dbChange(value: any) {
  dbList.value.forEach((item) => {
    if (item.businessId == crudForm.dbConfigId) {
      crudForm.dataSourceName = item.dataSourceName
    }
  })
}
function save() {
  if (isSaving) {
    return
  }
  let needColName = false
  tableData.value.forEach((tItem) => {
    if (!tItem.columnName) {
      needColName = true
    }
    setNameByComponentByUuid(tItem.uuid, tItem.columnName, tItem.colTitle)
  })
  if (needColName) {
    message.error('列名必填')
    return
  }

  formRef.value
    .validate()
    .then(() => {
      crudForm.tablePrimaryKey = ''
      tableData.value.forEach((item) => {
        item.colName = item.columnName
      })
      isSaving = true

      // 1、建表
      let param = {
        tableName: crudForm.tableName,
        dbConfigId: crudForm.dbConfigId,
        columns: tableData.value
      }
      addDbTable(param)
        .then((res: any) => {
          if (res.code == 0) {
            crudForm.tablePrimaryKey = res.data
            // 2、生成页面
            generateCrud()
          }
        })
        .catch(() => {
          isSaving = false
        })
    })
    .catch((error: any) => {
      console.log('error', error)
    })
}
function generateCrud() {
  let data = JSON.parse(JSON.stringify(tableData.value))
  data.push({
    colName: crudForm.tablePrimaryKey,
    columnName: crudForm.tablePrimaryKey,
    colType: 'int(11)',
    colTitle: crudForm.tablePrimaryKey,
    isTableCol: true,
    isSelect: false,
    isEditable: false,
    editType: 'text',
    isCheck: false
  })
  let param = {
    menuName: crudForm.menuName,
    tableName: crudForm.tableName,
    tablePrimaryKey: crudForm.tablePrimaryKey,
    dbConfigId: crudForm.dbConfigId,
    tableData: data,
    dataSourceName: crudForm.dataSourceName,
    modelReportId: store.pageConfig.config.reportId,
    componentList: JSON.stringify(store.componentTreeList)
  }
  crudByModelService(param)
    .then((res: any) => {
      if (res.code == 0) {
        message.success('数据模型创建成功')
        isShowDialog.value = false
        // this.$emit('onReloadView')
      }
      isSaving = false
    })
    .catch(() => {
      isSaving = false
    })
}
function dialogOpen() {
  isShowDialog.value = true
  tableData.value = []
  store.inputComponentList.forEach((cItem: any, cIndex) => {
    let eType = ''
    editTypeList.forEach((item) => {
      if (item.label == cItem.name) {
        eType = item.value
      }
    })
    tableData.value.push({
      colTitle: cItem.options.label,
      columnName: cItem.options.commonConfigAssignName,
      colName: cItem.options.commonConfigAssignName,
      uuid: cItem.uuid,
      editType: eType,
      dataType: 'VARCHAR',
      precision: 100,
      isSelect: true,
      isEditable: true,
      isCheck: cItem.options.required
    })
  })

  initDb()
}
function setNameByComponentByUuid(uuid: string, name: string, label: string) {
  let comp = store.componentConfigByUuid(uuid)
  if (comp) {
    comp.options.commonConfigAssignName = name
    comp.options.label = label
  }
}

defineExpose({
  dialogOpen
})
</script>

<style lang="scss" scoped>
.device-type-select {
  overflow: hidden;
  text-align: center;
  margin-bottom: 20px;
  .device-wrap {
    display: inline-block;
    &.active {
      color: #f56c6c;
    }
    cursor: pointer;
    .iconfont {
      font-size: 42px;
    }
  }
}
.demo-form-inline {
  display: flex;
  justify-content: space-between;
}
.add-table-data {
  margin-top: 10px;
  text-align: center;
}
</style>
