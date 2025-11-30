# UPX-05 ADS -- Sistema de Localização e Orientação de Descarte de Resíduos

## 🎯 Descrição da Ideia

O projeto consiste no desenvolvimento de um **site/aplicativo** que
auxilia os usuários a **localizar pontos de coleta seletiva**,
**entender como descartar corretamente cada tipo de resíduo** e
**estimular práticas sustentáveis por meio de gamificação**. Além disso,
o sistema também busca **aproximar empresas que utilizam materiais
recicláveis** de usuários que realizam o descarte, promovendo uma
**relação colaborativa** entre população e setor produtivo.

O objetivo é **promover a conscientização ambiental**, facilitar o
acesso a informações sobre reciclagem dentro das cidades e ainda **criar
um ecossistema sustentável**, onde cidadãos e empresas possam se
beneficiar de um consumo mais responsável, reduzindo custos e diminuindo
impactos ambientais.

## ⚙️ Funcionalidades Principais

-   Cadastro e login de usuários.
-   Mapa interativo com pontos de coleta.
-   Busca por tipo de resíduo (plástico, vidro, metal, eletrônico, óleo
    de cozinha, etc.).
-   Orientações e instruções sobre o descarte adequado de cada resíduo.
-   Gamificação: recompensas virtuais por check-ins nos pontos de
    coleta.
-   Ranking de usuários, permitindo comparar desempenho com amigos.
-   Possibilidade de empresas parceiras se conectarem ao app para
    incentivar a reciclagem e divulgar pontos de reaproveitamento.

## 🌱 ODS Atendidos

-   **ODS 11**: Cidades e comunidades sustentáveis.
-   **ODS 12**: Consumo e produção responsáveis.
-   **ODS 13**: Ação contra a mudança global do clima.

## 👥 Público-Alvo

-   Moradores de cidades que buscam informações sobre descarte adequado
    e coleta seletiva.
-   **Empresas que utilizam materiais recicláveis ou desejam reduzir
    custos com matéria-prima**, tornando seus processos mais
    sustentáveis.

## 📚 Disciplinas Relacionadas

-   Banco de Dados
-   Desenvolvimento Web
-   Desenvolvimento Mobile
-   Programação Orientada a Objetos
-   Construção de Algoritmos e SQL
-   Cibersegurança
-   Inteligência Artificial (engenharia de prompts)

## 🛠️ Tecnologias Sugeridas

-   Back-end: Node.js (Express)
-   Banco de Dados: PostgreSQL
-   Front-end Web: React.js
-   Mobile (opcional): React Native
-   Segurança: JWT, criptografia e bcrypt
-   Infra: Docker

## 🚀 Desenvolvimento

1.  Definição da arquitetura.
2.  Criação do banco de dados.
3.  Implementação do front-end.
4.  Integração com mapas.
5.  Implementação do back-end.
6.  Desenvolvimento da gamificação.
7.  Ajustes para possível build mobile.

## 🧩 Observação Importante

O objetivo principal é aplicar conceitos de **UI/UX e psicologia** para
tornar o descarte de resíduos **mais divertido, motivador e
interativo**. Além disso, o sistema busca **incentivar, apoiar e motivar
empresas** a se vincularem ao aplicativo, com o propósito de reduzir
custos com matéria-prima, estimular práticas sustentáveis e colaborar
com a preservação ambiental.

## 📥 Tutorial de Instalação do Projeto (WSL2 – Windows + Ubuntu)

Este guia explica como instalar e executar o projeto completo (back-end e front-end) utilizando WSL2, recomendado para obter o melhor desempenho e compatibilidade com Docker e Node.js.

⚠️ Requisito recomendado:
➡️ 32GB de RAM (principalmente se utilizar Docker + Node + VSCode simultaneamente).

## 🧰 Programas Necessários

Antes de tudo, instale os seguintes programas no Windows:

VSCode

Node.js + NPM

Yarn (opcional)

Docker Desktop

WSL2 + Ubuntu

A seguir, você aprenderá como instalar cada um.

## 🏗️ 1. Instalando o WSL2
1. Abra o PowerShell como Administrador

Pesquise por PowerShell, clique com o botão direito e selecione Executar como administrador.

2. Execute o seguinte comando:

``winget install -e --id Microsoft.WSL
``

3. Abra a Microsoft Store e instale:

👉 Ubuntu

4. Reinicie o computador.

Ao reiniciar, abra o aplicativo Ubuntu. Ele vai preparar o ambiente automaticamente.

## 🧭 2. Clonando o Repositório no WSL

No terminal Ubuntu, execute:
``git clone git@github.com:leocapra/UPX-05-ADS.git
``

Entre na pasta:
``cd UPX-05-ADS
``

Você navegará por:
``
cd facens-main`` ``
cd back-end`` ``
code .`` ``
cd ..`` ``
cd front-end`` ``
code .``

## 📦 3. Instalando Node.js (NVM)
No Ubuntu, instale o NVM:
``curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
``

Recarregue o terminal:
``source ~/.bashrc
``

Agora instale a versão do Node usada no projeto:
``nvm install lts/iron
``

E sempre que abrir o terminal, use:
``nvm use lts/iron
``

## 🐳 4. Instalando o Docker Desktop

O Docker é essencial, pois criará um ambiente isolado, onde o PostgreSQL será executado sem instalar nada manualmente.

Instale de duas maneiras:
🔹 Pelo site oficial

👉 https://www.docker.com/get-started/

🔹 Ou pelo Winget (mais rápido)

``winget install -e --id Docker.DockerDesktop
``
Depois, abra o Docker Desktop para que ele inicialize seus serviços.
⚠️ IMPORTANTE:
O Docker precisa estar rodando antes de iniciar o back-end.

🔐 5. Configurando o .env do Backend

O backend já possui um .env, mas caso esteja faltando, crie um arquivo .env na pasta /back-end e copie:
~~~
# PostgreSQL (TypeORM)
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=docker
DB_PASSWORD=docker
DB_NAME=postgres

# Docker
POSTGRES_USER=docker
POSTGRES_PASSWORD=docker
POSTGRES_DB=postgres

# App
APP_PORT=3000
NODE_ENV=development

# Token JWT
JWT_SECRET=d1e253792762c481c03ba6f2724e76ccc5f54c8f1dc95ae3acd09c07b3a86496
~~~

## ⚙️ 6. Instalando Dependências do Backend

Entre na pasta:
``cd back-end
``

Garanta a versão correta do Node:
``nvm use lts/iron
``

Instale as dependências:
``npm install
``

Agora execute:
1️⃣ Subir o container Docker
``npm run dev:docker:up
``
✔️ Esse script inicia o Docker Compose, criando automaticamente um contêiner PostgreSQL configurado com base nas variáveis do .env.

2️⃣ Rodar as migrations
``npm run migration:run
``
✔️ Esse comando executa o TypeORM para criar todas as tabelas no banco de dados PostgreSQL dentro do Docker, garantindo que o banco esteja estruturado corretamente.

💡 Curiosidade sobre outros scripts úteis do backend (ignore esse tópico, é apenas curiosidade)

O projeto também possui:
``"dev": "nodemon --watch src --exec ts-node -r tsconfig-paths/register src/index.ts"
``
➡️ Inicia o backend com recarregamento automático.

``"migration:revert": "npm run typeorm migration:revert -- --dataSource src/data-source.ts"
``
➡️ Desfaz a última migration.

``"migration:create": "node scripts/migration-create.js"
``
➡️ Cria automaticamente um arquivo de migration com nome e estrutura base.


(continuação)
## 💻 7. Executando o Backend
Após rodar as migrations:
``Após rodar as migrations:``

## 🎨 8. Instalando e Executando o Front-End
Agora navegue para o front-end:
``cd ../front-end
``

Troque a versão do Node:
``nvm use lts/iron
``

Instale as dependências:
``npm install
``

Se der erro, use:
``npm install -ff
``

Agora inicie:
``npm run dev
``

## 🚀 9. Resumo da Execução

✔️ Antes de tudo

Docker Desktop deve estar aberto e rodando

Backend deve ter o .env configurado

✔️ Para iniciar:
BACK-END
~~~
cd back-end
nvm use lts/iron
npm install
npm run dev:docker:up
npm run migration:run
npm run dev
~~~

FRONT-END
~~~~
cd front-end
nvm use lts/iron
npm install
npm run dev
~~~~




📌 *Projeto da disciplina UPX-05 (ADS), com foco em trabalho em equipe e
aplicação prática das disciplinas cursadas.*
