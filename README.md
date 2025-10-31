# Desafio Grupo Adriano Cobbucio

O objetivo consiste na criação de uma carteira financeira em que os usuários possam realizar
transferência de saldo.
Teremos apenas um tipo de usuário que pode enviar ou receber dinheiro de qualquer outro.

## Pré Requisitos

- **Node.js** (recomendado: >= 18.x) - Dê preferencia para a versão 18.16.0 para desenvolvimento
- **npm** (Vem junto com o pacote do node) 9.5.1
- **Docker** e **Docker Compose**
- **Git** (Pro versionamento e clone do repositório)

## Dependências

1. **Clonando o repositório:**

    ```bash
    git clone <repository-url>
    cd desafio_grupo_adriano_cobuccio
    ```

2. **Instalando dependências**

    ```bash
    npm ci
    ```

3. **Definindo variáveis de ambiente:**
   Copie o `.env.example` para `.env.dev` e preencha com os valores de acordo com sua necessidade.

4. **Iniciando o docker para uso do banco**

    ```bash
    docker-compose --env-file .env.dev up postgres-service -d
    ```

6. **Rodando a aplicação em desenvolvimento:**
    ```bash
    npm run start:dev
    ```

## Scripts principais

> **No windows, Acrescente `:w` no final do comando.**  
> Exemplo: `npm run start:dev:w`

- `npm run start` Inicia a aplicação no modo de produção
- `npm run start:dev` Inicia a aplicação no modo de desenvolvimento

Documentação Swagger disponível em `/docs` quando a aplicação estiver rodando.
