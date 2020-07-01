import clone from '@/lib/clone';

const localStorageKeyName='recordList'
const model={
  data:[] as RecordItem [],
  create(record: RecordItem){
    const record2=clone(record)
    record2.createdAt=new Date()
    this.data.push(record2)
  },
  fetch(){
  this.data= JSON.parse(localStorage.getItem( localStorageKeyName)||'[]')
 return this.data

  },
  save(){
    window.localStorage.setItem(localStorageKeyName,JSON.stringify(this.data))
  }
}
export default model