<template>
  <div class="position-detail">
    <div class="position-header">
      <p>产品经理</p>
      <p>本科|2年工作经验以上|有优秀项目</p>
      <p>北京海淀</p>
    </div>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, onMounted, computed } from "vue";
import { Tag, Search } from "vant";
import infoItem from "@/components/home/infoItem.vue";

export default {
  components: {
    // VanSearch: Search,
    // infoItem,
    // VanTag: Tag
  },
  setup() {
    const state = reactive({
      searchValue: "",
      hasSearched: false,
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
}
</style>
