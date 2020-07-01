
import recordStore from '@/store/recordliststore';
import tagStore from '@/store/tagliststore';
const store={
 ...recordStore,
   ...tagStore

}
export default store