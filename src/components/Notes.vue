<template>
  <div>

    <label class="notes">
      <span class="name">{{this.fieldName}}</span>
      <input type="text" :placeholder="this.placeholder"
             :value="this.value"
             @input="onValueChanged($event.target.value)"
      >
    </label>
  </div>
</template>
<script lang="ts">
  import Vue from "vue"
  import {Component, Prop, Watch} from 'vue-property-decorator';
  @Component
  export default class Notes extends Vue{

//     Input(event:KeyboardEvent){
// const input=event.target as HTMLInputElement
//       this.value=input.value
//     }
    @Prop({default:''})value!: string
    @Prop({required:true})fieldName!: string
    @Prop()placeholder?: string
  @Watch('value')
  onValueChanged(value: string){
    this.$emit('update:value',value)
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