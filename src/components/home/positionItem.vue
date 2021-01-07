<template>
  <div class="position-item">
    <div class="position-detail" @click="toPositionDetail">
      <div class="title">
        <div class="title-left">{{ info.name }}</div>
        <div class="title-right">
          <span>{{ info.money_start }}</span
          >-<span>{{ info.money_end }}</span
          >K
        </div>
      </div>
      <div class="subtitle">
        {{ info.work_city }} | {{ info.work_space }} | {{ info.work_time }} |
        {{ info.school_level }}
      </div>
      <div class="labels">
        <van-tag v-for="tag in info.tags" :key="tag" type="default">{{
          tag
        }}</van-tag>
      </div>
    </div>
    <div class="company-info" @click="toCompanyPage">
      <div class="logo">
        <van-image :src="info.company.logo" />
      </div>
      <div class="right-info">
        <p>{{ info.company.name }}</p>
        <p class="c-999">
          {{ info.company.financing_level }} | {{ info.company.office_worker_num }} |
          {{ info.company.tags.join("，") }}
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
    type: String
  },
  setup(props: any) {
    const router = useRouter();
    const toCompanyPage = () => {
      if (props.type == "search") {
        toPositionDetail();
        return;
      }
      router.push({
        path: "/company",
        query: {
          id: props.info.company.id
        }
      });
    };
    const toPositionDetail = () => {
      router.push({
        path: "/position-detail",
        query: {
          id: props.info.id
        }
      })
    }
    return {
      toCompanyPage,
      toPositionDetail
    };
  },
};
</script>
<style lang="scss" scoped>
.position-item {
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
      color: #f21e2e;
      font-weight: 600;
    }
  }
  .subtitle {
    font-size: 11px;
    color: #999;
  }
  .labels {
    .van-tag {
      margin-right: 10px;
      padding: 2px 6px;
      font-size: 10px;
      color: #999;
      background-color: #f8f8f8;
    }
  }
  .company-info {
    display: flex;
    justify-content: flex-start;
    margin-top: 20px;
    align-items: center;
    .logo {
      width: 32px;
      height: 32px;
      .van-image {
        width: 32px;
        height: 32px;
      }
    }
    .right-info {
      font-size: 14px;
      margin-left: 10px;
      .c-999 {
        font-size: 11px;
      }
    }
  }
}
</style>
