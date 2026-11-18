# pactum-js-poc

Template de testes de API com **[PactumJS](https://pactumjs.github.io/)** + **TypeScript**, usando a API pública [ServeRest](https://serverest.dev).

Faz parte da organização [`qualidade-templates`](https://github.com/qualidade-templates).

## O que tem aqui

Os mesmos fluxos do `bruno-poc` / `insomnia-poc`, em código, com camadas separadas:

- **DTO** — contratos de request/response
- **Factory** — dados fake dinâmicos
- **HttpClient** — abstração + implementação Pactum
- **Services** — um por recurso (user, auth, product, cart)
- **Facade** — `ServeRestClient` agrupa tudo

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
  clients/      # IHttpClient, PactumHttpClient, ServeRestClient
  services/
tests/
  e2e/
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

## Environment

| Variável   | Default                   |
|------------|---------------------------|
| `BASE_URL` | `https://serverest.dev`   |

## Princípios usados

- **SRP** — cada service cuida de um recurso
- **DIP** — services dependem de `IHttpClient`, não do Pactum
- **Facade** — `ServeRestClient` como ponto único de entrada
- **Factory** — payloads únicos por execução

## Repositórios relacionados

- [bruno-poc](https://github.com/qualidade-templates/bruno-poc) — mesmos fluxos no Bruno
- [insomnia-poc](https://github.com/qualidade-templates/insomnia-poc) — mesmos fluxos no Insomnia
