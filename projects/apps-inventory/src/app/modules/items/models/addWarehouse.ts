export interface AddWarehouse {
    id? :number
    code: string
    name: string
    warehouseType: string
    branchId: number
    city: string
    addressLine: string
    phone: string
    fax: string
    postalCode: string
    email: string
    longitude: number
    latitude: number
    radius: number
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
  