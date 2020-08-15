<template>
  <div>
    <label class="notes">
      <span class="name">{{this.fieldName}}</span>
      <template v-if="type==='text'">
        <input :type="type" :placeholder="this.placeholder"
               :value="this.value"
               @input="onValueChanged($event.target.value)">
      </template>
      <template v-else>
        <input :type="type" :placeholder="this.placeholder"
               :value="x(value)"
               @input="onValueChanged($event.target.value)">
      </template>

    </label>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop, Watch} from 'vue-property-decorator';
  import dayjs from 'dayjs';

  @Component
  export default class Notes extends Vue {
    @Prop({default: ''}) value!: string;
    @Prop({required: true}) fieldName!: string;
    @Prop() placeholder?: string;
    @Prop() type?: string;

    x(isoString: string) {
      return dayjs(isoString).format('YYYY-MM-DD');
    }

    @Watch('value')
    onValueChanged(value: string) {
      this.$emit('update:value', value);
    }
  }
</script>


<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";
  @import "~@/assets/style/reset.scss";

  .notes {
    font-size: 14px;
    padding-left: 16px;
    display: flex;
    align-items: center;

    .name {
      padding-right: 16px;
    }

    input {
      height: 44px;
      flex-grow: 1;
      background: transparent;
      border: none;
      padding-right: 16px;
    }
  }
</style>