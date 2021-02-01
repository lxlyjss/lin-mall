<template>
  <van-popup v-model:show="show" position="right" @close="onClose">
    <div class="filter-conteainer">
      <section>
        <p class="title">公司规模</p>
        <selectTag
          :list="scaleList"
          v-model:value="currentScale"
          @change="onScaleChange"
          type="radio"
        />
      </section>
      <section>
        <p class="title">融资阶段</p>
        <selectTag
          :list="financingList"
          v-model:value="currentFinancing"
          @change="onFinancingChange"
          type="radio"
        />
      </section>
      <section>
        <p class="title">行业领域</p>
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
import { getFilterCompany } from "@/api/search/getEnum";
import { Toast } from "vant";

interface State {
  show: boolean;
  dataList: any;
  scaleList: string[];
  financingList: string[];
  areaList: string[];
  currentScale: string[];
  currentFinancing: string[];
  currentArea: string[];
  oldSelect: string[];
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
      dataList: [],
      scaleList: [],
      financingList: [],
      areaList: [],
      currentScale: [],
      currentFinancing: [],
      currentArea: [],
      oldSelect: [],
    });
    state.show = props.value;
    watch(
      () => props.value,
      (n: any, o: any) => {
        state.show = n;
      }
    );
    const getFilterPersonData = async () => {
      const {
        data: { data, code },
      } = await getFilterCompany();
      console.log(data);
      if (code !== 200) {
        Toast("接收数据失败！");
        return;
      }
      state.dataList = data;
      state.scaleList = data.office_worker_num.map((item: any) => item.name);
      state.financingList = data.financing_level.map((item: any) => item.name);
      state.areaList = data.industry_attribute.map((item: any) => item.name);
    };
    const getAreaId = (nameStr: string) => {
      if (!nameStr) return [];
      console.log(nameStr)
      const areaList = state.dataList.industry_attribute;
      const result = areaList.filter((item: any) => {
        return item.name === nameStr;
      });
      if (result.length > 0) {
        return result.map((item: any) => item.id);
      } else {
        return [];
      }
    }
    const onScaleChange = (value: string[]) => {
      console.log(value);
      state.currentScale = value;
    };
    const onFinancingChange = (value: string[]) => {
      console.log(value);
      state.currentFinancing = value;
    };
    const onAreaChange = (value: string[]) => {
      console.log(value);
      state.currentArea = value;
    };
    const reset = () => {
      state.currentScale = [];
      state.currentFinancing = [];
      state.currentArea = [];
    };
    const submit = () => {
      console.log(
        state.currentScale,
        state.currentFinancing,
        state.currentArea
      );
      const dataArr = [
        state.currentScale[0],
        state.currentFinancing[0],
        state.currentArea[0],
      ];
      ctx.emit("complete", dataArr);
      state.oldSelect = dataArr;
      onClose();
    };
    onMounted(() => {
      console.log("onMounted");
    });
    const onClose = () => {
      ctx.emit("onclose");
      state.currentScale = state.oldSelect[0] ? [state.oldSelect[0]] : [];
      state.currentFinancing = state.oldSelect[1] ? [state.oldSelect[1]] : [];
      state.currentArea = state.oldSelect[2] ? [state.oldSelect[2]] : [];
    };
    getFilterPersonData();
    return {
      ...toRefs(state),
      onClose,
      onScaleChange,
      onFinancingChange,
      onAreaChange,
      reset,
      submit,
      getAreaId
    };
  },
};
</script>
<style lang="scss" scoped>
.filter-conteainer {
  height: 100vh;
  width: 80vw;
  position: relative;
  padding-bottom: 60px;
  overflow-y: auto;
  box-sizing: border-box;
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
