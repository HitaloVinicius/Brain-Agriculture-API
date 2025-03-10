import { IsNotEmpty, IsString, IsUUID } from "class-validator"

export class CreateHarvestDto {
  @IsNotEmpty()
  @IsUUID()
  farm_id: string

  @IsString()
  @IsNotEmpty()
  name: string
}