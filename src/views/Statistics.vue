<template>
  <Layout>
    <tabs :data-source="recordtypeList" :value.sync="type" class-prefix="tags" />
    <tabs :data-source="intervalList" :value.sync="interval" class-prefix="interval"/>

      <ol>
        <li v-for="(groups,index) in result" :key="index">
         <h3 class="title">
           {{groups.title}}
         </h3>
          <ol>
            <li v-for="item in groups.items" :key="item.id"
                class="record" >
              <span>{{tagString(item.tags)}}</span>
              <span class="notes">{{item.notes}}</span>
              <span>￥{{item.amount}} </span>
            </li>
          </ol>
          </li>
      </ol>

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
    get recordList(){
      return this.$store.state.recordList as RecordItem[]

    }
    get result(){
      const recordList=this.recordList;
      const hashTable: {[key: string]: {title: string;items: RecordList}}={};
      for (let i=0;i<recordList.length;i++){
        const [date,time]=recordList[i].createdAt!.split('T')
        hashTable[date]=hashTable[date]||{title:date,items:[]}
        hashTable[date].items.push(recordList[i])
      }
      return hashTable

    }
    tagString(tags: Tag[]) {
      return tags.length === 0 ? '无' : tags.map(item=>item.name).join(',');
    }


    type='-';
intervalList=intervalList
    recordtypeList=recordtypeList
    interval='day';
created(){
  this.$store.commit('fetchRecord')


}

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
   %item {
     padding: 8px 16px;
     line-height: 24px;
     display: flex;
     justify-content: space-between;
     align-content: center;

   }
   .title {
     @extend %item;
   }
   .record {
     background: white;
     @extend %item;

   }
   .notes {
     margin-right: auto;
     margin-left: 16px;
     color: #999;
   }
</style>