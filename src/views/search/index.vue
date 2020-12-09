<template>
  <div class="home-page">
    <div class="search-box">
      <van-search
        shape="round"
        v-model="searchValue"
        show-action
        placeholder="请输入搜索关键词"
      />
    </div>
    <div class="search-tags">
      <div class="history-search">
        <p class="title">历史搜索</p>
        <div class="tags">
          <van-tag>美术宝</van-tag>
        </div>
      </div>
      <div class="hot-position">
        <p class="title">热门职位</p>
        <div class="tags">
          <van-tag>美术宝</van-tag>
        </div>
      </div>
      <div class="hot-company">
        <p class="title">热门公司</p>
        <div class="tags">
          <van-tag>美术宝</van-tag>
        </div>
      </div>
    </div>
    <ul class="info-list" v-if="hasSearched">
      <info-item v-for="item in infoList" :key="item.id" :info="item" />
    </ul>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, onMounted, computed } from "vue";
import { Tag, Search } from "vant";
import infoItem from "@/components/home/infoItem.vue";

export default {
  components: {
    VanSearch: Search,
    infoItem,
    VanTag: Tag
  },
  setup() {
    const state = reactive({
      searchValue: "",
      hasSearched: false,
      infoList: [
        {
          position: "产品经理",
          city: "北京",
          address: "甜水园",
          experience: "1-3年",
          needEducation: "本科",
          company: {
            companyId: 12,
            name: "新丰科技",
            labels: ["互联网", "信息"],
            logo:
              "http://oss.xinlinyun.top/ke/upload/image/2018/03/26/19927c9ea0a8a5b391fee204075c9bd0.png",
            financingStage: "A轮",
            size: "300-500",
            types: ["移动互联网", "企业服务"],
          },
          minSalary: "10",
          maxSalary: "20",
          id: 1,
        },
        {
          position: "产品经理",
          city: "北京",
          address: "甜水园",
          experience: "1-3年",
          needEducation: "本科",
          company: {
            companyId: 12,
            name: "新丰科技",
            labels: ["互联网", "信息"],
            logo:
              "http://oss.xinlinyun.top/ke/upload/image/2018/03/26/19927c9ea0a8a5b391fee204075c9bd0.png",
            financingStage: "A轮",
            size: "300-500",
            types: ["移动互联网", "企业服务"],
          },
          minSalary: "10",
          maxSalary: "20",
          id: 2,
        },
      ],
    });
    onMounted(() => {
      console.log("dd");
    });
    return {
      ...toRefs(state),
    };
  },
};
</script>
<style lang="scss" scoped>
.home-page {
  background-color: $gray-1;
  position: relative;
  min-height: 100vh;
  .search-box {
    width: calc(100% - 20px);
    background-color: $white;
    padding: 10px;
    border-bottom: 1px solid $gray-3;
  }
  .search-tags {
    padding: 20px;
    .title {
      font-weight: 600;
      margin-bottom: 5px;
    }
    .tags {
      margin-bottom: 20px;
      .van-tag {
        padding: 2px 4px;
        background-color: $gray-3;
        color: $gray-6;
      }
    }
  }
}
</style>
