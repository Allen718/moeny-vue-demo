<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord"/>
    <Types :value.sync="record.type"/>
    <div class="notesWrapper">
    <Notes @update:value="onUpdateNotes" field-name="备注" placeholder="在这里输入备注"/>
    </div>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
  </Layout>

</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import NumberPad from '@/components/NumberPad.vue';
  import Types from '@/components/Types.vue';
  import Notes from '@/components/Notes.vue';
  import Tags from '@/components/Tags.vue';
  import store from '@/store/index2';


  const recordList=store.recordList

  @Component(
    {components: {Tags, Notes, Types, NumberPad}})

  export default class Money extends Vue {
    tags = store.tagList;
    record: RecordItem={
      tags:[],
    notes:'',
    type:'-',
    amount:0 ,

  }
   recordList?: RecordItem[]=recordList



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
   store.createRecord(this.record)
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
.notesWrapper{
  background: #f5f5f5;
  padding: 10px 0;
}
</style>