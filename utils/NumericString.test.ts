import { describe, expect, test } from "bun:test";
import { NumericString } from "./NumericString";

describe("NumericString", () => {
  test("a === b", () => {
    const a = new NumericString("12165419465165416916516");
    const b = new NumericString("12165419465165416916516");
    expect(a.eq(b)).toBe(true);
    expect(a.gte(b)).toBe(true);
    expect(a.gt(b)).toBe(false);
    expect(a.lte(b)).toBe(true);
    expect(a.lt(b)).toBe(false);
  });

  test("a > b (different length)", () => {
    const a = new NumericString("65416546554546546541654165411654");
    const b = new NumericString("315616854165416135154654657");
    expect(a.eq(b)).toBe(false);
    expect(a.gte(b)).toBe(true);
    expect(a.gt(b)).toBe(true);
    expect(a.lte(b)).toBe(false);
    expect(a.lt(b)).toBe(false);
  });

  test("a > b (same length)", () => {
    const a = new NumericString("6541654656546549161187413125");
    const b = new NumericString("6156168745416516516741311165");
    expect(a.eq(b)).toBe(false);
    expect(a.gte(b)).toBe(true);
    expect(a.gt(b)).toBe(true);
    expect(a.lte(b)).toBe(false);
    expect(a.lt(b)).toBe(false);
  });

  test("a < b (different length)", () => {
    const a = new NumericString("6156168745416516516741311165");
    const b = new NumericString("6541654656546549161187413125654");
    expect(a.eq(b)).toBe(false);
    expect(a.gte(b)).toBe(false);
    expect(a.gt(b)).toBe(false);
    expect(a.lte(b)).toBe(true);
    expect(a.lt(b)).toBe(true);
  });

  test("a < b (same length)", () => {
    const a = new NumericString("6156168745416516516741311165");
    const b = new NumericString("6541654656546549161187413125");
    expect(a.eq(b)).toBe(false);
    expect(a.gt(b)).toBe(false);
    expect(a.gte(b)).toBe(false);
    expect(a.lt(b)).toBe(true);
    expect(a.lte(b)).toBe(true);
  });
});
