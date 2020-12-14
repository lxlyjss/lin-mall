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
    VanTag: Tag,
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
  emits: ["change", "input"],
  setup(props: any, ctx: any) {
    const state: any = reactive({
      selectList: [],
      totalList: [],
      disabled: [],
    });
    state.selectList = props.value || [];
    watch(
      () => props.value,
      (n, o) => {
        state.selectList = n;
      }
    );
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
      selectTag,
    };
  },
};
</script>
<style lang="scss" scoped>
.tag-list {
  margin-left: -10px;
  margin-bottom: -10px;
  .filter-tag {
    justify-content: center;
    width: auto;
    min-width: 50px;
    height: 28px;
    margin-left: 10px;
    margin-bottom: 15px;
    vertical-align: middle;
    background: #f8f8f8;
    border-radius: 3px;
    font-size: 12px;
    font-weight: 400;
    color: #666666;
    box-sizing: border-box;
    padding: 0 8px;
    border: 1px solid #f8f8f8;

    &.active {
      color: #f25b4e;
      background-color: #fff;
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
