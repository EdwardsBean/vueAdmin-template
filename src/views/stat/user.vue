<template>
  <div class="app-container">
    <panel-group :sendNum='res.sendNum'></panel-group>

    <el-card class="box-card">
    </el-card>
  </div>
</template>

<script>
import request from '@/utils/request'
import waves from '@/directive/waves' // 水波纹指令
import PanelGroup from './components/PanelGroup'

export default {
  directives: {
    waves
  },
  components: {
    PanelGroup
  },
  data() {
    return {
      listLoading: true,
      res: {
        sendNum: 1000,
        standbyNum: 1000,
        money: 1000,
        orderNum: 1000
      }
    }
  },
  created() {
    // this.fetchData()
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
