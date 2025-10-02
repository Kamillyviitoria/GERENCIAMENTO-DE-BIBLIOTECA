# Sistema de Gerenciamento de Biblioteca

Este projeto é uma **API REST** desenvolvida em **Node.js com Express** para gerenciar uma biblioteca, incluindo funcionários, livros e agendamentos.

---

## 🏛️ Funcionalidades

### 👩‍💼 CRUD de Funcionários
Gerencia os funcionários da biblioteca, com os seguintes atributos:

- Nome Completo  
- CPF  
- Data de Nascimento  
- Data de Admissão  
- Email  
- Telefone  
- Cargo  
- Status  

Permite **criar, listar, buscar, atualizar e deletar** funcionários.

---

### 📚 CRUD de Livros
Gerencia os livros da biblioteca, com os seguintes campos:

- ID  
- Título  
- Autor  
- Categoria  
- Ano de Publicação  

Permite **criar, listar, buscar, atualizar e deletar** livros.

---

### 📅 CRUD de Agendamentos
Gerencia reservas de livros pelos funcionários, com os seguintes detalhes:

- **Campos:** `id`, `cpfFuncionario`, `idLivro`, `dataAgendamento`, `dataDevolucao`, `status`  
- **Validação de relacionamentos:** só é possível criar um agendamento se o **funcionário existir** e o **livro existir**  
- **Status automático:** todo novo agendamento começa com o status `"ativo"`  

**Endpoints disponíveis:**

| Método | Rota | Descrição |
|--------|------|-----------|
| GET    | /agendamentos | Lista todos os agendamentos |
| POST   | /agendamentos | Cria um novo agendamento (valida funcionário e livro) |
| GET    | /agendamentos/:id | Busca agendamento por ID |
| PUT    | /agendamentos/:id | Atualiza agendamento, incluindo status |
| DELETE | /agendamentos/:id | Remove agendamento |

---

## ⚙️ Instalação e execução

1. Clone o projeto:
```bash
git clone <URL_DO_REPOSITORIO>
cd GERENCIAMENTO-DE-BIBLIOTECA
