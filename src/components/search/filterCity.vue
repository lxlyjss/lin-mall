<template>
  <van-popup v-model:show="show" position="right" @close="onClose">
    <div class="filter-conteainer">
      <div class="filter-left">
        <van-sidebar v-model="activeKey" @change="onProvinceChange">
          <van-sidebar-item
            class="city-item"
            v-for="(item, key) in provinceList"
            :key="key"
            :title="item.name"
          />
        </van-sidebar>
      </div>
      <div class="filter-right">
        <section class="city">
          <p class="title">选择市级</p>
          <selectTag
            :list="currentCityList.map((item) => item.name)"
            v-model:value="address.city"
            type="radio"
            @change="onCityChange"
          />
        </section>
        <section class="county">
          <p class="title">选择县级</p>
          <selectTag
            :list="currentCountyList.map((item) => item.name)"
            v-model:value="address.county"
            @change="onCountyChange"
            type="radio"
          />
        </section>
      </div>
      <div class="bottom-btn">
        <van-button plain @click="reset">重置</van-button>
        <van-button type="danger" @click="submit" :disabled="!getDisabledStatus"
          >确定</van-button
        >
      </div>
    </div>
  </van-popup>
</template>
<script lang="ts">
import {
  reactive,
  toRef,
  toRefs,
  watch,
  onActivated,
  onMounted,
  computed,
} from "vue";
import selectTag from "@/components/common/selectTag.vue";
import area from "@/utils/area";

interface State {
  show: boolean;
  address: any;
  currentCityList: any;
  currentCountyList: any;
  activeKey: string;
  provinceList: any;
  cityList: any;
  countyList: any;
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
    console.log(area);
    const state: State = reactive({
      show: false,
      address: {
        province: ["北京市"],
        city: [],
        county: [],
      },
      currentCityList: [
        {
          name: "北京市",
          code: "110100",
        },
      ],
      currentCountyList: [],
      activeKey: "",
      provinceList: area.province_list,
      cityList: area.city_list,
      countyList: area.county_list,
    });
    state.show = props.value;
    // 省列表
    const provinceList: any = computed(() => {
      let list: any = [];
      const provinceList: any = area.province_list;
      Object.keys(provinceList).forEach((item: any) => {
        list.push({
          code: item,
          name: provinceList[item],
        });
      });
      return list;
    });
    // 市列表
    const cityList: any = computed(() => {
      let list: any = [];
      const cityList: any = area.city_list;
      Object.keys(cityList).forEach((item: any) => {
        list.push({
          code: item,
          name: cityList[item],
        });
      });
      return list;
    });
    // 县列表
    const countyList: any = computed(() => {
      let list: any = [];
      const countyList: any = area.county_list;
      Object.keys(countyList).forEach((item: any) => {
        list.push({
          code: item,
          name: countyList[item],
        });
      });
      return list;
    });
    // 是否可以点击确定按钮
    const getDisabledStatus: any = computed(() => {
      console.log(state.address.province);
      console.log(state.address.city);
      console.log(state.address.county);
      return (
        state.address.province[0] &&
        state.address.city[0] &&
        state.address.county[0]
      );
    });
    watch(
      () => props.value,
      (n: any, o: any) => {
        state.show = n;
      }
    );
    // 省份改变
    const onProvinceChange = (value: string) => {
      const province: any = provinceList.value[value];
      const provinceCode: string = province.code.slice(0, 3);
      state.currentCityList = cityList.value.filter(
        (item: any) => item.code.slice(0, 3) == provinceCode
      );
      state.currentCountyList = [];
      state.address.province = [province.name];
      state.address.city = [];
      state.address.county = [];
    };
    // 城市改变
    const onCityChange = (value: string) => {
      const city: any = cityList.value.filter(
        (item: any) => item.name == value[0]
      )[0];
      const cityCode: string = city.code.slice(0, 4);
      state.currentCountyList = countyList.value.filter(
        (item: any) => item.code.slice(0, 4) == cityCode
      );
      state.address.city = [city.name];
    };
    const onCountyChange = (value: string) => {
      const county: any = countyList.value.filter(
        (item: any) => item.name == value[0]
      )[0];
      state.address.county = [county.name];
    };
    const reset = () => {
      state.address.city = [];
      state.address.county = [];
      state.currentCountyList = [];
    };
    const submit = () => {
      console.log(
        Object.keys(state.address).map((item: any) => state.address[item][0])
      );
      ctx.emit("complete", Object.keys(state.address).map((item: any) => state.address[item][0]))
      onClose();
    };
    onMounted(() => {
      console.log("onMounted");
    });
    const onClose = () => {
      ctx.emit("onclose");
    };
    return {
      ...toRefs(state),
      provinceList,
      cityList,
      countyList,
      onClose,
      onProvinceChange,
      onCityChange,
      onCountyChange,
      reset,
      submit,
      getDisabledStatus,
    };
  },
};
</script>
<style lang="scss" scoped>
.filter-conteainer {
  height: 100vh;
  width: 80vw;
  position: relative;
  display: flex;
  overflow: hidden;
  .filter-left {
    height: 100%;
    width: 70px;
    background-color: #f8f8f8;
    overflow-y: auto;
    .van-sidebar {
      width: 100%;
    }
    .city-item {
      padding: 15px 5px;
      text-align: center;
      &::before {
        height: 100%;
        width: 5px;
      }
    }
  }
  .filter-right {
    height: 100%;
    width: calc(100% - 70px);
    flex: 0 0 calc(100% - 70px);
    overflow-y: auto;
    .title {
      margin-bottom: 10px;
    }
    .county {
      padding-bottom: 50px;
    }
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
