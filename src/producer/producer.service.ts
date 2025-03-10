import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { cnpj, cpf } from 'cpf-cnpj-validator';
import { PrismaService } from '../db/prisma.service';
import { CreateProducerDto } from './dto/create-producer.dto';
import { UpdateProducerDto } from './dto/update-producer.dto';

@Injectable()
export class ProducerService {
  constructor(private prisma: PrismaService) { }
  //TODO renomear para o padrão nest
  async getProducers(
    page: number = 1,
    perPage: number = 10
  ) {
    return await this.prisma.producers.findMany({
      skip: (page - 1) * perPage,
      take: perPage,
      select: {
        id: true,
        name: true,
        document_type: true
      },
    });
  }

  async findProducer(id: string) {
    const producer = await this.prisma.producers.findUnique({
      where: { id },
      omit: {
        created_at: true,
        updated_at: true
      },
      include: {
        farms: {
          select: {
            id: true,
            name: true,
            city: true,
            state: true,
            total_area: true,
            agricultural_area: true,
            vegetation_area: true,
            harvests: {
              select: {
                id: true,
                name: true,
                crops: {
                  select: {
                    id: true,
                    name: true
                  }
                }
              }
            }
          }
        }
      }
    })
    if (!producer) throw new NotFoundException('Produtor não encontrado')
    return producer
  }

  async findProducerByDocument(document: string) {
    return await this.prisma.producers.findUnique({
      where: { document }
    })
  }

  async createProducer(data: CreateProducerDto) {
    if (!cpf.isValid(data.document) && !cnpj.isValid(data.document))
      throw new BadRequestException('Documento inválido. Insira um CPF ou CNPJ válido.')

    const producerExists = await this.findProducerByDocument(data.document.replace(/[^0-9]/g, ''))
    if (producerExists)
      throw new ConflictException('Já existe um produtor com esse documento.')

    const producer = await this.prisma.producers.create({
      data: {
        ...data,
        document: data.document.replace(/[^0-9]/g, ''),
        document_type: cpf.isValid(data.document) ? 'CPF' : 'CNPJ'
      },
    });

    return {
      message: 'Produtor criado com sucesso!',
      producerId: producer.id,
    };
  }

  async updateProducer(id: string, data: UpdateProducerDto) {
    const producerExists = await this.findProducer(id)
    if (!producerExists) throw new NotFoundException('Produtor não encontrado')

    await this.prisma.producers.update({
      where: { id },
      data
    })

    return {
      message: 'Produtor editado com sucesso!',
      producerId: id,
    };
  }

  async deleteProducer(id: string) {
    const producerExists = await this.findProducer(id)
    if (!producerExists) throw new NotFoundException('Produtor não encontrado')

    await this.prisma.producers.delete({
      where: { id }
    })

    return {
      message: 'Produtor excluído com sucesso!',
      producerId: id,
    };
  }
}