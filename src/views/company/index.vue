<template>
  <div class="home-page">
    <div class="header-container">
      <van-swipe loop autoplay="3000" indicator-color="#fff">
        <van-swipe-item v-for="(item, index) in swipeList" :key="index">
          <van-image fit="cover" :src="item.imgUrl" />
        </van-swipe-item>
      </van-swipe>
      <div class="image-count">
        <van-image :src="require('@/assets/common/image.png')" />
        5
      </div>
    </div>
    <div class="body">
      <div class="company-info">
        <div class="info-left">
          <p>字节跳动</p>
          <p>北京|c轮 200人以上|文娱|内容</p>
        </div>
        <div class="info-right">
          <van-image src="" />
        </div>
      </div>
      <p class="title">公司介绍</p>
      <div class="labels">
        <van-tag v-for="tag in company.labels" :key="tag" plain type="default">{{
          tag
        }}</van-tag>
      </div>
      <div></div>
    </div>
    <div class="bottom-container">
      <p>已经到底啦~看看别的吧</p>
    </div>
    <return-top />
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { Swipe, SwipeItem, Image, Tag } from "vant";
import infoItem from "@/components/home/infoItem.vue";
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
    VanSwipe: Swipe,
    VanSwipeItem: SwipeItem,
    VanImage: Image,
    ReturnTop,
    VanTag: Tag
  },
  setup() {
    const router = useRouter();
    const state: State = reactive({
      tabActive: 0,
      searchValue: "",
      swipeList: [],
      infoList: [],
      company: {
        labels: ["标签1", "biadj", "dkjkfdjka"]
      }
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
  .header-container {
    position: relative;
    .image-count {
      left: 20px;
      position: absolute;
      bottom: 20px;
      color: #fff;
      .van-image {
        width: 20px;
        height: 15px;
      }
    }
  }

  .van-swipe {
    width: 100%;
    height: 160px;
    .van-image {
      width: 100%;
      height: 100%;
    }
  }
  .body {
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    background-color: #fff;
    margin-top: -15px;
    position: relative;
    overflow: hidden;
    z-index: 9;
    padding: 15px;
    .company-info {
      display: flex;
      justify-content: space-between;
      .info-right {
        .van-image {
          width: 30px;
          height: 30px;
        }
      }
    }
    .title {
      margin-top: 30px;
    }
    .labels {
      /deep/ .van-tag {
        background-color: #fff;
        color: #999;
      }
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
