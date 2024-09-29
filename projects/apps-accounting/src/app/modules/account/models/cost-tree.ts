export interface costTree {
    id: number,
    label: string,
    code: string,
    parentId: number,
    isDetail: boolean,
    isActive: boolean,
    children: costTree[]
}