<template>
  <div class="app-container">
    <el-card class="box-card">
    
    </el-card>
  </div>
</template>

<script>
import request from '@/utils/request'
import waves from '@/directive/waves' // 水波纹指令

export default {
  directives: {
    waves
  },
  data() {
    return {
      listLoading: true,
      res: {
        sendNum: 0,
        standbyNum: 0,
        money: 0,
        orderNum: 0
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      request({
        url: '/address/list',
        method: 'get'
      }).then(res => {
        this.listLoading = true
        this.res = res.data
      })
    }
  }
}
</script>
