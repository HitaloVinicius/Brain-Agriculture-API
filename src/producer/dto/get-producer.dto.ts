import { Transform } from "class-transformer"
import { IsNumber, IsOptional } from "class-validator"

export class GetProducerDto {
  @IsOptional()
  @IsNumber({}, { message: 'O parâmetro page deve ser um número' })
  @Transform(({ value }) => Number(value))
  page?: number

  @IsOptional()
  @IsNumber({}, { message: 'O parâmetro per_page deve ser um número' })
  @Transform(({ value }) => Number(value))
  per_page?: number
}