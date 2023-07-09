
export class ID {
    constructor(private value: number) { }

    get(): number {
        return this.value;
    }

    static cast(value: number): ID {
        if (!Number.isInteger(value) || value <= 0) {
            throw new Error("Invalid ID value");
        }
        return new ID(value);
    }
}

export interface MasterTable {
    id: ID;
    data: string;
    createdBy: UserID;
    updatedBy: UserID;
    updatedAt: YearMonthDate;
}

export class UserID extends ID { }

export interface YearMonthDate {
    value: string;
}

export function isYearMonthDate(obj: any): obj is YearMonthDate {
    return typeof obj === "object" && /^(\d{4})(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/.test(obj.value);
}

// export class YearMonthDate {
//     private value: string;
  
//     private constructor(value: string) {
//       this.value = value;
//     }
  
//     static isValid(value: string): boolean {
//       return /^(\d{4})(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/.test(value);
//     }
  
//     static cast(value: string): YearMonthDate {
//       if (!YearMonthDate.isValid(value)) {
//         throw new Error("Invalid YearMonthDate format");
//       }
      
//       return new YearMonthDate(value);
//     }
  
//     get(): string {
//       return this.value;
//     }
//   }