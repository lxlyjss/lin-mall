<template>
  <div class="position-detail">
    <div class="position-header">
      <p>产品经理</p>
      <p>本科|2年工作经验以上|有优秀项目</p>
      <p><img src="~@/assets/common/location-gray.png" />北京海淀</p>
    </div>
    <div class="body">
      <section>
        <p class="title">职位亮点</p>
        <van-tag
          v-for="tag in position.labels"
          :key="tag"
          plain
          type="default"
          >{{ tag }}</van-tag
        >
      </section>
      <section>
        <p class="title">职位描述</p>
        <p>发展空间大，阿拉时代峻峰可垃圾袋说服力卡</p>
      </section>
      <section>
        <p class="title">岗位职责</p>
        <p>发展空间大，阿拉时代峻峰可垃圾袋说服力卡</p>
      </section>
      <section>
        <p class="title">岗位要求</p>
        <p>发展空间大，阿拉时代峻峰可垃圾袋说服力卡</p>
      </section>
      <section>
        <p class="title">岗位要求</p>
        <p>发展空间大，阿拉时代峻峰可垃圾袋说服力卡</p>
      </section>
    </div>
    <div class="company-info">
      <p class="line-title">公司信息</p>
      <div class="info-detail">
        <p class="company-title">字节跳动</p>
        <p class="subtitle">A轮|200人以上|互联网、金融</p>
        <p class="comment-count">已有34条评价</p>
        <van-image src="" class="company-logo" />
      </div>
      <div class="company-address">
        <p>
          <img src="@/assets/common/company-icon.png" /><span
            >北京-朝阳区-大悦城</span
          >
        </p>
        <p>望京路33号朝来产业园</p>
      </div>
      <div class="tips-content">
        <p><img src="@/assets/common/notice.png" /><span>提示</span></p>
        <p>
          求职教案拉斯肯德基发了就爱上了到附近拉卡世纪东方逻辑奥斯卡两地分居来看阿拉克丝点击范
        </p>
      </div>
    </div>
    <div class="lesson-container">
      <p class="line-title">职场课程</p>
      <div class="lesson-list">
        <lessonItem v-for="(item, key) in lessonList" :key="key" />
      </div>
    </div>
    <div class="bottom-container">
      <van-button plain>立即沟通</van-button>
      <van-button type="danger">更多优质课程</van-button>
    </div>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, onMounted, computed } from "vue";
import { Tag, Search } from "vant";
import lessonItem from "@/components/position/lessonItem.vue";

export default {
  components: {
    lessonItem,
    VanTag: Tag,
  },
  setup() {
    const state = reactive({
      searchValue: "",
      hasSearched: false,
      position: {
        labels: ["kjk", "kk"],
      },
      lessonList: [
        {
          title: "kjkjkjkk"
        }
      ]
    });
    onMounted(() => {
      console.log("dd");
    });
    return {
      ...toRefs(state),
    };
  },
};
</script>
<style lang="scss" scoped>
.position-detail {
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
}
</style>
