# API CLEAN NODE

![](https://github.com/valdirsillva/node-tdd-ddd-clean-architecture/blob/main/public/img/logo-course.png)

## Descrição do Projeto

Este projeto é uma API construída utilizando Node.js e TypeScript. O foco principal deste projeto é aplicar boas práticas de desenvolvimento, como TDD (Test-Driven Development), DDD (Domain-Driven Design), e Clean Architecture. Além disso, padrões de design (Design Patterns) e princípios SOLID são aplicados para garantir um código limpo, escalável e de fácil manutenção.

## Tecnologias Utilizadas
## Ferramentas Utilizadas

Este projeto utiliza uma variedade de ferramentas para garantir um desenvolvimento eficiente, testes abrangentes e uma arquitetura robusta. Abaixo está a lista das principais ferramentas e bibliotecas utilizadas:

- **NPM**: Gerenciador de pacotes do Node.js.
- **Typescript**: Superset de JavaScript que adiciona tipagem estática.
- **Git**: Sistema de controle de versão distribuído.
- **Docker**: Plataforma para desenvolvimento, envio e execução de aplicações em containers.
- **Jest**: Framework de testes JavaScript para garantir a qualidade do código.
- **MongoDB**: Banco de dados NoSQL orientado a documentos.
- **Travis CI**: Serviço de integração contínua para testar e implantar o projeto.
- **Bcrypt**: Biblioteca para hashing de senhas.
- **JsonWebToken**: Biblioteca para criação e verificação de tokens JWT.
- **Faker**: Gerador de dados falsos para testes.
- **Coveralls**: Ferramenta para analisar a cobertura de código dos testes.
- **Validator**: Biblioteca para validação de strings.
- **Express**: Framework web minimalista para Node.js.
- **Supertest**: Ferramenta para testes de integração de APIs.
- **Standard Javascript Style**: Estilo de código JavaScript que segue padrões de qualidade e consistência.
- **Rimraf**: Utilitário para remover diretórios de forma recursiva.
- **In-Memory MongoDB Server**: Ferramenta para executar instâncias do MongoDB na memória para testes.
- **Bson ObjectId**: Biblioteca para trabalhar com IDs do MongoDB.


## Arquitetura

### Domain-Driven Design (DDD)

O projeto é estruturado seguindo os princípios do DDD, onde a lógica de negócios é organizada em torno de modelos de domínio ricos. As camadas do sistema estão bem definidas, separando a lógica de aplicação, domínio, infraestrutura e interface.

### Clean Architecture

A arquitetura do projeto é baseada na Clean Architecture, onde a lógica de negócios é independente de frameworks, bancos de dados e detalhes da interface. Isso facilita a manutenção e escalabilidade do código ao longo do tempo.

### Princípios SOLID

Os princípios SOLID são aplicados em todo o projeto para garantir que o código seja modular, extensível e de fácil manutenção:

- **Single Responsibility Principle (SRP)**: Cada classe tem uma única responsabilidade.
- **Open/Closed Principle (OCP)**: As classes estão abertas para extensão, mas fechadas para modificação.
- **Liskov Substitution Principle (LSP)**: As subclasses devem poder substituir as superclasses sem alterar o comportamento esperado.
- **Interface Segregation Principle (ISP)**: Interfaces são específicas para cada tipo de cliente, evitando o uso de métodos desnecessários.
- **Dependency Inversion Principle (DIP)**: Depender de abstrações em vez de implementações concretas.

### Padrões de Design

Foram aplicados vários padrões de design, como:

- **Repository Pattern**: Para abstração das operações de persistência de dados.
- **Factory Pattern**: Para criação de instâncias de classes complexas.
- **Adapter Pattern**: Para adaptar interfaces incompatíveis entre si.
- **Singleton Pattern**: Para garantir que uma classe tenha apenas uma instância em todo o sistema.

## Test-Driven Development (TDD)

O desenvolvimento foi conduzido utilizando a abordagem TDD, onde os testes são escritos antes da implementação da funcionalidade. Isso garante que o código esteja sempre coberto por testes e que as funcionalidades atendam exatamente ao esperado.
