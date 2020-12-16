<template>
  <van-popup v-model:show="show" position="right" @close="onClose">
    <div class="filter-conteainer">
      <section>
        <p class="title">期望薪资</p>
        <selectTag
          :list="salaryList"
          v-model:value="currentSalary"
          @change="onSalaryChange"
          type="radio"
        />
      </section>
      <section>
        <p class="title">工作经验</p>
        <selectTag
          :list="workTimeList"
          v-model:value="currentWorkTime"
          @change="onWorkTimeChange"
          type="radio"
        />
      </section>
      <section>
        <p class="title">学历要求</p>
        <selectTag
          :list="schoolLevelList"
          v-model:value="currentSchoolLevel"
          @change="onSchoolLevelChange"
          type="radio"
        />
      </section>
      <section>
        <p class="title">时间要求</p>
        <selectTag
          :list="workNatureList"
          v-model:value="currentWorkNature"
          @change="onWorkNatureChange"
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
import { Toast } from "vant";

interface State {
  show: boolean;
  salaryList: string[];
  workTimeList: string[];
  schoolLevelList: string[];
  workNatureList: string[];
  currentSalary: string[];
  currentWorkTime: string[];
  currentSchoolLevel: string[];
  currentWorkNature: string[];
  oldSelect: string[];
}
export default {
  components: {
    selectTag,
  },
  props: {
    value: Boolean,
    requirements: Object,
  },
  emits: ["onclose", "complete"],
  setup(props: any, ctx: any) {
    const state: State = reactive({
      show: false,
      salaryList: [],
      workTimeList: [],
      schoolLevelList: [],
      workNatureList: [],
      currentSalary: [],
      currentWorkTime: [],
      currentSchoolLevel: [],
      currentWorkNature: [],
      oldSelect: [],
    });
    state.show = props.value;
    watch(
      () => props.value,
      (n: any, o: any) => {
        state.show = n;
      }
    );
    watch(
      () => props.requirements,
      (n: any, o: any) => {
        setFilterData()
      }
    );
    const onSalaryChange = (value: string[]) => {
      console.log(value);
      state.currentSalary = value;
    };
    const onWorkTimeChange = (value: string[]) => {
      console.log(value);
      state.currentWorkTime = value;
    };
    const onSchoolLevelChange = (value: string[]) => {
      console.log(value);
      state.currentSchoolLevel = value;
    };
    const onWorkNatureChange = (value: string[]) => {
      console.log(value);
      state.currentWorkNature = value;
    };
    const reset = () => {
      state.currentSalary = [];
      state.currentWorkTime = [];
      state.currentSchoolLevel = [];
      state.currentWorkNature = [];
    };
    const submit = () => {
      const dataArr = [
        state.currentSalary[0],
        state.currentWorkTime[0],
        state.currentSchoolLevel[0],
        state.currentWorkNature[0],
      ];
      ctx.emit("complete", dataArr);
      state.oldSelect = dataArr;
      onClose();
    };
    const setFilterData = () => {
      state.salaryList = props.requirements.money.map((item: any) => item.name);
      state.workTimeList = props.requirements.work_time.map(
        (item: any) => item.name
      );
      state.schoolLevelList = props.requirements.school_level.map(
        (item: any) => item.name
      );
      state.workNatureList = props.requirements.work_nature.map(
        (item: any) => item.name
      );
    }
    onMounted(() => {
      console.log("onMounted");
    });
    const onClose = () => {
      ctx.emit("onclose");
      state.currentSalary = state.oldSelect[0] ? [state.oldSelect[0]] : [];
      state.currentWorkTime = state.oldSelect[1] ? [state.oldSelect[1]] : [];
      state.currentSchoolLevel = state.oldSelect[2] ? [state.oldSelect[2]] : [];
      state.currentWorkNature = state.oldSelect[3] ? [state.oldSelect[3]] : [];
    };
    if (props.requirements.currentSalary) {
      setFilterData()
    }
    return {
      ...toRefs(state),
      onClose,
      onSalaryChange,
      onWorkTimeChange,
      onSchoolLevelChange,
      onWorkNatureChange,
      reset,
      submit,
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
