"use strict";
////////////////////////  Q1 Calculate Length of Sub Arrays  ////////////
console.log("Question 1 \n");
const array = [[1, 2, 3], [1, 2, 3], [1, 2, 3], [[1], [[2], [3]], [4]]];
// const array = [[1, 2, 3], [[1], [2], [3]], [1, 2, 3]];
// const array = [1, 2, 3];
function subArrayCount(array) {
    let count = 0;
    for (let i = 0; i < array.length; i++) {
        if (Array.isArray(array[i])) {
            count++;
            count = count + subArrayCount(array[i]);
        }
    }
    return count;
}
console.log(subArrayCount(array));
/////////////////////////////Q2 Capitalize Names ///////////////////
const arr = ["samuel", "MABELLE", "letitia", "meridith"];
const capitaliseNames = (names) => {
    const capitalNames = names.map(name => {
        return name.charAt(0).toUpperCase() + name.slice(1);
    });
    return capitalNames;
};
console.log("\n Question 2 \n");
console.log("Original", arr);
const result = capitaliseNames(arr);
console.log("Capitalise", result);
/////////////////////////Q3 Remove Duplicates //////////////////
const duplicates = [1, 0, 2, "he", 2, 0, 2, 1, 4, 5, 6, "he"];
const removeDuplicates = (arr) => {
    const withoutDuplicates = [];
    arr.map(dup => {
        withoutDuplicates.indexOf(dup) === -1 ? withoutDuplicates.push(dup) : null;
    });
    return withoutDuplicates;
};
const removed = removeDuplicates(duplicates);
console.log("\n Question 3 \n");
console.log("With Duplicates: ", duplicates);
console.log("Without Duplicates: ", removed);
////////////////////// Q4 Convert Key values in an Array of Object ////////
const obj = {
    D: 1,
    B: 2,
    C: 3,
    N: 4,
    X: 7,
    Z: 38,
    T: 21,
    S: "asb"
};
const objToArray = (obj) => {
    const resultArray = Object.keys(obj).map((item, index) => {
        return [item, Object.values(obj)[index]];
    });
    return resultArray;
};
const arrayOfObject = objToArray(obj);
console.log("\n Question4 \n");
console.log("Object ", obj);
console.log(arrayOfObject);
/////////////// Question 5 /////////////////////
const array1 = [1, 2, 3, 4, 4];
const array2 = [4, 5, 9];
const interSection = (arr1, arr2) => {
    const inter = [];
    arr1.map(item1 => {
        arr2.includes(item1) === true
            ? inter.includes(item1)
                ? null
                : inter.push(item1)
            : null;
    });
    return inter;
};
const unionTwoArrays = (arr1, arr2) => {
    const union = [];
    arr1.map(item => (union.includes(item) ? null : union.push(item)));
    arr2.map(item => (union.includes(item) ? null : union.push(item)));
    return union;
};
const intersectResult = interSection(array1, array2);
const unionResult = unionTwoArrays(array1, array2);
console.log("\nQuestion5\n");
console.log("Arrays", array1, " ", array2);
console.log("InterSection", intersectResult);
console.log("Union ", unionResult);
