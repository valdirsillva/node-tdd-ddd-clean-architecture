# API CLEAN NODE

## Descrição do Projeto

Este projeto é uma API construída utilizando Node.js e TypeScript. O foco principal deste projeto é aplicar boas práticas de desenvolvimento, como TDD (Test-Driven Development), DDD (Domain-Driven Design), e Clean Architecture. Além disso, padrões de design (Design Patterns) e princípios SOLID são aplicados para garantir um código limpo, escalável e de fácil manutenção.

## Tecnologias Utilizadas

- **Node.js**: Plataforma para construção de aplicações server-side.
- **TypeScript**: Superconjunto do JavaScript que adiciona tipagem estática opcional ao código.
- **Express**: Framework web minimalista para Node.js.
- **Jest**: Framework de testes em JavaScript com suporte a testes unitários, de integração e de aceitação.
- **Supertest**: Ferramenta para testes de integração em APIs Node.js.
- **Tsyringe**: Container de injeção de dependências leve para TypeScript.
- **TypeORM**: ORM (Object-Relational Mapper) para TypeScript e JavaScript que suporta diversos bancos de dados.
- **ESLint**: Ferramenta de linting para identificar e corrigir problemas em seu código.
- **Prettier**: Ferramenta de formatação de código para manter um estilo consistente.

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
