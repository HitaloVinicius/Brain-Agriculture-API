import { BadRequestException, ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { cnpj, cpf } from 'cpf-cnpj-validator';
import { PrismaService } from '../db/prisma.service';
import { maskPartialDocument } from '../shared/utils/maskPartialDocument';
import { CreateProducerDto } from './dto/create-producer.dto';
import { UpdateProducerDto } from './dto/update-producer.dto';

@Injectable()
export class ProducerService {
  private readonly logger = new Logger(ProducerService.name)
  constructor(private prisma: PrismaService) { }

  async create(data: CreateProducerDto) {
    if (!cpf.isValid(data.document) && !cnpj.isValid(data.document)) {
      this.logger.error('BadRequestException -- Documento inválido. Insira um CPF ou CNPJ válido.')
      throw new BadRequestException('Documento inválido. Insira um CPF ou CNPJ válido.')
    }

    const producerExists = await this.prisma.producers.findUnique({
      where: { document: data.document.replace(/[^0-9]/g, '') }
    })
    if (producerExists) {
      this.logger.error('ConflictException -- Já existe um produtor com esse documento.')
      throw new ConflictException('Já existe um produtor com esse documento.')
    }

    const producer = await this.prisma.producers.create({
      data: {
        ...data,
        document: data.document.replace(/[^0-9]/g, ''),
        document_type: cpf.isValid(data.document) ? 'CPF' : 'CNPJ'
      },
    });

    this.logger.log('create -- Success')
    return {
      message: 'Produtor criado com sucesso!',
      producerId: producer.id,
    };
  }

  async findAll(
    page: number = 1,
    perPage: number = 10
  ) {
    const result = await this.prisma.producers.findMany({
      skip: (page - 1) * perPage,
      take: perPage,
      select: {
        id: true,
        name: true,
        document_type: true
      },
    });
    this.logger.log('findAll -- Success')
    return result
  }

  async findOne(id: string) {
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
    if (!producer) {
      this.logger.error('NotFoundException -- Produtor não encontrado')
      throw new NotFoundException('Produtor não encontrado')
    }
    this.logger.log('findOne -- Success')
    return { ...producer, document: maskPartialDocument(producer.document) }
  }

  async update(id: string, data: UpdateProducerDto) {
    const producerExists = await this.prisma.producers.findUnique({ where: { id } })
    if (!producerExists) {
      this.logger.error('NotFoundException -- Produtor não encontrado')
      throw new NotFoundException('Produtor não encontrado')
    }

    await this.prisma.producers.update({
      where: { id },
      data
    })
    this.logger.log('update -- Success')
    return {
      message: 'Produtor editado com sucesso!',
      producerId: id,
    };
  }

  async remove(id: string) {
    const producerExists = await this.prisma.producers.findUnique({ where: { id } })
    if (!producerExists) {
      this.logger.error('NotFoundException -- Produtor não encontrado')
      throw new NotFoundException('Produtor não encontrado')
    }

    await this.prisma.producers.delete({
      where: { id }
    })
    this.logger.log('remove -- Success')
    return {
      message: 'Produtor excluído com sucesso!',
      producerId: id,
    };
  }
}