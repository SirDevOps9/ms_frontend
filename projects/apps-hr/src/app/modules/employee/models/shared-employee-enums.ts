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
  single = 1,
  married = 2,
  divorced = 3,
  widower = 4,
}

export enum Religion {
  Muslim = 1,
  Christian = 2,
  Other = 3,
}

export enum MilitaryStatus {
  finished = 1,
  exempted = 2,
  postponed = 3,
  unbidden = 4,
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
