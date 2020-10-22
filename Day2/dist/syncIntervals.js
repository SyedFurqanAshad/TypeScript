"use strict";
const intervals2 = [
    { id: 1, time: 3000 },
    { id: 2, time: 4000 },
    { id: 3, time: 1000 },
    { id: 4, time: 100 },
    { id: 5, time: 5000 },
    { id: 6, time: 6000 }
];
const sync = async (arr) => {
    const iterate = (obj) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log(obj.id);
                resolve(obj.id);
            }, obj.time);
        });
    };
    for (let item of arr) {
        await iterate(item);
    }
};
sync(intervals2);
