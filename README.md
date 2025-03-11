# Brain Agriculture API

## Descrição
Este projeto é uma API desenvolvida com **NestJS**, com o objetivo de gerenciar informações sobre fazendas, produtores, safras e culturas. A aplicação está configurada para rodar em um ambiente Docker, com o banco de dados **PostgreSQL** também em container.

## Pré-requisitos
Antes de rodar a aplicação, é necessário ter as seguintes ferramentas instaladas:
* Docker
* Docker Compose
* Node.js (para desenvolver e testar localmente)

## Configuração do Projeto

### Passos para Rodar o Projeto
1. **Build e Start no Docker Compose**

Para rodar a aplicação e o banco de dados em containers Docker, execute o seguinte comando:
```bash
docker compose up --build
```
```A instalação das dependências pode demorar um pouco```


2. **Verificando e usando a aplicação**

Depois de subir os containers, a API estará disponível em http://localhost:3000.

Para facilitar, as rotas podem ser acessadas e testadas através do endpoint http://localhost:3000/swagger.

Como nesse teste não foi abordado front-end, uma rota stats foi adicionada com informações que podem ser utilizadas em um dashboard.


### Como rodar Testes
Primeiro execute `npm install` na raiz do projeto, após isso execute `npm run test:cov`.


### Configuração do Banco de Dados fora do ambiente Docker
Para testar fora do ambiente do Docker um arquivo `.env` com a variável `DATABASE_URL` deve ser criada.