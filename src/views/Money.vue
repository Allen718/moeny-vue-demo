<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord"/>

    <div class="notesWrapper">
      <Notes @update:value="onUpdateDate"
             type="date"
             field-name="日期"
             :value="record.createdAt"
             placeholder="在这里输入日期"/>
      <Notes @update:value="onUpdateNotes"
             type="text"
             field-name="备注"
             :value="record.notes"
             placeholder="在这里输入备注"/>
    </div>
    <Tags @update:value="onUpdateTags"/>
    <tabs @update:value="onUpdateType"
          :data-source="recordtypeList" :value.sync="type"/>
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
    {
      components: {Tabs, Tags, Notes, NumberPad},
    },
  )
  export default class Money extends Vue {
    get recordList() {
      return this.$store.state.recordList as RecordItem[];
    }

    record: RecordItem = {
      tags: [],
      notes: '',
      type: '-',
      amount: 0,
      createdAt: new Date().toISOString()

    };
    recordtypeList = recordtypeList;
    type = '-';


    created() {
      this.$store.commit('fetchRecord');
    }


    onUpdateNotes(value: string) {
      this.record.notes = value;
    }
    onUpdateDate(value: string) {
      this.record.createdAt = value;
    }
    onUpdateTags(value: Tag[]) {
      this.record.tags = value;
    }

    onUpdateType(value: string) {
      this.record.type = value;
    }

    onUpdateAmount(value: string) {
      this.record.amount = parseFloat(value);
    }

    saveRecord() {
      this.$store.commit('createRecord', this.record);
      this.record.notes = '';
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
  .notesWrapper {
    background: #f5f5f5;
    padding: 10px 0;
  }
</style>