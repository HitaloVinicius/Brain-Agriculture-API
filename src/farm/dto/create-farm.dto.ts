import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class CreateFarmDto {
  @IsNotEmpty()
  @IsUUID()
  producer_id: string

  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  city: string

  @IsString()
  @IsNotEmpty()
  state: string

  @IsNumber()
  @IsNotEmpty()
  total_area: number

  @IsNumber()
  @IsNotEmpty()
  agricultural_area: number

  @IsNumber()
  @IsNotEmpty()
  vegetation_area: number
}