export interface AddEmployeePersonal {
    employeeCode: string;
    attendanceCode: number;
    employeeName: string;
    employeePhoto: string;
    birthDate: Date;
    countryOfBirth: string;
    birthCity: number;
    nationality: string;
    gender: Gender;
    maritalStatus: MaritalStatus;
    religion: Religion;
    militaryStatus: MilitaryStatus;
    militaryNumber?: string;
    bloodType?: BloodType;
    withSpecialNeeds: boolean;
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
    APositive = "A+",
    ANegative = "A-",
    BPositive = "B+",
    BNegative = "B-",
    ABPositive = "AB+",
    ABNegative = "AB-",
    OPositive = "O+",
    ONegative = "O-",
}
