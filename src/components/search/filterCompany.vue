<template>
  <van-popup v-model:show="show" position="right" closeable>
    <div class="filter-conteainer">
      <section>
        <p>公司规模</p>
        <selectTag
          :list="tagList"
          v-model:selectList="selectList"
          type="radio"
        />
      </section>
      <section>
        <p>融资阶段</p>
        <selectTag
          :list="tagList"
          v-model:selectList="selectList"
          type="radio"
        />
      </section>
      <section>
        <p>行业领域</p>
        <selectTag
          :list="tagList"
          v-model:selectList="selectList"
          type="radio"
        />
      </section>
      <div class="bottom-btn">
        <van-button plain>重置</van-button>
        <van-button type="danger">确定</van-button>
      </div>
    </div>
  </van-popup>
</template>
<script lang="ts">
import { reactive, toRef, toRefs } from "vue";
import selectTag from "@/components/common/selectTag.vue";

export default {
  components: {
    selectTag
  },
  setup() {
    const state = reactive({
      show: false,
      tagList: ["标签1", "标签12", "标签13"],
      selectList: [],
    });
    return {
      ...toRefs(state),
    };
  },
};
</script>
<style lang="scss" scoped>
.filter-conteainer {
  height: 100vh;
  width: 80vw;
  position: relative;
  overflow-y: auto;
  section {
    padding: 20px 15px 0;
  }
  .bottom-btn {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    .van-button {
      width: 50%;
      height: 50px;
    }
  }
}
</style>
