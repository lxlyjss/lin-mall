<template>
  <div class="home-page">
    <div class="header-box" :style="getStyle(headerOpacity)">
      <div
        class="header-left"
        :style="getTextStyle(headerOpacity)"
        @click="toZhongMinHome"
      >
        <van-icon name="wap-home" />
        中民知慧教育
      </div>
      <div class="search-box" @click="toSearch">
        <van-search
          shape="round"
          readonly
          v-model="searchValue"
          placeholder="职位搜索"
        />
      </div>
    </div>
    <van-swipe loop autoplay="3000" indicator-color="#fff">
      <van-swipe-item v-for="item in swipeList" :key="item.id">
        <van-image
          fit="cover"
          :src="item.image_url"
          @click="locationHref(item.connect_url)"
        />
      </van-swipe-item>
    </van-swipe>
    <div class="tab-container">
      <div class="left-btn" @click="toCategoryPage">
        职位分类 <van-icon name="arrow" color="#333"></van-icon>
      </div>
      <div class="right-btn">
        <van-tabs
          v-model:active="tabActive"
          title-inactive-color="#b5b7bb"
          @change="onTabChange"
        >
          <van-tab title="推荐"></van-tab>
          <van-tab title="最新"></van-tab>
        </van-tabs>
      </div>
    </div>
    <van-list
      v-model:loading="loading"
      :finished="finished"
      :finished-text="jobList.length > 0 ? '没有更多了' : ''"
      @load="onLoadMore"
    >
      <ul class="info-list">
        <position-item v-for="item in jobList" :key="item.id" :info="item" />
      </ul>
    </van-list>
    <div class="bottom-container">
      <!-- <van-button type="danger" round @click="toSearch">更多职位</van-button>
      <p>已经到底啦~看看别的吧</p> -->
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
import { setWechatShareInfo } from "@/utils/utils";

interface State {
  tabActive: number;
  searchValue: string;
  swipeList: TYPES.banners[];
  jobList: any[];
  headerOpacity: number;
  page: number;
  loading: boolean;
  finished: boolean;
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
      page: 0,
      loading: true,
      finished: false,
    });
    const getHomeData = async () => {
      const {
        data: { code, data },
      } = await getHomeDataInfo({
        keyword: state.tabActive == 0 ? 1 : 2,
      });
      state.swipeList = data.banners;
      // state.jobList = data.jobs;
      console.log(data);
    };
    const onLoadList = async (flag: boolean) => {
      const {
        data: { data },
      } = await getHomeDataInfo({
        keyword: state.tabActive == 0 ? 1 : 2,
        page: state.page,
        page_num: 5,
      });
      flag
        ? (state.jobList = state.jobList.concat(data.jobs.data))
        : (state.jobList = data.jobs.data);
      data?.jobs?.next_page_url
        ? (state.finished = false)
        : (state.finished = true);
    };

    const onLoadMore = async () => {
      state.page++;
      state.loading = true;
      await onLoadList(true);
      state.loading = false;
    }
    // onLoadList(false);
    setWechatShareInfo({
      title: "人民知慧教育一体化人才教育培训服务平台",
      desc: "N多企业都在人民知慧教育招募小伙伴，机会有限，感兴趣戳",
      link: location.href,
      imgUrl:
        "https://asset.txqn.huohua.cn/assets/28f7639f-be0a-423c-8ca8-23e3b352110e.png",
    });
    const toZhongMinHome: Function = () => {
      location.href = "http://www.zhongminzhihui.cn";
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
    };
    const toCategoryPage = () => {
      router.push("/search-category");
    };
    const onTabChange = () => {
      getHomeData();
      state.jobList = [];
      state.page = 0;
      onLoadMore();
    };
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
      locationHref,
      onTabChange,
      toZhongMinHome,
      onLoadMore
    };
  },
};
</script>
<style lang="scss" scoped src="./index.scss"></style>
