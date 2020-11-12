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
import { getBannerList } from "@/api/home/index";

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
    const state = reactive({
      tabActive: 0,
      searchValue: "",
      swipeList: [
        {
          imgUrl:
            "http://oss.xinlinyun.top/ke/upload/image/2018/03/26/19927c9ea0a8a5b391fee204075c9bd0.png",
        },
        {
          imgUrl:
            "http://oss.xinlinyun.top/ke/upload/image/2018/03/26/19927c9ea0a8a5b391fee204075c9bd0.png",
        },
        {
          imgUrl:
            "http://oss.xinlinyun.top/ke/upload/image/2018/03/26/19927c9ea0a8a5b391fee204075c9bd0.png",
        },
        {
          imgUrl:
            "http://oss.xinlinyun.top/ke/upload/image/2018/03/26/19927c9ea0a8a5b391fee204075c9bd0.png",
        },
      ],
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
    const getBanner = async () => {
      const {
        data: { msg, status, data },
      } = await getBannerList();
      state.swipeList = data.list;
    };
    const toSearch = () => {
      router.push("/search");
    };
    onMounted(() => {
      getBanner();
    });
    return {
      ...toRefs(state),
      toSearch,
      getBannerList,
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
