<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord"/>
    <tabs :data-source="recordtypeList" :value.sync="type"/>
    <div class="notesWrapper">
    <Notes @update:value="onUpdateNotes" field-name="备注" placeholder="在这里输入备注"/>
    </div>
    <Tags @update:value="onUpdateTags"/>
  </Layout>

</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import NumberPad from '@/components/NumberPad.vue';
  import Notes from '@/components/Notes.vue';
  import Tags from '@/components/Tags.vue';
  import Tabs from '@/components/Tabs.vue';
  import recordtypeList from '@/constants/recordtypeList';

  @Component(
    {components: {Tabs, Tags, Notes, NumberPad},
   },
  )

  export default class Money extends Vue {
get recordList(){
  return this.$store.state.recordList as RecordItem[]
}
    record: RecordItem={
      tags:[],
    notes:'',
    type:'-',
    amount:0 ,

  }
  recordtypeList=recordtypeList
type='-'


created(){
      this.$store.commit('fetchRecord')
}



    onUpdateNotes(value: string) {
      this.record.notes =value
    }

onUpdateTags(value: Tag[]){
      this.record.tags=value
}
    onUpdateAmount(value: string) {
    this.record.amount=parseFloat(value)
    }
    saveRecord(){
      this.$store.commit('createRecord',this.record)
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