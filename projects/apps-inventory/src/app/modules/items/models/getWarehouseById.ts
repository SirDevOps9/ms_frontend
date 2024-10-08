export interface GetWarehouseById {
    code: string
    name: string
    warehouseType: number
    branchWarehouses: BranchWarehouse[]
    isActive: boolean
    addressWarehouse: AddressWarehouseData
    warehouseAccount: WarehouseAccountData
  }
  
  export interface BranchWarehouse {
    branchId: string
    warehouseId: number
    warehouse: any
    domainEvents: any[]
  }
  
  export interface AddressWarehouseData {
    city: number
    addressLine: string
    countryCode: string
    phone: string
    fax: string
    postalCode: string
    email: string
    longitude: number
    latitude: number
    radius: number
  }
  
  export interface WarehouseAccountData {
    glAccountId: number
    cashSalesAccountId: number
    creditSalesAccountId: number
    salesReturnAccountId: number
    salesCostAccountId: number
    discountAccountId: number
    purchaseAccountId: number
    evaluationAccountId: number
    goodsInTransitAccountId: number
    adjustmentAccountId: number
  }
  