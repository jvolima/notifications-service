# Notifications service (Aplicação desenvolvida no ignite lab)

## Tecnologias utilizadas
- Node
- NestJS
- Prisma
- Jest
- Kafka
- Docker
- Postgres

## Conhecimentos
- SOLID
- In memory database para testes unitários
- Desacoplamento
- Mappers e View Models (conversão de dados)
- Factories
- Microserviços

## Kafka
- Serviço de mensageria
- Producers: quem manda eventos
- Consumers: quem busca eventos
- Topics: eventos
- Exemplo ecommerce: Quando acontece uma compra no serviço de checkout, ele manda o evento para o kafka. Os consumers que podem ser o serviço de nota fiscal, serviço de entrega, etc, irão buscar esse evento. Os consumers buscam o evento e não o kafka que envia pois caso o serviço de nota fiscal estiver fora do ar no momento da compra, assim que ele voltar ele irá buscar todos os eventos que aconteceram enquanto o serviço estava off.


## Milha extra
- [] Testes e2e
- [x] Docker
