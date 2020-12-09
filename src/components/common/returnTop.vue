<template>
  <div class="return-top">
    <van-image
      v-if="show"
      @click="toTop"
      :src="require('@/assets/common/return-top.png')"
    />
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, onMounted } from "vue";

export default {
  setup() {
    const state = reactive({
      show: false,
    });
    const onScroll = (e: any) => {
      const scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;
      if (scrollTop > 300) {
        state.show = true;
      } else {
        state.show = false;
      }
    };
    const toTop = () => {
      window.scroll(0, 0);
    };
    onMounted(() => {
      window.addEventListener("scroll", onScroll, false);
    });
    return {
      ...toRefs(state),
      onScroll,
      toTop,
    };
  }
};
</script>
<style lang="scss" scoped>
.return-top {
  width: 40px;
  position: fixed;
  right: 10px;
  bottom: 40px;
}
</style>
