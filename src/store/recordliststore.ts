
import clone from '@/lib/clone';
const localStorageKeyName='recordList'
let  data: RecordItem[]|undefined=undefined

const recordStore= {
  saveRecord(){
    window.localStorage.setItem(localStorageKeyName,JSON.stringify(data))
  },
  fetchRecord() {
    data = JSON.parse(localStorage.getItem(localStorageKeyName) || '[]')
    return data
  },

  recordList:data,

  createRecord:(record: RecordItem)=>{
    const record2=clone(record)
    record2.createdAt=new Date().toISOString()
     data&& data.push(record2)
     recordStore.saveRecord()
  },
}
recordStore.fetchRecord()
export default recordStore
