const intervals = [
  { id: 1, time: 3000 },
  { id: 2, time: 4000 },
  { id: 3, time: 1000 },
  { id: 4, time: 100 }
];

interface objecType {
  id: number;
  time: number;
}

const aSync = async (arr: objecType[]) => {
  arr.map(item => {
    setTimeout(() => {
      console.log(item.id);
    }, item.time);
  });
};
aSync(intervals);
