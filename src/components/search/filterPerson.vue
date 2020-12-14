<template>
  <van-popup v-model:show="show" position="right" closeable @close="onClose">
    <div class="filter-conteainer">
      <section>
        <p class="title">期望薪资</p>
        <selectTag
          :list="scaleList"
          v-model:value="currentScale"
          @change="onScaleChange"
          type="radio"
        />
      </section>
      <section>
        <p class="title">工作经验</p>
        <selectTag
          :list="financingList"
          v-model:value="currentFinancing"
          @change="onFinancingChange"
          type="radio"
        />
      </section>
      <section>
        <p class="title">学历要求</p>
        <selectTag
          :list="areaList"
          v-model:value="currentArea"
          @change="onAreaChange"
          type="radio"
        />
      </section>
      <section>
        <p class="title">时间要求</p>
        <selectTag
          :list="areaList"
          v-model:value="currentArea"
          @change="onAreaChange"
          type="radio"
        />
      </section>
      <div class="bottom-btn">
        <van-button plain @click="reset">重置</van-button>
        <van-button type="danger" @click="submit">确定</van-button>
      </div>
    </div>
  </van-popup>
</template>
<script lang="ts">
import { reactive, toRef, toRefs, watch, onMounted } from "vue";
import selectTag from "@/components/common/selectTag.vue";

interface State {
  show: boolean;
  scaleList: string[];
  financingList: string[];
  areaList: string[];
  currentScale: string[];
  currentFinancing: string[];
  currentArea: string[];
}
export default {
  components: {
    selectTag,
  },
  props: {
    value: Boolean,
  },
  emits: ["onclose", "complete"],
  setup(props: any, ctx: any) {
    const state: State = reactive({
      show: false,
      scaleList: ["不限", "20人", "20-100人", "100-200人", "200-500人"],
      financingList: ["不限", "天使轮", "A轮", "B轮", "C轮", "未融资"],
      areaList: [
        "不限",
        "移动互联网",
        "电商",
        "金融",
        "企业服务",
        "教育",
        "医疗",
      ],
      currentScale: [],
      currentFinancing: [],
      currentArea: []
    });
    state.show = props.value;
    watch(
      () => props.value,
      (n: any, o: any) => {
        state.show = n;
      }
    );
    const onScaleChange = (value: string[]) => {
      console.log(value)
      state.currentScale = value;
    }
    const onFinancingChange = (value: string[]) => {
      console.log(value)
      state.currentFinancing = value;
    }
    const onAreaChange = (value: string[]) => {
      console.log(value)
      state.currentArea = value;
    }
    const reset = () => {
      state.currentScale = []
      state.currentFinancing = []
      state.currentArea = []
    }
    const submit = () => {
      console.log(state.currentScale, state.currentFinancing, state.currentArea)
      ctx.emit("complete", [state.currentScale[0], state.currentFinancing[0], state.currentArea[0]])
      onClose()
    }
    onMounted(() => {
      console.log("onMounted");
    });
    const onClose = () => {
      ctx.emit("onclose");
    };
    return {
      ...toRefs(state),
      onClose,
      onScaleChange,
      onFinancingChange,
      onAreaChange,
      reset,
      submit
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
    .title {
      margin-bottom: 10px;
    }
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
      border: none;
      &:first-of-type {
        border-top: 1px solid #f0f0f0;
      }
      &:last-of-type {
        background: linear-gradient(90deg, #f86a68, #f99168);
        border-radius: 0;
      }
    }
  }
}
</style>
