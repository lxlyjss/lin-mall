<template>
  <div class="tag-list">
    <van-tag
      @click="selectTag(tag, index)"
      class="filter-tag"
      :class="{ active: getActive(tag), round, disabled: getDisabled(tag) }"
      v-for="(tag, index) in list"
      :key="index"
      >{{ tag }}</van-tag
    >
    <slot />
  </div>
</template>
<script lang="ts">
import { reactive, watch, onMounted, toRefs } from "vue";
import { Dialog, Tag } from "vant";

interface Data {
  selectList: any;
  totalList: any;
  disabled: any;
}
export default {
  components: {
    VanTag: Tag
  },
  props: {
    // 选择模式，raido：单选，checkbox：多选
    type: {
      type: String,
      default: "raido",
    },
    // 格式: ["example"]
    list: {
      type: Array,
      default: (): string[] => [],
    },
    // 当前已选中的数据
    value: {
      type: Array,
      default: (): string[] => [],
    },
    round: {
      type: Boolean,
      default: false,
    },
    // 禁止选择的选项集合
    disabledList: {
      type: Array,
      default: (): string[] => [],
    },
  },
  setup(props: any, ctx: any) {
    const state: any = reactive({
      selectList: [],
      totalList: [],
      disabled: [],
    });
    watch(
      () => props.value,
      (old, newVal) => {
        console.log(old, newVal);
      }
    );
    onMounted(() => {
      state.selectList = props.value || [];
    });
    const getActive = (tag: string) => {
      return state.selectList.some((select: any) => select == tag);
    };
    const getDisabled = (tag: string) => {
      return props.disabledList.some((disabled: any) => disabled == tag);
    };
    const selectTag = (tag: any, index: number) => {
      if (props.disabledList.some((disabled: any) => disabled == tag)) {
        return;
      }
      if (props.type === "radio") {
        state.selectList = [tag];
        ctx.emit("change", [tag]);
        ctx.emit("input", [tag]);
      } else {
        const hasIndex = state.selectList.findIndex(
          (select: any) => select === tag
        );
        if (hasIndex !== -1) {
          state.selectList.splice(hasIndex, 1);
        } else {
          state.selectList.push(tag);
        }
        ctx.emit("change", [...state.selectList]);
        ctx.emit("input", [...state.selectList]);
      }
    };
    return {
      ...toRefs(state),
      getActive,
      getDisabled,
      selectTag
    }
  }
};
</script>
<style lang="scss" scoped>
.tag-list {
  margin-left: -20px;
  margin-bottom: -20px;
  .filter-tag {
    justify-content: center;
    background-color: #fff;
    min-width: 152px;
    height: 56px;
    color: #585858;
    padding: 20px 20px;
    font-size: 24px;
    border-radius: 10px;
    border: 2px solid #e6e6e6;
    margin-left: 20px;
    margin-bottom: 20px;
    vertical-align: middle;
    &.active {
      background-color: #f25b4e;
      color: #fff;
      border: 1px solid #f25b4e;
    }
    &.round {
      border-radius: 100px;
    }
    &.disabled {
      background-color: #f6f6f6;
      color: #c8c8c8;
      border: 1px solid #f6f6f6;
    }
  }
}
</style>
