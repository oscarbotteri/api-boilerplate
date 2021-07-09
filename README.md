# API boilerplate
Clean and simple REST/Graphql boilerplate API for NodeJS with ExpressJS

## Motivation
There are a lot of boilerplates out there, this is just one of them.

I created this boilerplate to be a simple boilerplate, and have a simple starting point for future projects.
I am not trying to create a micro-framework, or a boilerplate with ton of features that really I will never use.
If you are looking for a strong robust framework, I think [NestJS](https://nestjs.com/) will like you.

## Features
- DI using [TypeDI](https://github.com/pleerock/typedi)
- Input validation using [class-validator](https://github.com/typestack/class-validator)
- Awesome ORM using [TypeORM](https://typeorm.io/#/)
- Cool code using [routing-controllers](https://github.com/typestack/routing-controllers)
- Graphql support using [typegraphql](https://typegraphql.com/)
- Basic security using [helmet](https://helmetjs.github.io/)
- Simple and extensible logger using [winston](https://github.com/winstonjs/winston)
- Git hooks using [husky](https://www.npmjs.com/package/husky)
- Docker & docker-compose ready to use
- Basic authentication module ready to use

## Project structure
| Path | Description |
| --- | --- |
| config | Contains all project configs using this [package](https://www.npmjs.com/package/config) |
| src | Source code files |
| src/common | Common components used by different modules |
| src/common/enums | General enum types such http statuses, http methods, etc |
| src/common/middlewares | General middlewares like error handlers and request logs |
| src/common/services | General services like logger |
| src/modules | Conceptual modules |
| src/modules/status | Example module to get api status |
