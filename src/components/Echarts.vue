<template>
  <div ref="chartsWrapper" class="EchartsWrapper">
  </div>
</template>
<script lang="ts">
  import {Component, Prop,Vue} from 'vue-property-decorator';
  import Echarts, {EChartOption} from 'echarts';
  @Component
  export default class Echart extends Vue {
 @Prop()options?: EChartOption
    mounted(){
   if(this.options===undefined){
    return  console.error('options为空')
   }
      const myChart = Echarts.init(this.$refs.chartsWrapper as HTMLDivElement);
      myChart.setOption(this.options)
    }


  }

</script>
<style lang="scss" scoped>
  .EchartsWrapper{
    width: 100%;
    height:400px;
  }
</style>