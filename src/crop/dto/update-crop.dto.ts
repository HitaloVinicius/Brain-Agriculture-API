import { IsNotEmpty, IsString } from "class-validator"

export class UpdateCropDto {
  @IsString()
  @IsNotEmpty()
  name: string
}