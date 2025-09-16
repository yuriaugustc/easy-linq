import { Enumerable } from "@models/enumerable";

export class ManageArray {
  private static _cores = navigator.hardwareConcurrency || 4;
  private static _thresholdingChunk = 100;
  private static _predicateCostFactor = 100; // TODO: check this later

  static chunk<T>(arr: Enumerable<T>, chunkSize: number): T[][] {
    if(!arr || arr.length <= 0) return [];

    let chunks: T[][] = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunks[i] = arr.slice(i, i + chunkSize);
    }

    return chunks;
  }

  static* chunkLazy<T>(arr: Enumerable<T>, chunkSize: number): Generator<T[], void> {
    if(!arr || arr.length <= 0) yield [];

    for (let i = 0; i < arr.length; i += chunkSize) {
      yield arr.slice(i, i + chunkSize);
    }
  }

  static automaticChunk<T>(arr: Enumerable<T>) {
    if(!arr || arr.length <= 0) return [];

    return this.chunk(
      arr,
      this.calculateChunks(arr.length)
    );
  }

  private static calculateChunks(arrayLength: number): number {
    if (arrayLength <= this._thresholdingChunk) 
      return 1;

    return Math.max(
      1, 
      Math.min(
        Math.floor(
          Math.log2(arrayLength)
        ), 
        this._cores
      )
    );
  }
}