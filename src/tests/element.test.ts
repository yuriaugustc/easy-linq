import { describe, it, expect } from "vitest";
import { Enumerable } from "@models/enumerable";
import { ElementNotFoundError } from "@errors/element-not-found";
import { InvalidUniquenessError } from "@errors/invalid-uniqueness";

describe("first", () => {
  it("deve devolver o numero 2", () => {
    const result = Enumerable.from([1, 2, 3, 4]).first(el => el >= 2);
    expect(result).toBe(2);
  });
});

describe("first", () => {
  it("deve lançar uma excecao de nao encontrado", () => {
    expect(() => {
      Enumerable.from([1, 2, 3, 4]).first(el => el > 4)
    }).toThrowError(ElementNotFoundError);
  });
});

describe("first", () => {
  it("deve devolver o numero 1", () => {
    const result = Enumerable.from([1, 2, 3, 4]).first();
    expect(result).toBe(1);
  });
});

describe("firstOrDefault", () => {
  it("deve devolver default como zero", () => {
    const result = Enumerable.from([1, 2, 3, 4]).firstOrDefault(el => el > 4, 0);
    expect(result).toBe(0);
  });
});

describe("firstOrDefault", () => {
  it("deve devolver default como undefined", () => {
    const result = Enumerable.from([1, 2, 3, 4]).firstOrDefault(el => el > 4);
    expect(result).toBeUndefined();
  });
});

describe("firstOrDefault", () => {
  it("deve devolver o numero 1", () => {
    const result = Enumerable.from([1, 2, 3, 4]).firstOrDefault();
    expect(result).toBe(1);
  });
});

describe("last", () => {
  it("deve encontrar o numero 2", () => {
    const result = Enumerable.from([1, 2, 3, 4]).last(el => el < 3);
    expect(result).toBe(2);
  });
});

describe("last", () => {
  it("deve lançar uma excecao de nao encontrado", () => {
    expect(() => {
      Enumerable.from([1, 2, 3, 4]).last(el => el > 4)
    }).toThrowError(ElementNotFoundError);
  });
});

describe("last", () => {
  it("deve encontrar o numero 4", () => {
    const result = Enumerable.from([1, 2, 3, 4]).last();
    expect(result).toBe(4);
  });
});

describe("lastOrDefault", () => {
  it("deve devolver default como zero", () => {
    const result = Enumerable.from([1, 2, 3, 4]).lastOrDefault(el => el > 4, 0);
    expect(result).toBe(0);
  });
});

describe("lastOrDefault", () => {
  it("deve devolver default como undefined", () => {
    const result = Enumerable.from([1, 2, 3, 4]).lastOrDefault(el => el > 4);
    expect(result).toBeUndefined();
  });
});

describe("lastOrDefault", () => {
  it("deve devolver o numero 4", () => {
    const result = Enumerable.from([1, 2, 3, 4]).lastOrDefault();
    expect(result).toBe(4);
  });
});

describe("single", () => {
  it("deve encontrar o numero 3 apenas uma vez", () => {
    const result = Enumerable.from([1, 2, 3, 4]).single(el => el == 3);
    expect(result).toBe(3);
  });
});

describe("single", () => {
  it("deve lançar uma excecao de unicidade invalida", () => {
    expect(() => {
      Enumerable.from([1, 2, 3, 3]).single(el => el == 3)
    }).toThrowError(InvalidUniquenessError);
  });
});

describe("single", () => {
  it("deve devolver 1", () => {
    const result = Enumerable.of(1).single();
    expect(result).toBe(1);
  });
});

describe("single", () => {
  it("deve lançar uma excecao de unicidade invalida (sem predicado)", () => {
    expect(() => {
      Enumerable.from([1, 2, 3, 3]).single();
    }).toThrowError(InvalidUniquenessError);
  });
});

describe("singleOrDefault", () => {
  it("deve devolver default como zero", () => {
    const result = Enumerable.from([1, 2, 3, 4]).singleOrDefault(el => el > 4, 0);
    expect(result).toBe(0);
  });
});

describe("singleOrDefault", () => {
  it("deve devolver default como undefined", () => {
    const result = Enumerable.from([1, 2, 3, 4]).singleOrDefault(el => el > 4);
    expect(result).toBeUndefined();
  });
});

describe("elementAt", () => {
  it("deve encontrar o numero 2", () => {
    const result = Enumerable.from([1, 2, 3, 4]).elementAt(1);
    expect(result).toBe(2);
  });
});

describe("elementAt", () => {
  it("deve lançar uma excecao de fora do range (acima do tamanho do array)", () => {
    expect(() => {
      Enumerable.from([1, 2, 3, 4]).elementAt(6)
    }).toThrowError(RangeError);
  });
});

describe("elementAt", () => {
  it("deve lançar uma excecao de fora do range (valor negativo)", () => {
    expect(() => {
      Enumerable.from([1, 2, 3, 4]).elementAt(-10)
    }).toThrowError(RangeError);
  });
});

describe("elementAtOrDefault", () => {
  it("deve devolver default como zero", () => {
    const result = Enumerable.from([1, 2, 3, 4]).elementAtOrDefault(6, 0);
    expect(result).toBe(0);
  });
});

describe("elementAtOrDefault", () => {
  it("deve devolver default como undefined", () => {
    const result = Enumerable.from([1, 2, 3, 4]).elementAtOrDefault(-10);
    expect(result).toBeUndefined();
  });
});