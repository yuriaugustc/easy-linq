import { Enumerable } from "@models/enumerable";
import { ManageArray } from "./manage-array";

export class RunArray {
  static simpleSearch<T>(arr: Enumerable<T>, predicate: (item: T) => boolean): T[] {
    let items = [];
    for(let item of arr) {
      if(predicate(item)) 
        items.push(item);
    }

    return items;
  }

  static simpleSearchFirst<T>(arr: Enumerable<T>, predicate: (item: T) => boolean): T | undefined {
    for(let item of arr) {
      if(predicate(item)) 
        return item;
    }

    return undefined;
  }

  static simpleSearchLast<T>(arr: Enumerable<T>, predicate: (item: T) => boolean): T | undefined {
    let itemFound = undefined;
    for(let item of arr) {
      if(predicate(item)) 
        itemFound = item;
    }

    return itemFound;
  }

  static async parallelSearch<T>(arr: Enumerable<T>, predicate: (item: T) => boolean): Promise<T[]> {
    const slicedArr = ManageArray.automaticChunk(arr);

    let promiseArr = [];
    for(let i = 0; i < slicedArr.length; i++) {
      promiseArr.push(
        new Promise<T>((resolve) => {
          const slice = slicedArr[i];
          if(!slice) return resolve(null as T);
          
          for(let item of slice) {
            if(predicate(item)) 
              return resolve(item);
          }
        })
      );
    }

    return await Promise.all(promiseArr);
  }

  static async parallelSearchFirst<T>(arr: Enumerable<T>, predicate: (item: T) => boolean): Promise<T | undefined> {
    const slicedArr = ManageArray.automaticChunk(arr);

    let promiseArr = [];
    for(let i = 0; i < slicedArr.length; i++) {
      promiseArr.push(
        new Promise<T | undefined>((resolve) => {
          let item = undefined
          const slice = slicedArr[i];
          if(!slice) return resolve(item);
          
          for(let item of slice) {
            if(predicate(item)) 
              return resolve(item);
          }

          return item;
        })
      );
    }

    return await Promise.any(promiseArr);
  }

  static async parallelSearchLast<T>(arr: Enumerable<T>, predicate: (item: T) => boolean): Promise<T | null> {
    const slicedArr = ManageArray.automaticChunk(arr);

    let promiseArr = [];
    for(let i = 0; i < slicedArr.length; i++) {
      promiseArr.push(
        new Promise<T>((resolve) => {
          const slice = slicedArr[i];
          let itemFound = null as T;
          if(!slice) return resolve(null as T);
          
          for(let item of slice) {
            if(predicate(item)) 
              itemFound = item;
          }

          return resolve(itemFound);
        })
      );
    }
  
    return (await Promise.all(promiseArr)).pop() ?? null as T;
  }
}