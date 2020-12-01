# Aplicação de cadastro de matricula de alunos

## Start da aplicação
  Para startar o front-end, deverá entrar no diretório `front-end` e digitar no CMD `npm run serve` e logo após ele será inicializado em http://localhost:8080/

  Para startar o back-end, deverá entrar no diretório `back-end` e digitar no CMD `npm run dev` para startar o servidor no ambiente de desenvolvimento e `npm start` para startar no ambiente de desenvolvimento; ambos serão startado em http://localhost:3000/

## Frontend

  O front-end foi utilizado vue.js com o framework vuetify e o vue-router

### Telas:
  A index (tela inicial) da aplicação contém:

  * Pesquisa diretamente na tabela
  * Paginação entre as tabelas
  * Opção de excluir usuários
  * Opção de editar usuários

  As opções de editar e excluir como opções em cada linha da tabela. Ao clicar em excluir é enviado uma solitação a API, ao após ser feito todo o processo é dado o realod na página para remover o item da tabela

  A parte de pesquisa é feita de acordo com o que o usuário vai digitando no campo e automaticamente vai filtrando na tabela

  Na parte de cadastro de aluno, existe um formulário com quatro campos obrigátorio, tendo duas validações, pelo front-end e também pelo back-end 
  
  A parte de editar o aluno é feita atráves do icone parecido com um lápis. Ao clicar neste icone é carregado todos os dados daquela linha dentro de um formulário que está dentro de um modal e ao confirmar os dados é feito o mesmo processo apresentado no cadastro de aluno


## Backend
  O back-end foi utilizado o **Express** para a criação das rotas e o **ORM Sequelize** para realizar o acesso com o banco de dados

### Endpoints

  | Routas | Verbo | Parâmetros | Resposta | Descrição |
  |--------|-------|------------|----------|----------|
  | /Students| GET |            | Array    | Retorna todos alunos (200)
  | /newStudent | POST | nome (obrigátorio), email (obrigátorio), cpf (obrigátorio), ra (obrigátorio) | Objeto | Retorno (201)
  | /updateStudent/:id | PUT| nome (opcional), email (opcional)  | Aray | Atualiza os dados do aluno com o ID passado
  | /deleteStudent/:id | DELETE | | Array |  Deleta o usuário que possui o id = (:id)