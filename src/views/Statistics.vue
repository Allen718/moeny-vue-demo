<template>
  <Layout>
    <tabs :data-source="recordtypeList" :value.sync="type" class-prefix="tags"/>
   <div class="echartsWrapper"  ref="echarts">
     <Echarts :options="x"/>
   </div>
    <ol>
      <li v-for="(group,index) in groupList" :key="index">
        <h3 class="title">
          {{beautify(group.title)}}<span>{{group.total}}</span>
        </h3>
        <ol>
          <li v-for="item in group.items" :key="item.id"
              class="record">
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
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Tabs from '@/components/Tabs.vue';
  import recordtypeList from '@/constants/recordtypeList';
  import dayjs, {isDayjs} from 'dayjs';
  import clone from '@/lib/clone';
  import Echarts from '@/components/Echarts.vue';
    import _ from 'lodash'

  @Component({
      components: {Tabs, Types, Echarts}
    }
  )
  export default class Statistics extends Vue {

    type = '-';
    recordtypeList = recordtypeList;
    created() {
      this.$store.commit('fetchRecord');
    }
get x(){
const part1=(this.recordList.map(r => _.pick(r, ['createdAt','amount']
  )));
  const today=dayjs().format('YYYY-MM-DD')
  const array=[]
   for(let i=0;i<=28;i++){
    const  date=dayjs(today).subtract(i,'day').format('YYYY-MM-DD')
    const part2=part1.filter(item=>item.createdAt===date)
     if(part2.length>=1){
      const value= part2.reduce((sum,i)=>{sum+=i.amount
       return sum},0)
       array.push({date:date,value:value})
    }else{
       array.push({date:date,value:0})
     }

   }
   array.sort((a,b)=>{
     if(a.date>b.date){return 1}
     else if(a.date===b.date){return 0}
     else{return -1}
   })
 const keys=array.map(item=>item.date)
  const values=array.map(item=>item.value)




  return{
        grid:{
          left:0,
          right:0
        },
    tooltip:{
      show:true,
      formatter:'{c}',
      position:'top',
      backgroundColor:'#1F01FF'
    },
        xAxis: {
          type: 'category',
          axisLabel:{
              formatter: function (value: string, index: number) {
                return value.substr(5)
              }

          },
          axisTick: {
            alignWithLabel:true
          },
          data: keys,
        },
        yAxis: {
          type: 'value',
          show:false,
        },
        series: [{
            symbolSize:15,
            symbol: 'circle',
          itemStyle:{
            color:'#1F01FF',
          },
          data: values,
          type: 'line'
        },
          ],

      }

}
mounted(){
  const div=(this.$refs.echarts as HTMLDivElement)
  div.scrollLeft=div.scrollWidth
}
    get recordList() {
      return this.$store.state.recordList as RecordItem[];
    }

    get groupList() {
      const recordList = this.recordList;
      const newList = clone(recordList).filter(item => item.type === this.type).sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
     if(newList.length===0){return [] as HashTable}
      const hashTable: HashTable = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]]}];
      for (let i = 1; i < newList.length; i++) {
        const current = newList[i];

        const last = hashTable[hashTable.length - 1];
        if (dayjs(current.createdAt).isSame(dayjs(last.title), 'day')) {
          last.items.push(current);
        } else {
          hashTable.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]});
        }

      }
      hashTable.map(group => {
        group.total = group.items.reduce((sum, item) => {return sum + item.amount;}, 0);
      });
      return hashTable;
    }

    tagString(tags: Tag[]) {
      return tags.length === 0 ? '无' : tags.map(item => item.name).join(',');
    }

    beautify(string: string) {
      const now = new Date();

      if (dayjs(string).isSame(now, 'day')) {
        return '今天';
      } else if (dayjs(string).isSame((now.valueOf() - 86400 * 1000), 'day')) {
        return '昨天';
      } else if (dayjs(string).isSame(dayjs().subtract(2, 'day'), 'day')) {
        return '前天';
      } else if (dayjs(string).isSame(now, 'year')) {
        return dayjs(string).format('M月D日');
      } else {
        return dayjs(string).format('yyyy年MM月DD日');
      }
    }
  }
</script>

<style lang="scss" scoped>
  .echartsWrapper{
    overflow: auto;
    &::-webkit-scrollbar { display: none }
    >div{
      width: 430%;
      min-height: 40vh;
    }
  }
  ::v-deep .tags-item {
    background: white;

    &.selected {
      background: blue;
    }

    &::after {
      display: none;
    }
  }

  ::v-deep .interval-item {
    height: 46px;
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