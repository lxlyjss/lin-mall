<template>
  <div class="category-container">
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
          <p class="title">热门职位</p>
          <selectTag
            :list="tagList"
            type="radio"
            @change="onTagChange"
          />
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

export default {
  components: {
    selectTag,
  },
  props: {
    value: Boolean,
  },
  emits: ["onclose"],
  setup(props: any, ctx: any) {
    const router = useRouter()
    const state = reactive({
      show: false,
      tagList: ["标签1", "标签12", "标签13"],
      selectList: [],
      activeKey: "",
    });
    state.show = props.value;
    const onTagChange = (data: any) => {
      console.log(data);
      if (!data.length) return;
      router.push({
        path: "/search-result",
        query: {
          searchVal: data[0]
        }
      })
    }
    onMounted(() => {
      console.log("onMounted");
    });
    return {
      ...toRefs(state),
      onTagChange
    };
  },
}
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
      background-color: #F8F8F8;
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
