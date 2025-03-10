import { IsNotEmpty, IsString, IsUUID } from "class-validator"

export class CreateCropDto {
  @IsNotEmpty()
  @IsUUID()
  harvest_id: string

  @IsString()
  @IsNotEmpty()
  name: string
}
