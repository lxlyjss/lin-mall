<template>
  <div class="category-container">
    <div class="filter-conteainer">
      <div class="filter-left">
        <van-sidebar v-model="activeKey" @change="onSideChange">
          <van-sidebar-item
            class="city-item"
            v-for="item in categories"
            :key="item.id"
            :title="item.name"
          />
        </van-sidebar>
      </div>
      <div class="filter-right">
        <section>
          <p class="title">{{ jobCate }}</p>
          <selectTag :list="tagList" type="radio" @change="onTagChange" />
        </section>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, onMounted } from "vue";
import selectTag from "@/components/common/selectTag.vue";
import { useRouter } from "vue-router";
import { getCategory } from "@/api/search/category";
import { getCategoryRes } from "@/api/search/category.d";
import { Toast } from "vant";

interface State {
  categories: getCategoryRes["categories"];
  show: boolean;
  activeKey: string;
  tagList: string[];
  jobCate: string;
}
export default {
  components: {
    selectTag,
  },
  props: {
    value: Boolean,
  },
  emits: ["onclose"],
  setup(props: any, ctx: any) {
    const router = useRouter();
    const state: State = reactive({
      show: false,
      activeKey: "",
      tagList: [],
      categories: [
        {
          name: "热门职位",
          id: 99999,
          children: [],
          sort: 0,
        },
      ],
      jobCate: "热门职位"
    });
    state.show = props.value;
    const getCategoryData = async () => {
      let {
        data: { data, code },
      } = await getCategory();
      console.log(data);
      if (code !== 200) {
        Toast("数据错误");
        return;
      }
      const categories = data.categories || [];
      state.categories = state.categories.concat(categories);
      state.categories[0].children = data.hot_jobs;
      state.tagList = state.categories[0].children;
    };
    const onTagChange = (data: any) => {
      console.log(data);
      if (!data.length) return;
      router.push({
        path: "/search-result",
        query: {
          searchVal: data[0],
        },
      });
    };
    const onSideChange = (value: number) => {
      console.log(value);
      state.tagList = state.categories[value].children;
      state.jobCate = state.categories[value].name;
    }
    onMounted(() => {
      console.log("onMounted");
      getCategoryData();
    });
    return {
      ...toRefs(state),
      getCategoryData,
      onTagChange,
      onSideChange
    };
  },
};
</script>
<style lang="scss" scoped>
.category-container {
  .filter-conteainer {
    height: 100vh;
    position: relative;
    overflow-y: auto;
    display: flex;
    .filter-left {
      height: 100%;
      width: 112px;
      background-color: #f8f8f8;
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
      width: calc(100% - 112px);
      flex: 0 0 calc(100% - 112px);
      .title {
        margin-bottom: 10px;
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
      }
    }
  }
}
</style>
