import { BloodType, Gender, MaritalStatus, MilitaryStatus, Religion } from "./shared-employee-enums";

export interface GetEmployeeById {
    id: number;
    employeeCode: string;
    attendanceCode: number;
    employeeName: string;
    employeePhoto: string;
    birthDate: string;
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