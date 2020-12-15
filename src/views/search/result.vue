<template>
  <div class="search-result-page">
    <div class="search-header">
      <div class="search-box">
        <van-search
          shape="round"
          v-model="searchValue"
          show-action
          placeholder="请输入搜索关键词"
          @input="onSearch"
        />
      </div>
      <div class="search-filter">
        <div class="filter-left">
          <span
            class="tab-item"
            :class="{ active: currentTab == 0 }"
            @click="changeTag(0)"
            >搜职位</span
          >
          <span
            class="tab-item"
            :class="{ active: currentTab == 1 }"
            @click="changeTag(1)"
            >搜公司</span
          >
        </div>
        <div class="filter-right">
          <span class="van-ellipsis" @click="showFilterCity">
            <span class="has-text" v-if="filterCity">{{ filterCity }}</span>
            <span v-else>地区</span>
          </span>
          <span class="van-ellipsis" @click="showFilterPerson">
            <span class="has-text" v-if="filterPerson">{{ filterPerson }}</span>
            <span v-else>要求</span>
          </span>
          <span class="van-ellipsis" @click="showFilterCompany">
            <span class="has-text" v-if="filterCompany">{{
              filterCompany
            }}</span>
            <span v-else>公司</span>
          </span>
        </div>
      </div>
      <div class="filter-tag">
        <van-tag v-for="tag in filter.labels" :key="tag" type="primary">{{
          tag
        }}</van-tag>
      </div>
    </div>
    <ul class="position-list">
      <position-item v-for="item in positionList" :key="item.id" :info="item" />
    </ul>
    <ul class="company-list">
      <company-item v-for="item in companyList" :key="item.id" :info="item" />
    </ul>
    <!-- 筛选公司 -->
    <filter-company
      v-model:value="filterCompanyShow"
      @onclose="onClose"
      @complete="onCompanySubmit"
    />
    <!-- 筛选地区 -->
    <filter-city
      v-model:value="filterCityShow"
      @onclose="onClose"
      @complete="onCitySubmit"
    />
    <!-- 筛选人的要求 -->
    <filter-person
      v-model:value="filterPersonShow"
      @onclose="onClose"
      @complete="onPersonSubmit"
    />
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, onMounted, computed } from "vue";
import { Tag, Search, Popup, Toast } from "vant";
import positionItem from "@/components/home/positionItem.vue";
import companyItem from "@/components/home/companyItem.vue";
import filterCompany from "@/components/search/filterCompany.vue";
import FilterCity from "@/components/search/filterCity.vue";
import FilterPerson from "@/components/search/filterPerson.vue";
import { getCompany } from "@/api/search/company";
import { throttle } from "@/utils/utils";

interface State {
  searchValue: string;
  page: number;
  hasSearched: boolean;
  filterCompanyShow: boolean;
  filterCityShow: boolean;
  filterPersonShow: boolean;
  filterCompany: string;
  filterPerson: string;
  filterCity: string;
  currentTab: number;
  filter: {
    labels: string[];
  };
  positionList: any;
  companyList: any;
}
export default {
  components: {
    VanSearch: Search,
    positionItem,
    companyItem,
    filterCompany,
    FilterCity,
    FilterPerson,
  },
  setup() {
    const state: State = reactive({
      searchValue: "",
      page: 1,
      hasSearched: false,
      filterCompanyShow: false,
      filterCityShow: false,
      filterPersonShow: false,
      filterCompany: "",
      filterPerson: "",
      filterCity: "",
      currentTab: 0,
      filter: {
        labels: [
          "不限",
          "地铁",
          "学区房",
          "不限",
          "地铁",
          "学区房",
          "不限",
          "地铁",
          "学区房",
        ],
      },
      positionList: [],
      companyList: [],
    });
    onMounted(() => {
      console.log("dd");
    });
    const getPositionList = async () => {
      const {
        data: { data, code },
      } = await getCompany({
        keyword: state.searchValue,
        city_name: state.filterCity,
        page: state.page,
        per_page: 10,
      });
      console.log(data);
      if (code !== 200) {
        Toast("数据错误");
        return;
      }
    };
    getPositionList();
    const showFilterCity = () => {
      state.filterCityShow = true;
    };
    const showFilterCompany = () => {
      state.filterCompanyShow = true;
    };
    const showFilterPerson = () => {
      state.filterPersonShow = true;
    };
    const onClose = () => {
      state.filterCityShow = false;
      state.filterCompanyShow = false;
    };
    const changeTag = (val: number) => {
      state.currentTab = val;
    };
    const onCompanySubmit = (value: string[]) => {
      console.log(value);
      state.filterCompany = value.join("-");
    };
    const onCitySubmit = (value: string[]) => {
      console.log(value);
      state.filterCity = value.join("-");
    };
    const onPersonSubmit = (value: string[]) => {
      console.log(value);
      state.filterPerson = value.join("-");
    };

    const onSearch = () => {
      console.log("input")
      throttle(getPositionList, 1000);
    };
    return {
      ...toRefs(state),
      showFilterCompany,
      showFilterCity,
      showFilterPerson,
      onClose,
      changeTag,
      onCompanySubmit,
      onCitySubmit,
      onPersonSubmit,
      onSearch,
    };
  },
};
</script>
<style lang="scss" scoped>
.search-result-page {
  background-color: $gray-1;
  position: relative;
  min-height: 100vh;
  padding-top: 134px;
  .search-header {
    position: fixed;
    top: 0;
    width: 100%;
    left: 0;
    background-color: #fff;
    z-index: 99;
  }
  .search-box {
    width: calc(100% - 20px);
    background-color: $white;
    padding: 10px;
    border-bottom: 1px solid $gray-3;
  }
  .search-filter {
    height: 48px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
    background-color: #fff;
    border-bottom: 1px solid rgba(114, 114, 114, 0.12);
    .filter-left {
      .tab-item {
        font-size: 14px;
        font-weight: 400;
        color: #b5b7b9;
        margin-right: 20px;
        &.active {
          font-size: 15px;
          font-weight: bold;
          color: #333333;
        }
      }
    }
    .filter-right {
      display: flex;
      .van-ellipsis {
        font-size: 11px;
        font-weight: 400;
        color: #b5b7b9;
        margin-left: 15px;
        max-width: 70px;
        .has-text {
          color: red;
        }
      }
    }
  }
  .filter-tag {
    padding: 10px 20px;
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    box-shadow: 0 2px 3px 0 #ddd;
    .van-tag {
      min-width: 30px;
      justify-content: center;
      padding: 3px 7px;
      margin-right: 10px;
      font-size: 10px;
      &:last-of-type {
        margin-right: 30px;
      }
    }
  }
}
</style>
