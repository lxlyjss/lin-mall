<template>
  <van-list
    v-model:loading="state.loading"
    :finished="state.finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
  </van-list>
</template>
<script>
export default {
  
}
</script>
<style lang="scss" scoped>

</style>