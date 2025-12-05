export class NumericString {
  protected value: string;

  constructor(value: string) {
    this.value = value.trim().replace(/^0+/, "");
    if (this.value.startsWith("-")) {
      throw new Error("Negative numeric string are not handled");
    }
  }

  eq(other: NumericString): boolean {
    if (this.value === other.value) {
      return true;
    }
    return false;
  }

  gt(other: NumericString): boolean {
    if (this.value.length > other.value.length) {
      return true;
    }

    if (this.value.length < other.value.length) {
      return false;
    }

    for (let i = 0; i < this.value.length; i++) {
      if (this.value[i] > other.value[i]) {
        return true;
      } else if (this.value[i] < other.value[i]) {
        return false;
      }
    }
    return false;
  }

  gte(other: NumericString): boolean {
    if (this.gt(other) || this.eq(other)) {
      return true;
    }
    return false;
  }

  lt(other: NumericString): boolean {
    return !this.gte(other);
  }

  lte(other: NumericString): boolean {
    if (this.lt(other) || this.eq(other)) {
      return true;
    }
    return false;
  }

  v() {
    return this.value;
  }
}
