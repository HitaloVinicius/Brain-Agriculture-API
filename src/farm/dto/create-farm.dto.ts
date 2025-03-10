import { Transform } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";
import { StateType } from "@prisma/client";

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

  @IsNotEmpty()
  @IsEnum(StateType, { message: 'Estado inválido, use a sigla correta (ex: SP, RJ, RN)' })
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