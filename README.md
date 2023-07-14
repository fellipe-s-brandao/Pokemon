# Pokemon

## Para rodar o Back-end:
* `npm install` para instalar as depêndencias do projeto.
* `npm run start` para iniciar o projero.
* O servidor será criado na porta 3334
* Link api: http://pokemon.fellipebrandao.com

## Para iniciar o Banco de dados:
* O docker-composer deve estar instalado na máquina e em seguida rode o comando `docker-compose up -d`

## Para rodar os Testes Unitários:
* `npm run test` inicia todos os testes do useCases.

## Implementações
* Back-end em nodeJs com TypeScript
* Docker com banco Postgrees
* Utilização do Sequelize
* Padrão de projeto SOLID - Utilização de todos os conceitos do solid, como injeção de dependências, responsabilidade única, etc...
* Clean Architecture
* Documentação no Swagger
* Testes unitários com Jest

## Documentação
* Ao iniciar o servidor automaticamente é levantado uma pagina do Swagger com a documentação da api, onde é possível fazer testes nas rotas.
* Link: http://pokemon.fellipebrandao.com/api-docs/

## Hospedagem
* Servidor Oracle
* Build do Typescritp e pm2
