<template>
  <div class="app-container">
    <panel-group :items=res></panel-group>

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
      res: [
        { name: '已发快递', icon: 'express-send', val: 1000 },
        { name: '待发快递', icon: 'express-wait', val: 2000 },
        { name: '订单数', icon: 'order', val: 3000 },
        { name: '余额', icon: 'money', val: 1000 }
      ]
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
