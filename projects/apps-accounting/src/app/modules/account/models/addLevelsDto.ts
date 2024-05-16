export interface listAddLevelsDto{
  levels:AddLevelsDto[]
}

export interface AddLevelsDto {
    id?: number,
    name: string,
    levelNumber: number,
    numberOfDigits: number
  }