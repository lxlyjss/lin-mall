<template>
  <div class="home-page">
    <div class="search-box" @click="toSearch">
      <van-search
        shape="round"
        readonly
        v-model="searchValue"
        placeholder="请输入搜索关键词"
      />
    </div>
    <van-swipe loop autoplay="3000">
      <van-swipe-item v-for="(item, index) in swipeList" :key="index">
        <van-image fit="cover" :src="item.imgUrl" />
      </van-swipe-item>
    </van-swipe>
    <div class="tab-container">
      <div class="left-btn">
        职位分类 <van-icon name="arrow" color="#666"></van-icon>
      </div>
      <div class="right-btn">
        <van-tabs v-model="tabActive">
          <van-tab title="推荐"></van-tab>
          <van-tab title="最新"></van-tab>
        </van-tabs>
      </div>
    </div>
    <ul class="info-list">
      <info-item v-for="item in infoList" :key="item.id" :info="item" />
    </ul>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { Swipe, SwipeItem, Image, Search, Icon, Tab, Tabs } from "vant";
import infoItem from "@/components/home/infoItem.vue";
import { getBannerList, getPositionList } from "@/api/home/index";

interface State {
  tabActive: number;
  searchValue: string;
  swipeList: {
    imgUrl: string;
    id: number;
    title: string;
  }[];
  infoList: any[];
}
export default {
  components: {
    VanSwipe: Swipe,
    VanSwipeItem: SwipeItem,
    VanImage: Image,
    VanSearch: Search,
    VanIcon: Icon,
    VanTab: Tab,
    VanTabs: Tabs,
    infoItem,
  },
  setup() {
    const router = useRouter();
    const state: State = reactive({
      tabActive: 0,
      searchValue: "",
      swipeList: [],
      infoList: []
    });
    const getBanner = async () => {
      const {
        data: { msg, status, data },
      } = await getBannerList();
      state.swipeList = data.list;
    };
    const getPosition = async () => {
      const {
        data: { msg, status, data },
      } = await getPositionList();
      console.log(data)
      state.infoList = data.list;
    };
    const toSearch = () => {
      router.push("/search");
    };
    console.log(JSON.stringify(state.infoList));
    onMounted(() => {
      getBanner();
      getPosition();
    });
    return {
      ...toRefs(state),
      toSearch,
      getBannerList,
      getPosition
    };
  },
};
</script>
<style lang="scss" scoped>
.home-page {
  background-color: $gray-2;
  position: relative;
  min-height: 100vh;
  .search-box {
    width: calc(100% - 40px);
    background-color: transparent;
    padding: 10px;
    position: absolute;
    z-index: 2;
    left: 0;
    right: 0;
    margin: 0 auto;
  }
  .van-swipe {
    width: 100%;
    height: 200px;
    .van-image {
      width: 100%;
      height: 100%;
    }
  }
  .tab-container {
    background-color: $white;
    color: #666;
    padding: 15px 15px 0;
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    .left-btn {
      display: flex;
      align-items: center;
    }
    .right-btn {
      /deep/ .van-tabs__nav {
        .van-tab {
          width: 50px;
        }
        .van-tabs__line {
          width: 20px;
        }
      }
    }
  }
}
</style>
