import { IsUUID } from 'class-validator';

export class FindProducerDto {
  @IsUUID('all', { message: 'O ID deve ser um UUID válido' })
  id: string;
}