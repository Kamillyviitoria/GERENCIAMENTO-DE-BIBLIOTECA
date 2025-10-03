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

Endpoints disponíveis:

Método	Rota	Descrição
GET	/agendamentos	Lista todos os agendamentos
POST	/agendamentos	Cria um novo agendamento (valida funcionário e livro)
GET	/agendamentos/:id	Busca agendamento por ID
PUT	/agendamentos/:id	Atualiza agendamento, incluindo status
DELETE	/agendamentos/:id	Remove agendamento

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