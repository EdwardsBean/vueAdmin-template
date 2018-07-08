<template>
  <div class="app-container">
    <el-card class="box-card">
      <!-- 搜索框 -->
      <div class="filter-container">
        <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">添加</el-button>
      </div>
      <!-- 表格 -->
      <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
        <el-table-column align="center" label='平台' width="95">
          <template slot-scope="scope">
            {{scope.row.platform}}
          </template>
        </el-table-column>
        <el-table-column label="店铺名称" width="130">
          <template slot-scope="scope">
            {{scope.row.shop_name}}
          </template>
        </el-table-column>
        <el-table-column label="发件人" width="130" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.sender}}</span>
          </template>
        </el-table-column>
        <el-table-column label="地址" align="center">
          <template slot-scope="scope">
            {{scope.row.province + scope.row.city +  scope.row.district + scope.row.detail}}
          </template>
        </el-table-column>
        <el-table-column label="电话" width="110" align="center">
          <template slot-scope="scope">
            {{scope.row.phone}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="230">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 编辑框 -->
      <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
        <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
          <el-form-item label="标题" prop="title">
            <el-input v-model="temp.title"></el-input>
          </el-form-item>
          <el-form-item label="点评">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.remark">
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确定</el-button>
          <el-button v-else type="primary" @click="updateData">确定</el-button>
        </div>
      </el-dialog>
      </el-card>
  </div>
</template>

<script>
import { getAddress, addAddress, delAddress, updateAddress } from '@/api/address'
import waves from '@/directive/waves' // 水波纹指令

export default {
  directives: {
    waves
  },
  data() {
    return {
      listLoading: true,
      rules: {
        type: [
          { required: true, message: 'type is required', trigger: 'change' }
        ],
        timestamp: [
          {
            type: 'date',
            required: true,
            message: 'timestamp is required',
            trigger: 'change'
          }
        ],
        title: [
          { required: true, message: 'title is required', trigger: 'blur' }
        ]
      },
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      list: [],
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogFormVisible: false
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          addAddress(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDel(row) {
      delAddress(row.id).then(() => {
        const index = this.list.indexOf(row)
        this.list.splice(index, 1)
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleModifyStatus() {},
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateAddress(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    fetchData() {
      this.listLoading = true
      getAddress().then(response => {
        this.list = response.data
        this.listLoading = false
      })
    }
  }
}
</script>
