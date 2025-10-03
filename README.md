📖 Sistema de Gerenciamento de Biblioteca
Este projeto é uma API REST desenvolvida em Node.js com Express para gerenciar uma biblioteca, controlando funcionários, livros, usuários, categorias e agendamentos.

🏛️ Funcionalidades (CRUDs Implementados)
👩‍💼 CRUD de Funcionários
Gerencia os funcionários da biblioteca.

Atributos: Nome Completo, CPF, Data de Nascimento, Data de Admissão, Email, Telefone, Cargo, Status.

Regra de Negócio: O CPF deve ser único (retorna 409 Conflict se duplicado).

Permite criar, listar, buscar, atualizar e deletar funcionários.

👤 CRUD de Usuários
Gerencia o cadastro dos leitores/clientes da biblioteca.

Atributos: ID, Nome, Email, Telefone, Data de Cadastro.

Regra de Negócio: O Email deve ser único (retorna 409 Conflict se duplicado).

Permite criar, listar, buscar, atualizar e deletar usuários.

📚 CRUD de Livros
Gerencia os livros disponíveis na biblioteca.

Atributos: ID, Título, Autor, Categoria, Ano de Publicação.

Permite criar, listar, buscar, atualizar e deletar livros.

🏷️ CRUD de Categorias
Gerencia as classificações dos livros (gêneros, áreas temáticas).

Atributos: ID, Nome, Descrição.

Regra de Negócio: O Nome da categoria deve ser único (retorna 409 Conflict se duplicado).

Permite criar, listar, buscar, atualizar e deletar categorias.

📅 CRUD de Agendamentos
Gerencia reservas de livros pelos funcionários.

Campos: id, cpfFuncionario, idLivro, dataAgendamento, dataDevolucao, status.

Validação de relacionamentos: Só é possível criar um agendamento se o funcionário existir e o livro existir (404 Not Found).

Status automático: Todo novo agendamento começa com o status "ativo".

🚀 Endpoints
Funcionários

GET /funcionarios → lista todos

GET /funcionarios/:cpf → busca por CPF

POST /funcionarios → cria funcionário

PUT /funcionarios/:cpf → atualiza funcionário

DELETE /funcionarios/:cpf → remove funcionário

Exemplo requisição:

POST /funcionarios
{
  "nome": "Maria Silva",
  "cpf": "12345678901",
  "email": "maria@example.com",
  "cargo": "Bibliotecário",
  "status": "ativo"
}

Usuários

GET /usuarios → lista todos

GET /usuarios/:id → busca por ID

POST /usuarios → cria usuário

PUT /usuarios/:id → atualiza usuário

DELETE /usuarios/:id → remove usuário

Exemplo requisição:

POST /usuarios
{
  "nome": "João Pereira",
  "email": "joao@example.com",
  "telefone": "61988887777"
}

Livros

GET /livros → lista todos

GET /livros/:id → busca por ID

POST /livros → cadastra livro

PUT /livros/:id → atualiza livro

DELETE /livros/:id → remove livro

Exemplo requisição:

POST /livros
{
  "titulo": "Dom Casmurro",
  "autor": "Machado de Assis",
  "categoria": "Clássico",
  "anoPublicacao": 1899
}

Categorias

GET /categorias → lista todas

GET /categorias/:id → busca por ID

POST /categorias → cria categoria

PUT /categorias/:id → atualiza categoria

DELETE /categorias/:id → remove categoria

Agendamentos

GET /agendamentos → lista todos

GET /agendamentos/:id → busca por ID

POST /agendamentos → cria agendamento

PUT /agendamentos/:id → atualiza agendamento

DELETE /agendamentos/:id → remove agendamento

Exemplo requisição:

POST /agendamentos
{
  "cpfFuncionario": "12345678901",
  "idLivro": 10,
  "dataAgendamento": "2025-10-05",
  "dataDevolucao": "2025-10-20"
}


Exportar para Sheets
⚙️ Instalação e Execução
Pré-requisitos
Certifique-se de ter o Node.js e o npm instalados.

Clone o projeto:

Bash

git clone <URL_DO_REPOSITORIO>
cd GERENCIAMENTO-DE-BIBLIOTECA
Instale as dependências:

Bash

npm install
Execute a API:

Bash

npm start
O servidor estará rodando em: http://localhost:3000.

🧪 Como Testar a API
Use ferramentas como Postman  para enviar requisições.

URL Base: http://localhost:3000

Envio de Dados: Para métodos POST e PUT, configure o corpo da requisição para raw e JSON.

Exemplo de Rota para Teste:

Listar Usuários: GET para http://localhost:3000/usuarios

Criar Categoria: POST para http://localhost:3000/categorias com o corpo: {"nome": "Ficção", "descricao": "Livros imaginários."}



👥 Integrantes e Contribuições
Nome	GitHub	Contribuições principais
Kamilly	Kamillyviitoria
	Configuração do servidor, rotas principais, controle de agendamentos
Vladimir	Vladimir-Aires
	CRUD de funcionários, tratamento de erros, testes iniciais
Ramerson	Ramerson97
	CRUD de livros e categorias, validações e relacionamentos
Walisson	Walisson-Rocha
	CRUD de usuários, revisão final do código, integração entre módulos
