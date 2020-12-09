<template>
  <div class="info-item">
    <div class="title">
      <div class="title-left">{{ info.position }}</div>
      <div class="title-right">
        <span>{{ info.minSalary }}</span
        >-<span>{{ info.maxSalary }}</span
        >K
      </div>
    </div>
    <div class="subtitle">
      {{ info.city }} | {{ info.address }} | {{ info.experience }} |
      {{ info.needEducation }}
    </div>
    <div class="labels">
      <van-tag v-for="tag in info.company.labels" :key="tag" type="default">{{
        tag
      }}</van-tag>
    </div>
    <div class="company-info" @click="toCompanyPage">
      <div class="logo">
        <van-image :src="info.company.logo" />
      </div>
      <div class="right-info">
        <p>{{ info.company.name }}</p>
        <p class="c-999">
          {{ info.company.financingStage }} | {{ info.company.size }} |
          {{ info.company.types.join("，") }}
        </p>
      </div>
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
    const toCompanyPage = () => {
      router.push({
        path: "/company"
      })
    };
    return {
      toCompanyPage,
    };
  },
};
</script>
<style lang="scss" scoped>
.info-item {
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
