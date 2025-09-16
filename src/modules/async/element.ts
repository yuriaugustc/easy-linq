import { Enumerable } from "@models/enumerable";
import { RunArray } from "@helpers/run-array";
import { ElementNotFoundError } from "@errors/element-not-found";
import { InvalidUniquenessError } from "@errors/invalid-uniqueness";

export async function firstAsync<T>(this: Enumerable<T>, predicate?: (item: T) => boolean): Promise<T> {
  const msg = 
    'The element was not found on the list. If you are not sure the item is on the list, use firstOrDefault';

  const item = predicate ? RunArray.simpleSearchFirst(this, predicate) : this[0];

  if(!item) throw new ElementNotFoundError(msg);

  return item;
}

export function firstOrDefault<T>(this: Enumerable<T>, predicate: (item: T) => boolean, defaultValue?: T): T | undefined {
  const item = predicate ? RunArray.simpleSearchFirst(this, predicate) : this[0];
  
  return item ?? defaultValue;
}

export function last<T>(this: Enumerable<T>, predicate: (item: T) => boolean): T {
  const msg = 
    'The element was not found on the list. If you are not sure the item is on the list, use lastOrDefault';

  const item = predicate ? RunArray.simpleSearchLast(this, predicate) : this[this.length-1];

  if(!item) throw new ElementNotFoundError(msg);

  return item;
}

export function lastOrDefault<T>(this: Enumerable<T>, predicate?: (item: T) => boolean, defaultValue?: T): T | undefined {
  const item = predicate ? RunArray.simpleSearchFirst(this, predicate) : this[this.length-1];
  
  return item ?? defaultValue;
}

export function single<T>(this: Enumerable<T>, predicate?: (item: T) => boolean): T {
  const notFoundMsg = 
    "The element was not found on the list. If you are not sure the item is on the list, use singleOrDefault.";

  const items = predicate ? RunArray.simpleSearch(this, predicate) : this;

  if (items.length === 0) {
    throw new ElementNotFoundError(notFoundMsg);
  }
  if (items.length > 1) {
    throw new InvalidUniquenessError();
  }

  return items[0]!;
}

export function singleOrDefault<T>(this: Enumerable<T>, predicate: (item: T) => boolean, defaultValue?: T): T | undefined {
  const items = predicate ? RunArray.simpleSearch(this, predicate) : this;

  if (items.length === 0 || items.length > 1) {
    return defaultValue;
  }

  return items[0]!;
}

export function elementAt<T>(this: Enumerable<T>, index: number): T {
  if(index < 0 || index >= this.length) {
    throw new RangeError();
  }
  
  return this[index]!;
}

export function elementAtOrDefault<T>(this: Enumerable<T>, index: number, defaultValue?: T): T | undefined {
  if(index < 0 || index >= this.length) {
    return defaultValue;
  }
  
  return this[index]!;
}