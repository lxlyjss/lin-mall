<template>
  <div class="home-page">
    <div class="header-container">
      <van-swipe loop autoplay="3000" indicator-color="#fff">
        <van-swipe-item v-for="(item, index) in company.images" :key="index">
          <van-image
            fit="cover"
            :src="item.image_url"
            @click="previewImage(index)"
          />
        </van-swipe-item>
      </van-swipe>
      <div class="image-count">
        <van-image :src="require('@/assets/common/image.png')" />
        {{ company.images.length }}
      </div>
    </div>
    <div class="body">
      <div class="company-info">
        <div class="info-left">
          <p class="info-title">{{ company.simple_name }}</p>
          <p class="subtitle">
            {{ company.city_name }} | {{ company.financing_level }} |
            {{ company.office_worker_num }} | {{ company.tags.join("、") }}
          </p>
        </div>
        <div class="info-right">
          <van-image :src="company.logo" />
        </div>
      </div>
      <p class="title">公司介绍</p>
      <div class="labels">
        <van-tag v-for="tag in company.labels" :key="tag" type="default">{{
          tag
        }}</van-tag>
      </div>
      <div class="intro">{{ company.content }}</div>
      <p class="title">公司官网</p>
      <p class="company-link">
        <a :href="company.home_url">{{ company.home_url }}</a>
      </p>
      <p class="title">公司地址</p>
      <div class="company-map" v-if="dataReady">
        <AMap
          ref="AMapRef"
          class="company-map"
          :mapOptions="mapOptions"
          @complete="onAMapComplete"
        />
        <div class="map-mask" @click="toMapDetail"></div>
      </div>
      <p class="title">工商信息</p>
      <div class="company-bussiness">
        <p><span>公司全称</span><span>{{ company.name }}</span></p>
        <p><span>成立时间</span><span>{{ company.build_date }}</span></p>
        <p><span>注册资金</span><span>{{ company.regiter_money }}万</span></p>
        <p><span>法人代表</span><span>{{ company.law_people }}</span></p>
      </div>
      <div class="bottom-btn">
        <van-button type="danger" @click="toPositionList"
          >在职招聘（{{ company.jobbing_num }}）</van-button
        >
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, onMounted, computed, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import positionItem from "@/components/home/positionItem.vue";
import { getCompanyDetail } from "@/api/search/company";
import * as TYPES from "@/api/home/index.d";
import { client } from "@/utils/utils";
import { ImagePreview } from "vant";
import AMap from "@/components/common/AMap.vue";

interface State {
  tabActive: number;
  swipeList: TYPES.banners[];
  company: any;
  dataReady: boolean;
}
export default {
  components: {
    AMap,
  },
  setup(props: any, ctx: any) {
    const router = useRouter();
    const route: any = useRoute();
    const state: State = reactive({
      mapOptions: {
        center: [116.397428, 39.90923], //中心点坐标
        zoomEnable: false,
        dragEnable: false,
      },
      tabActive: 0,
      swipeList: [],
      company: {
        images: [],
        tags: []
      },
      dataReady: false
    });
    const AMapRef = ref(null);
    const getCompanyInfo = async () => {
      const id: number = +route.query.id;
      const {
        data: { code, data },
      } = await getCompanyDetail(id);
      state.company = data;
      state.dataReady = true;
    };
    const toSearch = () => {
      router.push("/search");
    };
    const toPositionList = () => {
      router.push({
        path: "/company-position",
        query: {
          id: state.company.id
        }
      });
    };
    const previewImage = (index: number) => {
      const imageList: string[] = state.swipeList.map(
        (item: any) => item.imgUrl
      );
      if (client.weixinwebview) {
        (window as any).WeixinJSBridge &&
          (window as any).WeixinJSBridge.invoke("imagePreview", {
            urls: imageList,
            current: imageList[index],
          });
      } else {
        ImagePreview({
          //@ts-ignore
          swipeTo: () => {},
          images: imageList,
          startPosition: index,
          closeable: true,
          loop: false,
        });
      }
    };
    const toMapDetail = () => {
      console.log("kkk");
      router.push({
        path: "/company-location",
        query: {
          location: state.company.location,
          address: state.company.address
        }
      });
    };
    const onAMapComplete = () => {
      const location = state.company.location.split(",");
      console.log("finish");
      (AMapRef.value as any).openInfoWindow({
        anchor: "top-center",
        content: `<p style='font-size: 12px;'>${state.company.address}</p>`,
        position: [location[0], location[1]]
      });
      (AMapRef.value as any).addMarker({
        position: [location[0], location[1]],
      });
    };
    onMounted(() => {
      getCompanyInfo();
    });
    return {
      ...toRefs(state),
      toSearch,
      getCompanyInfo,
      previewImage,
      toPositionList,
      toMapDetail,
      onAMapComplete,
      AMapRef,
    };
  },
};
</script>
<style lang="scss" scoped src="./index.scss"></style>
