<template>
  <van-popup v-model:show="show" position="right">
    <div class="filter-conteainer">
      <section>
        <p>公司规模</p>
        <selectTag :list="tagList" v-model:selectList="selectList" type="radio" />
        <p>融资阶段</p>
        <selectTag :list="tagList" v-model:selectList="selectList" type="radio" />
        <p>行业领域</p>
        <selectTag :list="tagList" v-model:selectList="selectList" type="radio" />
      </section>
    </div>
  </van-popup>
</template>
<script lang="ts">
import { reactive, toRef, toRefs } from "vue";
import { Popup } from "vant";
import selectTag from "@/components/common/selectTag.vue";

export default {
  components: {
    VanPopup: Popup,
    selectTag
  },
  setup() {
    const state = reactive({
      show: true,
      tagList: [
        "1",
        "2",
        "3"
      ],
      selectList: []
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
  width: 60vw;
}
</style>
