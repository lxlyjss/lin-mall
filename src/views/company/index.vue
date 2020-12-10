<template>
  <div class="home-page">
    <div class="header-container">
      <van-swipe loop autoplay="3000" indicator-color="#fff">
        <van-swipe-item v-for="(item, index) in swipeList" :key="index">
          <van-image fit="cover" :src="item.imgUrl" @click="previewImage(index)" />
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
          <p class="info-title">字节跳动</p>
          <p class="subtitle">北京|c轮 200人以上|文娱|内容</p>
        </div>
        <div class="info-right">
          <van-image src="" />
        </div>
      </div>
      <p class="title">公司介绍</p>
      <div class="labels">
        <van-tag v-for="tag in company.labels" :key="tag" type="default">{{
          tag
        }}</van-tag>
      </div>
      <div class="intro">
        北京字节跳动科技有限公司，成立于2012年3月，是最早将人工
        智能应用于移动互联网场景的科技企业之一，是中国北京的一家
        信息科技公司，地址位于北京市海淀区知春路甲48号 [1] 。公司
        以建设“全球创作与交流平台”为愿景 [2] 。字节跳动的全球化布 局始于2015年
        [3] ，“技术出海”是字节跳动全球化发展的核心战 略 [4]
        ，其旗下产品有今日头条，西瓜视频，抖音，火山小视频，
        皮皮虾，懂车帝，悟空问答等。
      </div>
      <p class="title">公司官网</p>
      <p class="company-link">
        <a href="https://www.baidu.com">https://www.baidu.com</a>
      </p>
      <p class="title">公司地址</p>
      <van-image
        class="company-map"
        fit="cover"
        src="http://oss.xinlinyun.top/ke/upload/image/2018/03/26/19927c9ea0a8a5b391fee204075c9bd0.png"
      />
      <p class="title">工商信息</p>
      <div class="company-bussiness">
        <p><span>公司全称</span><span>海南的咖啡机拉卡世纪东方</span></p>
        <p><span>成立时间</span><span>2020-10-22</span></p>
        <p><span>注册资金</span><span>4000万人民币</span></p>
        <p><span>法人代表</span><span>李丹</span></p>
      </div>
      <div class="bottom-btn">
        <van-button type="danger" @click="toPositionList">在职招聘（22）</van-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import positionItem from "@/components/home/positionItem.vue";
import { getBannerList, getPositionList } from "@/api/home/index";
import { client } from "@/utils/utils";
import { ImagePreview } from "vant";

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
  setup() {
    const router = useRouter();
    const state: State = reactive({
      tabActive: 0,
      searchValue: "",
      swipeList: [],
      infoList: [],
      company: {
        labels: ["标签1", "biadj", "dkjkfdjka"],
      },
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
    const toPositionList = () => {
      router.push("/company-position")
    }
    const previewImage = (index: number) => {
      const imageList: string[] = state.swipeList.map((item: any) => item.imgUrl);
      if (client.weixinwebview) {
        (window as any).WeixinJSBridge &&
          (window as any).WeixinJSBridge.invoke("imagePreview", {
            urls: imageList,
            current: imageList[index]
          });
      } else {
        ImagePreview({
          //@ts-ignore
          swipeTo: () => {},
          images: imageList,
          startPosition: index,
          closeable: true,
          loop: false
        });
      }
    }
    onMounted(() => {
      getBanner();
      getPosition();
    });
    return {
      ...toRefs(state),
      toSearch,
      getBannerList,
      getPosition,
      previewImage,
      toPositionList
    };
  },
};
</script>
<style lang="scss" scoped src="./index.scss"></style>
