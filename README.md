# pactum-js-poc

Template de testes de API com **[PactumJS](https://pactumjs.github.io/)** + **TypeScript**, usando a API pública [ServeRest](https://serverest.dev).

Faz parte da organização [`qualidade-templates`](https://github.com/qualidade-templates).

## O que tem aqui

Os mesmos fluxos do `bruno-poc` / `insomnia-poc`, em código, com camadas separadas:

- **DTO** — contratos de request/response
- **Factory** — dados fake dinâmicos
- **HttpClient** — abstração + implementação Pactum
- **Clients** — um por recurso (user, auth, product, cart); montam a request e devolvem o chain
- **Facade** — `ServeRestClient` agrupa tudo

Os clients **não** fazem assert. Status, payload e regras de negócio ficam nos testes, que encadeiam `.expectStatus()`, `.expectJsonLike()`, etc. no Spec retornado.

Cobertura:

1. Cadastro de usuário
2. Login
3. Cadastro de produto
4. Carrinho (criar + buscar)
5. Fluxo E2E completo

## Estrutura

```
src/
  config/       # BASE_URL
  dto/
  factories/
  clients/      # HttpClient + clients de domínio + ServeRestClient
tests/
  e2e/          # asserts e orquestração
  support/
```

## Como usar

```bash
npm install
cp .env.example .env   # opcional — default já aponta para ServeRest
npm test
```

Só o E2E completo:

```bash
npm run test:e2e -- --grep "fluxo E2E"
```

Exemplo de uso do chain no teste:

```ts
const response = await api.users
  .create(user)
  .expectStatus(201)
  .expectJsonLike({ message: 'Cadastro realizado com sucesso' })
  .toss();
```

## Environment

| Variável   | Default                   |
|------------|---------------------------|
| `BASE_URL` | `https://serverest.dev`   |

## Princípios usados

- **SRP** — client monta request; teste valida resposta
- **DIP** — clients de domínio dependem de `IHttpClient`, não do Pactum
- **Facade** — `ServeRestClient` como ponto único de entrada
- **Factory** — payloads únicos por execução

## Repositórios relacionados

- [bruno-poc](https://github.com/qualidade-templates/bruno-poc) — mesmos fluxos no Bruno
- [insomnia-poc](https://github.com/qualidade-templates/insomnia-poc) — mesmos fluxos no Insomnia
