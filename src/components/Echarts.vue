<template>
  <div ref="chartsWrapper" class="EchartsWrapper">
  </div>
</template>
<script lang="ts">
  import {Component, Prop,Vue,Watch} from 'vue-property-decorator';
  import echarts, {EChartOption, ECharts} from 'echarts';
  @Component
  export default class Echart extends Vue {
    chart?: ECharts ;
  @Prop()options?: EChartOption
    @Watch('options')
    onOptionsChanged(val: EChartOption) {
        this.chart!.setOption(val);

    }
    mounted(){
      if (this.options === undefined) {
        return console.error('options 为空');
      }else{
        this.$refs
        this.chart = echarts.init(this.$refs.chartsWrapper as HTMLDivElement);
        this.chart.setOption(this.options)
      }

    }


  }

</script>
<style lang="scss" scoped>
  .EchartsWrapper{
    width: 100%;
    height:40vh;
  }
</style>