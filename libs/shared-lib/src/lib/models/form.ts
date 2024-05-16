export interface FormConfig {
  key?: string
  placeholder?: string
  type?: string
  disabled? : boolean,
  class?: string
  label?: string
  validators?: validationBuilder
  dataOptions?:any
  options? : any,
  template? : any,
  hidden? : boolean,
  addBtn? : boolean,
  firstValue? : any
  templateBlocked? : string,
  required? :boolean,
  customError?:string,
  customErrorMessage?:string
}
export interface validationBuilder {
  message? : String;
  validation? : any;
  PatternMessage? : String;
  minLengthMessage? : String;
  maxLengthMessage? : String

}
export enum FormTypes {
  select = 'select',
  multiSelect = 'multiSelect',
  date = 'date',
  text = 'text',
  password = 'password',
  number = 'number',
  inputWithIcon = 'inputWithIcon',
  switch='switch',
  dateYear = 'dateYear',
  checkBox = 'checkBox',
  textArea = 'textArea',
  time = "time",
  year = "year",

}



