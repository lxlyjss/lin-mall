<template>
  <div class="company-item">
    <div class="company-content">
      <div class="content-left">
        <van-image :src="info.logo" />
      </div>
      <div class="content-right">
        <p class="title van-ellipsis">字节跳动</p>
        <p class="subtitle">
          面试评分<van-rate color="#ffd21e" v-model="info.value" />在职招聘<span>322</span>
        </p>
        <p class="subtitle">A轮|200人以上|移动互联网、金融</p>
      </div>
    </div>
    <div class="company-footer">
      <p class="footer-text">
        <van-icon
          color="#ed0020"
          name="fire"
        />正在热招234个<span>产品经理</span>相关职位
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
        display: flex;
        align-items: center;
        .van-rate {
          margin: 2px 2px 0;
        }
      }
    }
  }
  .company-footer {
    margin-top: 15px;
    padding-top: 10px;
    border-top: 1px solid #efefef;
    .footer-text {
      font-size: 11px;
      font-weight: 400;
      color: #999999;
      display: flex;
      align-items: center;
      span {
        color: #ed0020;
      }
    }
  }
}
</style>
