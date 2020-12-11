<template>
  <div id="map-container" class="aAmap-container"></div>
</template>
<script lang="ts">
import { reactive, onMounted, toRefs, onUnmounted } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";

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
      AMap: {},
    });
    const loadMap = async () => {
      try {
        state.AMap = await AMapLoader.load({
          key: "5e1f2cd09ac0ca9dc6e6c38aa2c4c263", // 申请好的Web端开发者Key，首次调用 load 时必填
          version: "1.4.15", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
          plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
          AMapUI: {
            // 是否加载 AMapUI，缺省不加载
            version: "1.1", // AMapUI 缺省 1.1
            plugins: [], // 需要加载的 AMapUI ui插件
          },
          Loca: {
            // 是否加载 Loca， 缺省不加载
            version: "1.3.2", // Loca 版本，缺省 1.3.2
          },
        });
        let options = {
          zoom: 11, //级别
          viewMode: "2D", //使用3D视图
        };
        options = Object.assign(options, props.mapOptions);
        state.map = new state.AMap.Map("map-container", options);
        state.map.on("complete", function() {
          // 地图图块加载完成后触发
          ctx.emit("complete");
        });
        const marker = new state.AMap.Marker({
          position: [116.39, 39.9], //位置
        });
        state.map.add(marker); //添加到地图
        const content = [
          "电话 : 010-84107000   邮编 : 100102",
          "地址 : 北京市望京阜通东大街方恒国际中心A座16层</div></div>",
        ];
        const infoWindow = new state.AMap.InfoWindow({
          content,
        });
      } catch (err) {
        console.log(err);
      }
    };
    const addMarker = (options: any) => {
      const marker = new state.AMap.Marker(options);
      state.map.add(marker);
    };
    const openInfoWindow = (options: any) => {
      console.log(options);
      const content = [
        "电话 : 010-84107000   邮编 : 100102",
        "地址 : 北京市望京阜通东大街方恒国际中心A座16层</div></div>",
      ];
      const infoWindow = new state.AMap.InfoWindow({
        content,
      });
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
