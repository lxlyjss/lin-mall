<template>
  <div id="map-container" class="aAmap-container"></div>
</template>
<script lang="ts">
import { reactive, onMounted, toRefs, onUnmounted } from "vue";
// import AMapLoader from "@amap/amap-jsapi-loader";

interface State {
  map: any;
  AMap: any;
}
export default {
  props: {
    mapOptions: Object,
  },
  emits: ["complete"],
  setup(props: any, ctx: any) {
    const state: State = reactive({
      map: {},
      AMap: null,
    });
    const loadMap = async () => {
      try {
        let options = {
          zoom: 11, //级别
          viewMode: "2D", //使用3D视图
        };
        options = Object.assign(options, props.mapOptions);
        state.map = new AMap.Map("map-container", options);
        state.map.on("complete", function() {
          // 地图图块加载完成后触发
          ctx.emit("complete");
        });
      } catch (err) {
        console.log(err);
      }
    };
    const addMarker = (options: any) => {
      const marker = new AMap.Marker(options);
      state.map.add(marker);
    };
    const openInfoWindow = (options: any) => {
      const infoWindow = new AMap.InfoWindow(options);
      infoWindow.open(state.map);
    };
    onMounted(() => {
      loadMap();
    });
    onUnmounted(() => {
      state.map.destroy();
    });
    return {
      ...toRefs(state),
      addMarker,
      openInfoWindow,
    };
  },
};
</script>
<style lang="scss" scoped>
.aAmap-container {
  width: 200px;
  height: 150px;
}
</style>
