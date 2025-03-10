import { IsNotEmpty, IsString } from "class-validator"

export class UpdateHarvestDto {
  @IsString()
  @IsNotEmpty()
  name: string
}