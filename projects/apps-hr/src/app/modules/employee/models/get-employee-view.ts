import { BloodType, Gender, MaritalStatus, MilitaryStatus, Religion } from "./shared-employee-enums";

export class GetEmployeeView {
    id: number;
    employeeCode: string;
    attendanceCode: number;
    employeeName: string;
    employeePhoto: string;
    birthDate: string;
    countryOfBirth: string;
    birthCity: string;
    nationality: string;
    gender: Gender;
    maritalStatus: MaritalStatus;
    religion: Religion;
    militaryStatus: MilitaryStatus;
    militaryNumber?: string;
    bloodType?: BloodType;
    withSpecialNeeds: boolean;
}