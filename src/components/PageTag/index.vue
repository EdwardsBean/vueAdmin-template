<template>
  <div style="display: flex;justify-content: flex-end">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="items.page"
      :page-sizes="[10,20,50, 100, 200, 400, 500]"
      :page-size="items.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="items.total">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'PageTag',
    props: ['items'],
    methods: {
      handleSizeChange(val) {
        var page = 1
        var size = val
        this.$emit('reload', { size, page })
      },
      handleCurrentChange(val) {
        var size = this.items.pageSize
        var page = val
        this.$emit('reload', { size, page })
      }
    }
  }
</script>
