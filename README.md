<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src="assets/logo.png" width="300px" />
</h1>

<h3 align="center">
  Desafio 10: FastFeet, mobile
</h3>


# Instruções para executar a aplicação.

Faça o download do repositório e siga as instruções:

##Ambiente 

Para criação das bases de dados foi utilizado o docker. Com o docker configurado na sua máquina, abra o terminal e rode os seguintes comandos

Nesse caso criei com a senha docker, mas você pode alterar a senha, e configurá-la depois no arquivo .env na raiz do backend;

```
  docker run --name fastfeetDataBase -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

```
Utilize o postbird para se conectar ao postgress e crie uma base de dados com o nome fastfeet (Você pode utilizar outro nome, mas lembre de alterar no arquivo .env);

Agora vamos criar a base redis para tarefas de envio de emails.

```
  docker run --name redisFastFeet -p 6379:6379 -d -t redis:alpine 

```

## Backend

duplique o arquivo .env.example que se encontra na raiz da pasta backend salve com o nome .env e preencha as variáveis de acordo com a configuração utilizada na preparaçÃo do ambiente.

utilizando o terminal acesse a pasta backend e rode o seguinte comando para instalar as dependências do projeto.

```
  yarn

```
Para criação das tabelas utilize o comando:

```
yarn sequelize db:migrate

```

Para criar um usuário administrador padrão utilize o comando abaixo. Esse comando vai criar um usuário com o email `admin@fastfeet.com` e senha `123456`. Caso queria um usuário e senha diferentes configure na pasta /src/database/seeds.

```
yarn sequelize db:seed:all

```

É hora de subir o servidor rode o seguinte comando na raiz da pasta backend:

```
yarn dev

```

Agora vamos subir o servidor responsável pelo gerenciamento de filas de envio de emails. Abra uma nova janela do terminal e na raiz da pasta backend rode:

```
yarn queue

```

Pronto o backend já está pronto para o uso, agora vamos para a parte web da aplicação.

### Opcionais desenvolvidos no backend

 - Paginação para todas as listagens


## WEB

Rode o seguinte comando na raiz da pasta frontend para instalar as dependencias

```
  yarn

```
Agora para iniciar a aplicação WEB basta rodar:

```
  yarn start

```

A aplicação vai se iniciar na tela de login. Faça login com user e senha criados via seeds no processo excutado anteriormente no backend

### Opcionais dfesenvolvidos no sistema web

 - Todas as listagem possuem paginação e filtro
 - Se o entregador for cadastrado sem foto. Será gerado uma imagem com as iniciais dele utilizando a api https://ui-avatars.com/

## 📝 Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.

---

Feito com ♥ by Luis Reis :wave: Tks ##Rocketseat 