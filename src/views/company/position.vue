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
import { setWechatShareInfo } from "@/utils/utils";

interface State {
  positionList: any;
}
export default {
  components: {
    positionItem,
  },
  setup() {
    const route: any = useRoute();
    const state: State = reactive({
      positionList: [],
    });
    const getPosition = async () => {
      const id = route.query.id;
      const {
        data: { code, data },
      } = await getCompanyPosition(id);
      state.positionList = data;
      setWechatShareInfo({
        title: `【人民智慧教育招聘】不来后悔，${state.positionList[0]?.company?.simple_name}值得加入！`,
        desc: `我们正在人民知慧教育招募小伙伴，机会有限，感兴趣戳`,
        link: location.href,
        imgUrl:
          "https://asset.txqn.huohua.cn/assets/28f7639f-be0a-423c-8ca8-23e3b352110e.png",
      });
    };
    getPosition();
    return {
      ...toRefs(state),
      getPosition,
    };
  },
};
</script>
<style lang="scss" scoped>
.company-position-list {
  background-color: $gray-1;
}
</style>
