<template>
  <Layout>
    <tabs :data-source="recordtypeList" :value.sync="type" class-prefix="tags" />
    <tabs :data-source="intervalList" :value.sync="interval" class-prefix="interval"/>
  </Layout>
</template>

<script lang="ts">
  import Types from '@/components/Types.vue';
  import Vue from 'vue'
  import {Component} from 'vue-property-decorator';
  import Tabs from '@/components/Tabs.vue';
  import intervalList from '@/constants/intervalList';
  import recordtypeList from '@/constants/recordtypeList';
  @Component({
      components: {Tabs, Types}
  }

  )
  export default class Statistics extends Vue {
type='-';
intervalList=intervalList
   recordtypeList=recordtypeList
    interval='day';

  }
</script>

<style lang="scss" scoped>
   ::v-deep .tags-item{
   background: white;

    &.selected{
      background: #c4c4c4;
    }
    &::after{
      display: none;
    }
  }
  ::v-deep .interval-item{
height:46px;
  }
</style>