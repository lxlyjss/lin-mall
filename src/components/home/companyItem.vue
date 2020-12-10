<template>
  <div class="company-item">
    <div class="company-content">
      <div class="content-left">
        <van-image :src="info.logo" />
      </div>
      <div class="content-right">
        <p class="title">字节跳动</p>
        <p class="subtitle">
          面试评分<van-rate v-model="info.value" />在职招聘<span>322</span>
        </p>
        <p class="subtitle">A轮|200人以上|移动互联网、金融</p>
      </div>
    </div>
    <div class="company-footer">
      <p class="footer-text">
        <van-icon name="fire" />正在热招234个<span>产品经理</span>相关职位
      </p>
    </div>
  </div>
</template>
<script lang="ts">
import { reactive } from "vue";
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
    const toCompanyPage = () => {
      router.push({
        path: "/company",
      });
    };
    return {
      toCompanyPage,
    };
  },
};
</script>
<style lang="scss" scoped>
.company-item {
  padding: 20px;
  margin-bottom: 7px;
  background-color: $white;
  .company-content {
    display: flex;
    .content-left {
      width: 55px;
      height: 55px;
      margin-right: 10px;
      .van-image {
        width: 100%;
        height: 100%;
      }
    }
    .content-right {
      .title {
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 2px;
      }
      .subtitle {
        font-size: 11px;
        font-weight: 400;
        color: #999999;
      }
    }
    .company-footer {
      .footer-text {
        font-size: 11px;
        font-weight: 400;
        color: #999999;
      }
    }
  }
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
  .labels {
    .van-tag {
      margin-right: 10px;
      padding: 2px 4px;
      font-size: 10px;
      color: #999;
      background-color: #f0f0f0;
    }
  }
  .company-info {
    display: flex;
    justify-content: flex-start;
    margin-top: 20px;
    align-items: center;
    .logo {
      width: 40px;
      height: 40px;
      .van-image {
        width: 40px;
        height: 40px;
      }
    }
    .right-info {
      font-size: 14px;
      margin-left: 10px;
    }
  }
}
</style>
