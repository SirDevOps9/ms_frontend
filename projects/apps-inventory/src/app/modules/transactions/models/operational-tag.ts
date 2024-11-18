export interface IOperationalTag {
    pageInfoResult: any
    orderBy: any
    orderByDesc: boolean
    result: IOperationalTagResult[]
  }
  

  
  export interface IOperationalTagResult {
    id: number
    isActive: boolean
    code: string
    name: string
    operationType: string
    warehouseId: number
    warehouseName: string
    glAccountId: number
  }
  

  
    export interface AddOperatioalTag {
      id?:number
      code?: string
      name?: string
      operationType?: string
      warehouseId?: number
      glAccountId?: number
    }
    
  