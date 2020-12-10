<template>
  <div class="lesson-item">
    <div class="lesson-left">
      <van-image src="" />
    </div>
    <div class="lesson-info">
      <p class="lesson-title">
        案例打扫房间拉时间段发了多少放家里卡萨丁发了就拉开京东方
      </p>
      <p class="subtitle">111人次学习-8课时</p>
      <p class="money">
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
        path: "/company",
      });
    };
    return {
      toLessonPage,
    };
  },
};
</script>
<style lang="scss" scoped>
.lesson-item {
  padding: 20px 5px;
  margin-bottom: 7px;
  background-color: $white;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #efefef;
  .lesson-left {
    margin-right: 12px;
    .van-image {
      width: 86px;
      height: 86px;
    }
  }
  .lesson-info {
    .lesson-title {
      font-size: 14px;
      font-weight: 400;
      color: #333333;
      line-height: 20px;
    }
    .subtitle {
      font-size: 11px;
      font-weight: 400;
      color: #999999;
      line-height: 20px;
    }
  }
  .subtitle {
    font-size: 14px;
    color: #999;
    margin-top: 6px;
  }
  .money {
    margin-top: 2px;
    span:first-of-type {
      font-size: 16px;
      font-weight: bold;
      color: #f21e2e;
      margin-right: 5px;
    }
    span:last-of-type {
      font-size: 10px;
      font-weight: 400;
      text-decoration: line-through;
      color: #999999;
      line-height: 20px;
    }
  }
}
</style>
