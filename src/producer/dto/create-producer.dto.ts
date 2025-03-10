import { IsNotEmpty, IsString, ValidateBy } from "class-validator";
import { cnpj, cpf } from 'cpf-cnpj-validator';

export class CreateProducerDto {
  @IsNotEmpty({ message: 'O documento não pode estar vazio.' })
  @IsString({ message: 'O documento deve ser uma string.' })
  @ValidateBy({
    name: 'isCpfOrCnpj',
    validator: {
      validate: (value: string) => {
        if (typeof value !== 'string') return false
        return cpf.isValid(value) || cnpj.isValid(value)
      },
      defaultMessage: () => 'Documento inválido. Insira um CPF ou CNPJ válido.',
    },
  })
  document: string

  @IsString({ message: 'O nome deve ser uma string.' })
  @IsNotEmpty({ message: 'O nome não pode estar vazio.' })
  name: string
}