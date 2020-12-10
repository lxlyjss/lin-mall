<template>
  <div class="company-position-list">
    <position-item v-for="item in positionList" :key="item.id" :info="item" />
  </div>
</template>
<script lang="ts">
import { reactive, toRefs } from "vue";
import positionItem from "@/components/home/positionItem.vue";
import { getPositionList } from "@/api/home/index";

interface State {
  positionList: any
}
export default {
  components: {
    positionItem
  },
  setup() {
    const state: State = reactive({
      positionList: []
    });
    const getPosition = async () => {
      const {
        data: { msg, status, data },
      } = await getPositionList();
      console.log(data);
      state.positionList = data.list;
    };
    getPosition()
    return {
      ...toRefs(state),
      getPosition
    }
  }
};
</script>
<style lang="scss" scoped>
.company-position-list {
  background-color: $gray-1;
}
</style>
