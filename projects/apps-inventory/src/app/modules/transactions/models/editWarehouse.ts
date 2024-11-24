export interface EditWareHouse {
    id : number
    code: string
    name: string
    warehouseType: string
    branchWarehouses: number[]
    addressWarehouse: AddressWarehouse
    warehouseAccount: WarehouseAccount
  }
  
  export interface AddressWarehouse {
    city: string
    addressLine: string
    phone: string
    fax: string
    postalCode: string
    email: string
    longitude: number
    latitude: number
    radius: number
  }
  
  export interface WarehouseAccount {
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