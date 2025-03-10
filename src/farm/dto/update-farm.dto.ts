import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { StateType } from "@prisma/client";
export class UpdateFarmDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  city: string

  @IsEnum(StateType, { message: 'Estado inválido, use a sigla correta (ex: SP, RJ, RN)' })
  @IsNotEmpty()
  state: StateType

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