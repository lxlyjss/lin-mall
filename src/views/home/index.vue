<template>
  <div class="home-page">
    <div class="header-box" :style="getStyle(headerOpacity)">
      <div class="header-left" :style="getTextStyle(headerOpacity)">
        <van-icon name="wap-home" />
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
      <van-swipe-item v-for="(item) in swipeList" :key="item.id">
        <van-image fit="cover" :src="item.image_url" @click="locationHref(item.connect_url)" />
      </van-swipe-item>
    </van-swipe>
    <div class="tab-container">
      <div class="left-btn" @click="toCategoryPage">
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
      <position-item v-for="item in jobList" :key="item.id" :info="item" />
    </ul>
    <div class="bottom-container">
      <van-button type="danger" round @click="toSearch">更多职位</van-button>
      <p>已经到底啦~看看别的吧</p>
    </div>
    <return-top />
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, onMounted, computed, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import positionItem from "@/components/home/positionItem.vue";
import { getHomeDataInfo } from "@/api/home/index";
import * as TYPES from "@/api/home/index.d";
import ReturnTop from "@/components/common/returnTop.vue";

interface State {
  tabActive: number;
  searchValue: string;
  swipeList: TYPES.banners[];
  jobList: any[];
  headerOpacity: number;
}
export default {
  components: {
    positionItem,
    ReturnTop,
  },
  setup() {
    const router = useRouter();
    const state: State = reactive({
      tabActive: 0,
      searchValue: "",
      swipeList: [],
      jobList: [],
      headerOpacity: 0,
    });
    const getHomeData = async () => {
      const {
        data: { code, data },
      } = await getHomeDataInfo();
      state.swipeList = data.banners;
      state.jobList = data.jobs;
      console.log(data)
    };
    const toSearch = () => {
      router.push("/search-index");
    };
    const onScroll = (e: any) => {
      const scrollTop: number =
        document.body.scrollTop || document.documentElement.scrollTop;
      const opacity: number = Math.floor((scrollTop / 150) * 100) / 100;
      state.headerOpacity = opacity > 1 ? 1 : opacity;
    };
    const getStyle = (opacity: number) => {
      return {
        backgroundColor: `rgba(${opacity * 255}, ${opacity * 255}, ${opacity *
          255}, ${opacity + 0.3})`,
        boxShadow: opacity >= 1 ? "0 0 5px 0 #ccc" : "",
      };
    };
    const getTextStyle = (opacity: number) => {
      return {
        color: `rgba(${(1 - opacity) * 255}, ${(1 - opacity) * 255}, ${(1 -
          opacity) *
          255}, 1)`,
      };
    };
    const locationHref = (url: string) => {
      location.href = url;
    }
    const toCategoryPage = () => {
      router.push("/search-category")
    }
    onMounted(() => {
      window.addEventListener("scroll", onScroll, false);
      getHomeData();
    });
    onUnmounted(() => {
      window.removeEventListener("scroll", onScroll, false);
    });
    return {
      ...toRefs(state),
      toSearch,
      getHomeData,
      getStyle,
      getTextStyle,
      toCategoryPage,
      locationHref
    };
  },
};
</script>
<style lang="scss" scoped src="./index.scss"></style>
