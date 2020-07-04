type RecordItem = {
  tags: Tag[];
  notes: string;
  type: string;
  amount: number;
  createdAt?: string;
}
type RecordList=RecordItem[]
type Tag ={
  id: string;
  name: string;
}
type HashTable={
  title: string;
  total?: number;
  items: RecordList;
}[ ]
// type TagListModel={
//   data: Tag[];
//   fetch: () => Tag[];
//   create: (name: string) => 'success'|'duplicated';
//   update: (id: string,name: string) => 'success'|'duplicated'|'not find';
//   remove: (id: string) => boolean;
//   save: () => void;
// }
type RootState={
  recordList: RecordItem[];
  tagList: Tag[];
  CurrentTag?: Tag;
}