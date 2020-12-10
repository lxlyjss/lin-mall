<template>
  <div class="search-result-page">
    <div class="search-box">
      <van-search
        shape="round"
        v-model="searchValue"
        show-action
        placeholder="请输入搜索关键词"
      />
    </div>
    <div class="search-filter">
      <div class="filter-left">
        <span>搜职位</span>
        <span>搜公司</span>
      </div>
      <div class="filter-right">
        <span @click="showFilterCity">北京</span>
        <span @click="showFilterCompany">公司</span>
      </div>
    </div>
    <ul class="position-list">
      <position-item v-for="item in positionList" :key="item.id" :info="item" />
    </ul>
    <ul class="company-list">
      <company-item v-for="item in companyList" :key="item.id" :info="item" />
    </ul>
    <!-- 筛选公司 -->
    <filter-company v-model:value="filterCompanyShow" @onclose="onClose" />
    <filter-city v-model:value="filterCityShow" @onclose="onClose" />
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, onMounted, computed } from "vue";
import { Tag, Search, Popup } from "vant";
import positionItem from "@/components/home/positionItem.vue";
import companyItem from "@/components/home/companyItem.vue";
import filterCompany from "@/components/search/filterCompany.vue";
import FilterCity from "@/components/search/filterCity.vue";

export default {
  components: {
    VanSearch: Search,
    positionItem,
    companyItem,
    filterCompany,
    FilterCity,
  },
  setup() {
    const state = reactive({
      searchValue: "",
      hasSearched: false,
      filterCompanyShow: false,
      filterCityShow: false,
      positionList: [
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
      companyList: [
        {
          value: 3,
          companyId: 12,
          name: "新丰科技",
          labels: ["互联网", "信息"],
          logo:
            "http://oss.xinlinyun.top/ke/upload/image/2018/03/26/19927c9ea0a8a5b391fee204075c9bd0.png",
          financingStage: "A轮",
          size: "300-500",
          types: ["移动互联网", "企业服务"],
          id: 2,
        },
      ],
    });
    onMounted(() => {
      console.log("dd");
    });
    const showFilterCity = () => {
      state.filterCityShow = true;
      console.log("kkjk");
    };
    const showFilterCompany = () => {
      state.filterCompanyShow = true;
      console.log("kkjk");
    };
    const onClose = () => {
      state.filterCityShow = false;
      state.filterCompanyShow = false;
    };
    return {
      ...toRefs(state),
      showFilterCompany,
      showFilterCity,
      onClose,
    };
  },
};
</script>
<style lang="scss" scoped>
.search-result-page {
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
