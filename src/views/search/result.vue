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
          @cancel="onCancel"
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
            <span class="has-text" v-if="filterCity.length">{{
              filterCity[2] || filterCity[1] || filterCity[0] || 地区
            }}</span>
            <span v-else>地区</span>
          </span>
          <span
            class="van-ellipsis"
            @click="showFilterPerson"
            v-if="currentTab == 0"
          >
            <span class="has-text" v-if="filterPerson.length">{{
              filterPerson.join("-")
            }}</span>
            <span v-else>要求</span>
          </span>
          <span class="van-ellipsis" @click="showFilterCompany">
            <span class="has-text" v-if="filterCompany.length">{{
              filterCompany.join("-")
            }}</span>
            <span v-else>公司</span>
          </span>
        </div>
      </div>
      <div class="filter-tag" v-if="filterTagsNames.length">
        <van-tag
          v-for="tag in filterTagsNames"
          @click="selectTag(tag)"
          :key="tag"
          :type="activeTag == tag ? 'primary' : 'default'"
          >{{ tag }}</van-tag
        >
      </div>
    </div>
    <div class="data-list">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        :finished-text="positionList.length > 0 ? '没有更多了' : ''"
        @load="onLoad"
      >
        <ul class="company-list" v-if="currentTab == 1">
          <company-item
            v-for="item in companyList"
            :key="item.id"
            :info="item"
            :searchVal="searchValue"
          />
        </ul>
        <ul class="position-list" v-else>
          <position-item
            v-for="item in positionList"
            :key="item.id"
            :info="item"
            type="search"
          />
        </ul>
        <van-empty
          v-if="
            currentTab == 0 && positionList.length == 0 && dataReady && !loading
          "
          description="暂无匹配的职位"
        ></van-empty>
        <van-empty
          v-if="
            currentTab == 1 && companyList.length == 0 && dataReady && !loading
          "
          description="暂无匹配的公司"
        ></van-empty>
      </van-list>
    </div>
    <!-- 筛选公司 -->
    <filter-company
      v-model:value="filterCompanyShow"
      @onclose="onClose"
      @complete="onCompanySubmit"
      ref="filterCompanyDom"
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
      :requirements="requirements"
      @onclose="onClose"
      @complete="onPersonSubmit"
    />
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, onMounted, computed, ref } from "vue";
import { Tag, Search, Popup, Toast } from "vant";
import positionItem from "@/components/home/positionItem.vue";
import companyItem from "@/components/home/companyItem.vue";
import filterCompany from "@/components/search/filterCompany.vue";
import FilterCity from "@/components/search/filterCity.vue";
import FilterPerson from "@/components/search/filterPerson.vue";
import { getCompany } from "@/api/search/company";
import { getPositionList } from "@/api/home/index";
import { debounce } from "@/utils/utils";
import { useRouter, useRoute } from "vue-router";
import { getFilterPerson } from "@/api/search/getEnum";

interface State {
  searchValue: string;
  page: number;
  hasSearched: boolean;
  activeTag: string;
  filterCompanyShow: boolean;
  filterCityShow: boolean;
  filterPersonShow: boolean;
  filterCompany: string[];
  filterPerson: string[];
  filterCity: string[];
  currentTab: number;
  filterTags: {
    name: string;
    id: number;
  }[];
  loading: boolean;
  finished: boolean;
  error: boolean;
  positionList: any;
  companyList: any;
  dataReady: boolean;
  requirements: any;
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
    const route = useRoute();
    const router = useRouter();
    const filterCompanyDom = ref(null);
    console.log(route.query);
    const state: State = reactive({
      searchValue: "",
      page: 0,
      hasSearched: false,
      activeTag: "不限",
      loading: false,
      finished: false,
      error: false,
      filterCompanyShow: false,
      filterCityShow: false,
      filterPersonShow: false,
      filterCompany: [],
      filterPerson: [],
      filterCity: [],
      currentTab: 0,
      filterTags: [],
      positionList: [],
      companyList: [],
      dataReady: false,
      requirements: {},
    });
    const filterTagsNames: any = computed(() => {
      console.log('3333', state.filterTags);
      return state.filterTags.map((item: any) => item.name);
    });
    const onCancel: Function = () => {
      router.replace("/home");
    };
    const getCityName: any = function(cityName: string) {
      console.log(/[北京市|天津市|重庆市|上海市]/g.test(cityName))
      return /[北京|天津|重庆|上海]/g.test(cityName) ? "市辖区" : cityName;
    }
    const getFilterId = (name: string) => {
      console.log('333333', filterCompanyDom.value)
      // @ts-ignore
      return filterCompanyDom.value.getAreaId(name);
    }
    const getCompanyList = async (flag?: boolean) => {
      console.log(getFilterId(state.filterCompany[2]).join(","))
      try {
        const {
          data: { data, code },
        } = await getCompany({
          keyword: state.searchValue,
          work_city: getCityName(state.filterCity[1]),
          work_province: state.filterCity[0],
          work_space: state.filterCity[2],
          page: state.page,
          per_page: 10,
          industry_attribute: getFilterId(state.filterCompany[2]).join(","),
          financing_level: state.filterCompany[1],
          office_worker_num: state.filterCompany[0]
        });
        console.log(data);
        if (code !== 200) {
          Toast("数据错误");
          state.error = true;
          return;
        }
        state.dataReady = true;
        state.companyList = flag
          ? state.companyList.concat(data.data)
          : data.data;
        state.finished = !data.next_page_url;
      } catch (err) {
        state.error = true;
        Toast("网络连接失败，请稍后重试！");
      }
    };
    const getPositionListData = async (flag?: boolean) => {
      try {
        const {
          data: { data, code },
        } = await getPositionList({
          name: state.searchValue,
          page: state.page,
          per_page: 10,
          work_city: getCityName(state.filterCity[1]),
          work_province: state.filterCity[0],
          work_space: state.filterCity[2],
          tag_id: state.activeTag,
          money: state.filterPerson[0],
          work_time: state.filterPerson[1],
          school_level: state.filterPerson[2],
          work_nature: state.filterPerson[3],
          office_worker_num: state.filterCompany[0],
          financing_level: state.filterCompany[1],
          industry_attribute: getFilterId(state.filterCompany[2]).join(",")
        });
        if (code !== 200) {
          Toast("数据错误");
          state.error = true;
          return;
        }
        /**
         * <div class="company-info" @click="toCompanyPage">
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
         */
        // @ts-ignore
        data.data.forEach((item) => {
          item.company = {
            logo: item.logo,
            name: item.simple_name,
            financing_level: item.financing_level,
            office_worker_num: item.office_worker_num,
            tags: item.company_tags,
          };
        });
        state.dataReady = true;
        state.positionList = flag
          ? state.positionList.concat(data.data)
          : data.data;
        state.finished = !data.next_page_url;
      } catch (err) {
        state.error = true;
        Toast("网络连接失败，请稍后重试！");
      }
    };
    const getFilterPersonData = async () => {
      const {
        data: { data, code },
      } = await getFilterPerson();
      console.log(data);
      if (code !== 200) {
        Toast("接收数据失败！");
        return;
      }
      state.requirements = data.requirements;
      state.filterTags = data.tags;
    };
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
      console.log("close");
      state.filterCityShow = false;
      state.filterCompanyShow = false;
      state.filterPersonShow = false;
    };
    const changeTag = (val: number) => {
      state.currentTab = val;
      state.filterCompany = [];
      state.filterPerson = [];
      state.filterCity = [];
      state.activeTag = "";
      onRefresh();
    };
    const onCompanySubmit = (value: string[]) => {
      console.log(value);
      if (!value[0] && !value[1] && !value[2]) {
        state.filterCompany = [];
      } else {
        state.filterCompany = value;
      }
      onRefresh();
    };
    const onCitySubmit = (value: string[]) => {
      console.log(value);
      state.filterCity = value;
      onRefresh();
    };
    const onPersonSubmit = (value: string[]) => {
      console.log(value);
      if (!value[0] && !value[1] && !value[2] && !value[3]) {
        state.filterPerson = [];
      } else {
        state.filterPerson = value;
      }
      onRefresh();
    };
    const selectTag = (val: string) => {
      if (state.activeTag == val) {
        state.activeTag = "";
      } else {
        state.activeTag = val;
      }
      onRefresh();
    };
    const getData = async (flag?: boolean) => {
      if (!state.searchValue) return;
      if (state.currentTab == 0) {
        await getPositionListData(flag);
      } else {
        await getCompanyList(flag);
      }
    };
    const onLoad = async () => {
      state.page++;
      state.loading = true;
      await getData(true);
      state.loading = false;
    };
    const onRefresh = async () => {
      state.page = 1;
      state.loading = true;
      await getData();
      state.loading = false;
    };
    const onSearch = debounce(onRefresh, 1000);
    state.searchValue = route.query.searchVal as string;
    getFilterPersonData();
    return {
      ...toRefs(state),
      showFilterCompany,
      showFilterCity,
      showFilterPerson,
      filterTagsNames,
      onClose,
      changeTag,
      onCompanySubmit,
      onCitySubmit,
      onPersonSubmit,
      onSearch,
      selectTag,
      onLoad,
      onCancel,
      getFilterId,
      filterCompanyDom
    };
  },
};
</script>
<style lang="scss" scoped>
.search-result-page {
  background-color: $gray-1;
  position: relative;
  min-height: 100vh;
  padding-top: 150px;
  .search-header {
    position: fixed;
    top: 0;
    width: 375px;
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
        max-width: 60px;
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
      min-width: 40px;
      justify-content: center;
      padding: 3px 5px;
      margin-right: 10px;
      font-size: 10px;
      background-color: #f5f5f5;
      color: #999999;
      &:last-of-type {
        margin-right: 30px;
      }
      &--primary {
        background-color: rgba(46, 70, 248, 0.7);
        color: #fff;
      }
    }
  }
}
</style>
