import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedEmployeeEnums {
  get Gender(): typeof Gender {
    return Gender;
  }

  get MaritalStatus(): typeof MaritalStatus {
    return MaritalStatus;
  }

  get Religion(): typeof Religion {
    return Religion;
  }

  get MilitaryStatus(): typeof MilitaryStatus {
    return MilitaryStatus;
  }

  get BloodType(): typeof BloodType {
    return BloodType;
  }
}

export enum Gender {
  Male = 1,
  Female = 2,
}

export enum MaritalStatus {
  Single = 1,
  Married = 2,
  Divorced = 3,
  Widower = 4,
}

export enum Religion {
  Muslim = 1,
  Christian = 2,
  Other = 3,
}

export enum MilitaryStatus {
  Finished = 1,
  Exempted = 2,
  Postponed = 3,
  Unbidden = 4,
}

export enum BloodType {
  APositive = 0,
  ANegative,
  BPositive,
  BNegative,
  ABPositive,
  ABNegative,
  OPositive,
  ONegative,
}
