<template>
  <van-popup v-model:show="show" position="right" closeable @close="onClose">
    <div class="filter-conteainer">
      <div class="filter-left">
        <van-sidebar v-model="activeKey">
          <van-sidebar-item class="city-item" title="标签名称" />
          <van-sidebar-item class="city-item" title="标签名称" />
          <van-sidebar-item class="city-item" title="标签名称" />
        </van-sidebar>
      </div>
      <div class="filter-right">
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
    </div>
  </van-popup>
</template>
<script lang="ts">
import { reactive, toRef, toRefs, watch, onActivated, onMounted } from "vue";
import selectTag from "@/components/common/selectTag.vue";

export default {
  components: {
    selectTag,
  },
  props: {
    value: Boolean,
  },
  emits: ["input"],
  setup(props: any, ctx: any) {
    const state = reactive({
      show: false,
      tagList: ["标签1", "标签12", "标签13"],
      selectList: [],
      activeKey: "",
    });
    state.show = props.value;
    watch(
      () => {
        props.value;
      },
      (n: any, o: any) => {
        state.show = n;
      }
    );
    onMounted(() => {
      console.log("onMounted");
    });
    const onClose = () => {
      ctx.emit("input", false);
      console.log("ddd")
    }
    return {
      ...toRefs(state),
      onClose
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
  display: flex;
  .filter-left {
    height: 100%;
    width: 80px;
    .city-item {
      padding: 10px;
    }
  }
  .filter-right {
    height: 100%;
    width: calc(100% - 80px);
  }
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
