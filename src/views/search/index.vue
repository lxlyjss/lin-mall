<template>
  <div class="home-page">
    <div class="search-box">
      <van-search
        shape="round"
        v-model="searchValue"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
      />
    </div>
    <div class="search-category">
      <span>按分类搜索</span>
      <span @click="toCategoryPage">护士/护理 <van-icon name="arrow"/></span>
    </div>
    <div class="search-tags">
      <div class="history-search" v-if="historyList.length">
        <p class="title">历史搜索</p>
        <div class="tags">
          <van-tag
            v-for="item in historyList"
            :key="item"
            @click="selectTag(item)"
            >{{ item }}</van-tag
          >
        </div>
      </div>
      <div class="hot-position" v-if="hotJobs.length">
        <p class="title">热门职位</p>
        <div class="tags">
          <van-tag v-for="item in hotJobs" :key="item" @click="selectTag(item)"
            >{{ item }}</van-tag
          >
        </div>
      </div>
      <div class="hot-company" v-if="hotJobs.length">
        <p class="title">热门公司</p>
        <div class="tags">
          <van-tag
            v-for="item in hotCompany"
            :key="item"
            @click="selectTag(item)"
            >{{ item }}</van-tag
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import positionItem from "@/components/home/positionItem.vue";
import { getCategory } from "@/api/search/category";
import { getCategoryRes } from "@/api/search/category.d";
import { Toast } from "vant";

interface State {
  searchValue: string;
  historyList: string[];
  hotJobs: string[];
  hotCompany: string[];
}
export default {
  components: {
    positionItem,
  },
  setup() {
    const router = useRouter();
    const state: State = reactive({
      searchValue: "",
      historyList: [],
      hotJobs: [],
      hotCompany: [],
    });
    const toCategoryPage = () => {
      router.push("/search-category");
    };
    const onSearch = () => {
      router.push({
        path: "/search-result",
        query: {
          searchVal: state.searchValue,
        },
      });
      setHistoryData();
    };
    const onCancel: Function = () => {
      router.replace("/home")
    }
    const getCategoryData = async () => {
      let {
        data: { data, code },
      } = await getCategory();
      console.log(data);
      if (code !== 200) {
        Toast("数据错误");
        return;
      }
      state.hotJobs = data.hot_jobs
      state.hotCompany = data.hot_companies
    };
    const setHistoryData = () => {
      let historyData = getHistoryData();
      if (!historyData.some((item: string) => item == state.searchValue)) {
        historyData.push(state.searchValue);
      }
      localStorage.setItem("historyList", JSON.stringify(historyData));
    };
    const getHistoryData = () => {
      const historyData = localStorage.getItem("historyList");
      if (historyData) {
        let historyDataObj = JSON.parse(historyData);
        return historyDataObj;
      }
      return [];
    };
    const selectTag = (val: string) => {
      router.push({
        path: "/search-result",
        query: {
          searchVal: val,
        },
      });
    };
    onMounted(() => {
      console.log("dd");
      state.historyList = getHistoryData();
    });
    getCategoryData()
    return {
      ...toRefs(state),
      toCategoryPage,
      onSearch,
      selectTag,
      onCancel
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
  .search-category {
    height: 45px;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    margin-bottom: 7px;
    span:first-of-type {
      font-size: 15px;
      font-weight: bold;
      color: #333333;
    }
    span:last-of-type {
      font-size: 14px;
      font-weight: 400;
      color: #b5b7b9;
      display: flex;
      align-items: center;
    }
  }
  .search-tags {
    padding: 20px;
    background-color: #fff;
    .title {
      font-weight: 600;
      margin-bottom: 19px;
    }
    .tags {
      margin-bottom: 20px;
      .van-tag {
        background: #f8f8f8;
        border-radius: 20px;
        padding: 8px 12px;
        color: $gray-6;
        font-size: 13px;
        line-height: 13px;
        font-weight: 400;
        color: #666666;
        margin-right: 10px;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
