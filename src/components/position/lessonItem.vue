<template>
  <div class="lesson-item">
    <div class="lesson-left">
      <van-image src="" />
    </div>
    <div class="lesson-info">
      <p class="lesson-title">案例打扫房间拉时间段发了多少放家里卡萨丁发了就拉开京东方</p>
      <p class="subtitle">111人次学习-8课时</p>
      <p>
        <span>￥34</span>
        <span>原价￥34</span>
      </p>
    </div>
  </div>
</template>
<script lang="ts">
import { useRouter } from "vue-router";

export default {
  props: {
    info: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    const router = useRouter();
    const toLessonPage = () => {
      router.push({
        path: "/company"
      })
    };
    return {
      toLessonPage,
    };
  },
};
</script>
<style lang="scss" scoped>
.lesson-item{
  padding: 20px;
  margin-bottom: 7px;
  background-color: $white;
  .title {
    display: flex;
    justify-content: space-between;
    .title-left {
      font-weight: 900;
    }
    .title-right {
      color: $red;
      font-weight: 600;
    }
  }
  .subtitle {
    font-size: 14px;
    color: #999;
  }
}
</style>
