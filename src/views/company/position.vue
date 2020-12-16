<template>
  <div class="company-position-list">
    <position-item v-for="item in positionList" :key="item.id" :info="item" />
  </div>
</template>
<script lang="ts">
import { reactive, toRefs } from "vue";
import positionItem from "@/components/home/positionItem.vue";
import { getCompanyPosition } from "@/api/search/company";
import { useRoute } from "vue-router";

interface State {
  positionList: any
}
export default {
  components: {
    positionItem
  },
  setup() {
    const route: any = useRoute()
    const state: State = reactive({
      positionList: []
    });
    const getPosition = async () => {
      const id = route.query.id;
      const {
        data: { code, data },
      } = await getCompanyPosition(id);
      state.positionList = data;
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
