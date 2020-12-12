<template>
  <div class="company-location">
    <AMap
      ref="AMapRef"
      class="company-map"
      :mapOptions="mapOptions"
      @complete="onAMapComplete"
    />
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, ref } from "vue";
import AMap from "@/components/common/AMap.vue";

interface State {
  mapOptions: any;
}
export default {
  components: {
    AMap,
  },
  setup() {
    const state: State = reactive({
      mapOptions: {
        center: [116.397428, 39.90923], //中心点坐标
      },
    });
    const AMapRef = ref(null);
    const onAMapComplete = () => {
      (AMapRef.value as any).addMarker({
        position: [116.39, 39.9],
      });
      (AMapRef.value as any).openInfoWindow({
        content: "<p style='font-size: 12px;'>北京市望京阜通东大街方恒国际中心A座16层</p>",
        anchor: "bottom-center",
        position: [116.39, 39.9]
      });
    };
    return {
      ...toRefs(state),
      AMapRef,
      onAMapComplete,
    };
  },
};
</script>
<style lang="scss" scoped>
.company-location {
  width: 100vw;
  height: 100vh;
  .company-map {
    width: 100%;
    height: 100%;
  }
}
</style>
