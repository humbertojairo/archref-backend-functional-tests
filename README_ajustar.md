# Template Automação Cucumber + Cypress
Projeto template para automação com Cucumber e cypress.

Autores: [Paulo Citron](paulo.citron@compasso.com.br) e [Leonardo Kartabil](leonardo.kartabil@compasso.com.br)

## Requisitos
- [Node LTS](https://nodejs.org/pt-br/)

## 1. Estrutura
Procure sempre seguir a estrutura do template, evitando criar pastas em locais errados e misturar arquivos.
A estrutura base já contempla um projeto robusto e não há necessidade de mudança na estruturação.

## 2. Fluxo de trabalho
#### 2.1 Escreva sua feature
Em primeiro lugar, após o mapeamento de funcionalidades, escreva um arquivo `.feature` em Gherkin.
O local onde ele deve ser armazenado é na pasta `specs`, que fica no caminho `cypress/integration/specs`.

#### 2.2 Implemente os steps
Após feita a feature, está na hora de contruir os steps.
O local onde ele deve ser armazenado é na pasta `step_definitions`. que fica no caminho `cypress/integration/step_definitions`.

#### 2.3 Utilizando pages
O projeto utiliza a estruturação Page Objects, a qual se constitui na criação de uma classe para cada página, na pasta `page_objects`, que fica no caminho `cypress/page_objects`.
Procure sempre herdar a classe `Base` ao criar uma página, assim utilizando os métodos dela, para manter um padrão de código.

#### 2.4 Massas de dados
Massas de dados estáticas, preferencialmente, devem ser colocadas em uma `fixture` do ambiente, que se encontra no caminho `cypress/fixtures`.

#### 2.5 Configurações de acesso
Cada ambiente deve ter um arquivo com suas configurações de acesso (url's, keys, etc).
Esse arquivo encontra-se no caminho `cypress/config`.

#### 2.6 Plugins e Configurações adicionais
Novos plugins devem ser adicionados utilizando o arquivo no caminho `cypress/plugins`. Configurações adicionais podem ser realizadas nos arquivos do caminho `cypress/support`.

#### 2.7 Reports
Reports podem ser configurados, porém manter o caminho para a pasta `reports`.
No momento, nela encontram-se screenshots de erros na execução. O cypress pode ser configurado para gerar um vídeo da execução (consultar [documentação](https://docs.cypress.io/guides/overview/why-cypress.html#In-a-nutshell)).

## 3. Execução
Existem tipos diferentes de execução:

#### 3.1 Executando em modo gráfico
Para acompanhar a execução, em momento de desenvolvimento, pode ser utilizado o script:
`npm run cypress:open`

#### 3.2 Executando todos os testes
Para executar todos os testes, pode ser utilizado o script:
`npm test`

#### 3.3 Executando por tags
Para executar features específicas, podem ser utilizadas tags do cucumber.
Para isso, pode ser utilizado o script a seguir, apenas trocando `@tag` pela tag desejada:
`npm run cucumber TAGS=@tag`

## 4. Dependências
Bibliotecas utilizadas no template:
`cypress`
`cypress-cucumber-preprocessor`
`cypress-xpath`
`cypress-plugin-tab`
`fs`
`fs-extra`
