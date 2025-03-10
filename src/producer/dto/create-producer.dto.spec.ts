import { CreateProducerDto } from './create-producer.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

describe('CreateProducerDto', () => {
  it('is invalid cpf', async () => {
    const params = {
      name: 'Leonard',
      document: '744.815.910-00'
    }
    const data = plainToInstance(CreateProducerDto, params)
    const result = await validate(data)
    expect(result).toHaveLength(1)
    expect(result[0].constraints?.isCpfOrCnpj).toEqual('Documento inválido. Insira um CPF ou CNPJ válido.')
  });

  it('is valid cpf', async () => {
    const params = {
      name: 'Leonard',
      document: '744.815.910-05'
    }
    const data = plainToInstance(CreateProducerDto, params)
    const result = await validate(data)
    expect(result).toHaveLength(0)
  });

  it('is valid cnpj', async () => {
    const params = {
      name: 'Leonard',
      document: '96855985000106'
    }
    const data = plainToInstance(CreateProducerDto, params)
    const result = await validate(data)
    expect(result).toHaveLength(0)
  });

  it('is null name', async () => {
    const params = {
      name: null,
      document: '96855985000106'
    }
    const data = plainToInstance(CreateProducerDto, params)
    const result = await validate(data)
    expect(result).toHaveLength(1)
    expect(result[0].constraints?.isNotEmpty).toEqual('O nome não pode estar vazio.')
  });

  it('is invalid name', async () => {
    const params = {
      name: 5,
      document: '96855985000106'
    }
    const data = plainToInstance(CreateProducerDto, params)
    const result = await validate(data)
    expect(result).toHaveLength(1)
    expect(result[0].constraints?.isString).toEqual('O nome deve ser uma string.')
  });


});