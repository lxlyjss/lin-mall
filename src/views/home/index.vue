<template>
  <div class="home-page">
    <div class="header-box">
      <div class="header-left">
        <van-image :src="require('@/assets/home/home.png')" />
        中民知慧教育
      </div>
      <div class="search-box" @click="toSearch">
        <van-search
          shape="round"
          readonly
          v-model="searchValue"
          placeholder="请输入搜索关键词"
        />
      </div>
    </div>
    <van-swipe loop autoplay="3000" indicator-color="#fff">
      <van-swipe-item v-for="(item, index) in swipeList" :key="index">
        <van-image fit="cover" :src="item.imgUrl" />
      </van-swipe-item>
    </van-swipe>
    <div class="tab-container">
      <div class="left-btn">
        职位分类 <van-icon name="arrow" color="#333"></van-icon>
      </div>
      <div class="right-btn">
        <van-tabs v-model="tabActive" title-inactive-color="#b5b7bb">
          <van-tab title="推荐"></van-tab>
          <van-tab title="最新"></van-tab>
        </van-tabs>
      </div>
    </div>
    <ul class="info-list">
      <position-item v-for="item in infoList" :key="item.id" :info="item" />
    </ul>
    <div class="bottom-container">
      <van-button type="danger" round>更多职位</van-button>
      <p>已经到底啦~看看别的吧</p>
    </div>
    <return-top />
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import positionItem from "@/components/home/positionItem.vue";
import { getBannerList, getPositionList } from "@/api/home/index";
import ReturnTop from "@/components/common/returnTop.vue";

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
    positionItem,
    ReturnTop
  },
  setup() {
    const router = useRouter();
    const state: State = reactive({
      tabActive: 0,
      searchValue: "",
      swipeList: [],
      infoList: [],
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
      console.log(data);
      state.infoList = data.list;
    };
    const toSearch = () => {
      router.push("/search-index");
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
      getPosition,
    };
  },
};
</script>
<style lang="scss" scoped>
.home-page {
  background-color: $gray-1;
  position: relative;
  min-height: 100vh;
  .header-box {
    width: 100%;
    box-sizing: border-box;
    height: 41px;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: space-between;
    padding: 0 15px;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 4;

    .header-left {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: #fff;
      width: 60%;
      font-weight: 900;
      .van-image {
        width: 20px;
        height: 20px;
        margin-right: 5px;
      }
    }
    .search-box {
      width: 40%;
      background-color: transparent;
      .van-search {
        width: 140px;
        height: 20px;
        background-color: transparent;
        transform: scale(0.7) translateX(20px);
      }
    }
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
    color: #333;
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
          background-color: #1989fa;
          bottom: 24px;
        }
      }
    }
  }
  .bottom-container {
    width: 100%;
    padding: 15px;
    box-sizing: border-box;
    .van-button {
      width: 100%;
      background-color: red;
    }
    p {
      font-size: 10px;
      color: #d2d0d0;
      text-align: center;
      margin-top: 60px;
    }
  }
}
</style>
