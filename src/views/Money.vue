<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord"/>
    <Types :value.sync="record.type"/>
    <Notes @update:value="onUpdateNotes"/>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
  </Layout>

</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Watch} from 'vue-property-decorator';
  import NumberPad from '@/components/NumberPad.vue';
  import Types from '@/components/Types.vue';
  import Notes from '@/components/Notes.vue';
  import Tags from '@/components/Tags.vue';
  import model from '@/models/model';
  import tagListModel from '@/models/taglistModel';
  const recordList=model.fetch()
  const tagList=tagListModel.fetch()
  @Component(
    {components: {Tags, Notes, Types, NumberPad}})

  export default class Money extends Vue {
    tags = tagList;
    record: RecordItem={
      tags:[],
    notes:'',
    type:'-',
    amount:0 ,

  }
   recordList: RecordItem[]=recordList



    onUpdateTags(value: string[]) {
      this.record.tags=value;
    }

    onUpdateNotes(value: string) {
      this.record.notes =value
    }

    // onUpdateType(value: string) {
    //   this.record.type=value
    // }

    onUpdateAmount(value: string) {
    this.record.amount=parseFloat(value)
    }
    saveRecord(){
      const record2=model.clone(this.record)
      record2.createdAt=new Date()
      recordList.push(record2)
    }
    @Watch('recordList')
    onRecordListChanged(){
      model.save(recordList)
    }

  }
</script>
<style lang="scss">

  .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
</style>
<style lang="scss" scoped>

</style>