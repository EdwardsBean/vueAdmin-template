<template>
  <div class="app-container">
    <el-card class="box-card" v-loading.body="loading" element-loading-text="拼命加载中 ...">
      <el-button class="filter-item" style="margin-bottom: 10px;" @click="handleUpdate" type="primary" icon="el-icon-edit">新增</el-button>

      <!-- 表格 -->
      <el-table :data="list" border fit highlight-current-row>
        <el-table-column align="center" label='关键字' prop="name"></el-table-column>
        <el-table-column align="center" label='值'>
          <template slot-scope="scope">
            <span>{{scope.row.value}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label='详细描述'>
          <template slot-scope="scope">
            <span class="td-word" :title="scope.row.desc">{{ scope.row.desc }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label='操作'>
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleUpdate(scope.row)">修改</el-button>
            <el-button type="danger" size="small" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 对话框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="right" label-width="100px"
               style='width: 600px; margin-left:50px;' v-loading.fullscreen="loadingFull" element-loading-text="拼命加载中 ..." >
        <el-form-item label="关键字" prop="name">
          <el-input v-model="temp.name"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="temp.type">
            <el-option label="字符串" value="string"></el-option>
            <el-option label="布尔型" value="boolean"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="值" prop="value">
          <el-input v-model="temp.value" v-if="temp.type === 'string'"></el-input>
          <el-radio v-model="temp.value" v-if="temp.type === 'boolean'" label="true"></el-radio>
          <el-radio v-model="temp.value" v-if="temp.type === 'boolean'" label="false"></el-radio>
        </el-form-item>
        <el-form-item label="详细描述" prop="desc">
          <el-input v-model="temp.desc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
import { getList, saveConfig, deleteConfig } from '@/api/config'

export default {
  directives: {
    waves
  },
  data() {
    const validValue = (rule, value, callback) => {
      if (this.temp.value === '') {
        callback(new Error('请填写值！'))
      } else {
        callback()
      }
    }
    return {
      loading: true,
      loadingFull: false,
      list: [],
      dialogStatus: '',
      textMap: {
        'create': '新增',
        'update': '编辑'
      },
      dialogFormVisible: false,
      temp: {},
      rules: {
        name: [
          { required: true, message: '请填写关键词', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择类型', trigger: 'blur' }
        ],
        value: [
          { validator: validValue }
        ],
        desc: [
          { required: true, message: '请填写详细描述', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      getList().then(res => {
        this.loading = false
        this.list = res.data
      })
    },
    handleUpdate(row) {
      if (row.id) {
        // 编辑
        this.dialogStatus = 'update'
        this.temp = Object.assign({}, row)
      } else {
        // 新增
        this.dialogStatus = 'create'
        this.temp = { 'name': '', 'desc': '', 'type': 'string', 'value': '' }
      }
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.dataForm.clearValidate()
      })
    },
    handleSave() {
      this.$refs.dataForm.validate(valid => {
        if (valid) {
          this.loadingFull = true
          saveConfig(this.temp).then(res => {
            this.loadingFull = false
            this.dialogFormVisible = false
            this.fetchData()
            this.$notify({
              title: this.textMap[this.dialogStatus] + '成功',
              message: this.textMap[this.dialogStatus] + '成功！',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      this.$confirm('确认删除, 是否继续?', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delete(row)
      }).catch(() => {
        this.$notify({
          title: '取消',
          message: '已取消删除',
          type: 'info',
          duration: 2000
        })
      })
    },
    delete(row) {
      this.loadingFull = true
      deleteConfig(row).then(res => {
        this.loadingFull = false
        for (var index in this.list) {
          if (this.list[index].id === row) {
            this.list.splice(index, 1)
            break
          }
        }
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
      })
    }
  }
}
</script>
