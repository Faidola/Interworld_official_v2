# Correção do Erro de Foreign Key - Cadastro de Programa

## Problema Identificado

O erro `SQLServerException: A instrução INSERT conflitou com a restrição do FOREIGN KEY "FK__ProgramaI__escol__48CFD27E"` ocorre porque:

1. **Tabela Escola vazia**: O banco de dados não possui registros na tabela `Escola`
2. **ID incorreto**: O código estava usando `userData.id` (ID do usuário) ao invés do `escola_id` correto
3. **Esquema incompleto**: A tabela `ProgramaIntercambio` estava faltando alguns campos necessários

## Soluções Implementadas

### 1. Correção do Frontend

**Arquivos modificados:**
- `src/services/escolaService.ts` (novo)
- `src/services/programaService.ts` 
- `src/pages/CadastrarPrograma.tsx`

**Principais mudanças:**
- Criado serviço para buscar escola pelo ID do usuário
- Atualizada interface `ProgramaCreate` para corresponder ao esquema do banco
- Modificado o cadastro para usar `escola_id` correto
- Adicionados campos obrigatórios: `duracaoSemanas`, `moeda`, `nivelIdioma`, `tipoPrograma`, `temBolsa`

### 2. Scripts de Correção do Banco

Execute os seguintes scripts SQL na ordem:

#### Passo 1: Corrigir dados da Escola
```sql
-- Executar: fix-escola-data.sql
```
Este script:
- Insere uma escola de exemplo para o usuário ID 1
- Atualiza o nível de acesso do usuário para 'ESCOLA'

#### Passo 2: Corrigir esquema da tabela ProgramaIntercambio
```sql
-- Executar: fix-programa-schema.sql
```
Este script:
- Adiciona campos faltantes: `idioma_id`, `dataCadastro`, `acomodacao`, `acomodacaoPreco`, `infoEstagio`
- Cria foreign key para a tabela Idioma
- Atualiza programas existentes

## Como Testar

### Pré-requisitos
1. Execute os scripts SQL de correção
2. Certifique-se de que o backend está rodando na porta 8081
3. Faça login com o usuário que tem uma escola associada

### Teste do Cadastro
1. Acesse `/cadastro-programa`
2. Preencha os campos obrigatórios:
   - Título do Programa
   - Idioma (selecione da lista)
   - Descrição
   - País
   - Cidade
   - Vagas Disponíveis
   - Preço
3. Clique em "Cadastrar Programa"
4. Verifique se o programa foi criado com sucesso

## Estrutura Correta dos Dados

### Objeto enviado para a API:
```json
{
  "titulo": "Inglês Intensivo em Nova York",
  "descricao": "Aprenda inglês no coração da Big Apple...",
  "idioma_id": 1,
  "pais": "Estados Unidos",
  "cidade": "Nova York",
  "duracaoSemanas": 4,
  "vagasDisponiveis": 15,
  "preco": 1850.00,
  "moeda": "USD",
  "nivelIdioma": "Básico",
  "tipoPrograma": "CURSO_IDIOMA",
  "temBolsa": false,
  "escola_id": 1,
  "dataCadastro": "2025-01-27T10:30:00.000Z",
  "acomodacao": "[{\"tipo\":\"CASA_FAMILIA\",\"descricao\":\"...\"}]",
  "acomodacaoPreco": "320.00",
  "infoEstagio": "{\"disponivel\":false}",
  "statusPrograma": "ATIVO"
}
```

## Melhorias Futuras

1. **Validação de Escola**: Verificar se o usuário logado tem uma escola associada antes de permitir o cadastro
2. **Campos Dinâmicos**: Adicionar campos para duração, nível de idioma e tipo de programa no formulário
3. **Endpoint de Escola**: Criar endpoint no backend para buscar escola por usuário ID
4. **Tratamento de Erros**: Melhorar mensagens de erro específicas para diferentes tipos de falha

## Troubleshooting

### Erro: "Escola não encontrada para este usuário"
- Verifique se existe um registro na tabela Escola com o usuario_id correto
- Execute o script `fix-escola-data.sql`

### Erro: "Invalid column name 'idioma_id'"
- Execute o script `fix-programa-schema.sql` para adicionar os campos faltantes

### Erro: "Cannot insert NULL into column 'duracaoSemanas'"
- Certifique-se de que todos os campos obrigatórios estão sendo enviados
- Verifique se o frontend foi atualizado com as mudanças mais recentes