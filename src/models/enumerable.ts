import * as element from "@modules/sync/element";

export class Enumerable<T> extends Array<T> {
  constructor(iterable: T[] = []) {
    super();
    this.push(...iterable);
  }

  static of<T>(...items: T[]): Enumerable<T> {
    return new Enumerable(Array.of(...items));
  }

  static from<T>(items: Iterable<T> | ArrayLike<T>): Enumerable<T> {
    return new Enumerable(Array.from(items));
  }

  static isEnumerable<T>(obj: any): obj is Enumerable<T> {
    return obj instanceof Enumerable;
  }
}

export interface Enumerable<T> {
  first(predicate?: (item: T) => boolean): T;
  firstOrDefault(predicate?: (item: T) => boolean, defaultValue?: T): T | undefined;
  last(predicate?: (item: T) => boolean): T;
  lastOrDefault(predicate?: (item: T) => boolean, defaultValue?: T): T | undefined;
  single(predicate?: (item: T) => boolean): T;
  singleOrDefault(predicate?: (item: T) => boolean, defaultValue?: T): T | undefined;
  elementAt(index: number): T;
  elementAtOrDefault(index: number, defaultValue?: T): T | undefined;
}

// ELEMENT
Enumerable.prototype.first = element.first;
Enumerable.prototype.firstOrDefault = element.firstOrDefault;
Enumerable.prototype.last = element.last;
Enumerable.prototype.lastOrDefault = element.lastOrDefault;
Enumerable.prototype.single = element.single;
Enumerable.prototype.singleOrDefault = element.singleOrDefault;
Enumerable.prototype.elementAt = element.elementAt;
Enumerable.prototype.elementAtOrDefault = element.elementAtOrDefault;