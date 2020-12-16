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
import { useRoute } from "vue-router";

interface State {
  mapOptions: any;
}
export default {
  components: {
    AMap,
  },
  setup() {
    const route: any = useRoute();
    const state: State = reactive({
      mapOptions: {
        center: [116.397428, 39.90923], //中心点坐标
      },
    });
    const AMapRef = ref(null);
    const onAMapComplete = () => {
      const location = route.query.location.split(",");
      const address = route.query.address;
      (AMapRef.value as any).addMarker({
        position: [location[0], location[1]]
      });
      (AMapRef.value as any).openInfoWindow({
        anchor: "top-center",
        content: `<p style='font-size: 12px;'>${address}</p>`,
        position: [location[0], location[1]]
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
