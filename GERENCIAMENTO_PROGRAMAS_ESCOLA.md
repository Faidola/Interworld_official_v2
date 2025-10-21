# Gerenciamento de Programas - Painel da Escola

## Funcionalidades Implementadas

### 1. **Visualização de Programas**
- Lista todos os programas cadastrados pela escola
- Carregamento automático dos programas da API
- Separação entre "Programas Oficiais" (da API) e "Programas Rascunho" (locais)
- Botão "Atualizar" para sincronizar dados

### 2. **Edição de Programas**
- Modal de edição com campos principais:
  - Título
  - Preço (USD)
  - País
  - Cidade
  - Vagas Disponíveis
  - Descrição
- Salvamento automático na API
- Feedback visual durante o processo

### 3. **Ativação/Inativação de Programas**
- Botão para alternar status entre ATIVO/INATIVO
- Indicação visual do status atual
- Confirmação via toast de sucesso/erro

### 4. **Exclusão de Programas**
- Botão de exclusão (ícone de lixeira)
- Remoção permanente do programa
- Confirmação via toast

### 5. **Remoção do Botão de Configurações**
- Botão de configurações removido do painel da escola
- Mantido apenas para estudantes
- Interface mais limpa e focada

## Estrutura dos Componentes

### SchoolDashboard.tsx
```typescript
// Novos estados adicionados
const [programas, setProgramas] = useState<ProgramaIntercambio[]>([]);
const [isLoading, setIsLoading] = useState(false);
const [editingPrograma, setEditingPrograma] = useState<ProgramaIntercambio | null>(null);

// Novas funções implementadas
- loadProgramas(): Carrega programas da escola
- handleInativarPrograma(): Alterna status do programa
- handleDeletarPrograma(): Remove programa
- Modal de edição com formulário completo
```

### Dashboard.tsx
```typescript
// Configurações condicionais
{userData.userType === 'student' && (
  <Button>Configurações</Button>
)}
```

## Fluxo de Funcionamento

### 1. **Carregamento Inicial**
```
useEffect → loadProgramas() → escolaService.buscarPorUsuarioId() → programaService.listarTodos() → filtrar por escola
```

### 2. **Edição de Programa**
```
Clique "Editar" → setEditingPrograma() → Modal aberto → Alterações → programaService.atualizar() → loadProgramas()
```

### 3. **Inativação/Ativação**
```
Clique botão status → handleInativarPrograma() → programaService.atualizar() → loadProgramas() → toast feedback
```

### 4. **Exclusão**
```
Clique lixeira → handleDeletarPrograma() → programaService.deletar() → loadProgramas() → toast feedback
```

## Interface Visual

### Cards de Programa
- **Borda azul** para programas oficiais
- **Status badge** (ATIVO/INATIVO)
- **Botões de ação**: Editar, Ativar/Inativar, Deletar
- **Informações**: Título, localização, preço, vagas
- **Seções**: Acomodação e Estágio (quando disponíveis)

### Modal de Edição
- **Responsivo**: max-w-2xl com scroll vertical
- **Campos organizados**: Grid 2 colunas para campos relacionados
- **Validação**: Tipos corretos (number para preço/vagas)
- **Botões**: Cancelar e Salvar com loading state

## Integração com API

### Endpoints Utilizados
```typescript
// Buscar escola por usuário
GET /api/escolas/usuario/{usuarioId}

// Listar todos os programas
GET /api/programas

// Atualizar programa
PUT /api/programas/{id}

// Deletar programa
DELETE /api/programas/{id}
```

### Tratamento de Erros
- Try-catch em todas as operações
- Toast de erro com mensagens específicas
- Loading states para feedback visual
- Fallback para dados locais quando API falha

## Benefícios Implementados

### 1. **Experiência do Usuário**
- Interface intuitiva e responsiva
- Feedback imediato para todas as ações
- Loading states para operações assíncronas
- Separação clara entre diferentes tipos de programa

### 2. **Funcionalidade Completa**
- CRUD completo para programas
- Sincronização automática com API
- Validação de dados
- Tratamento robusto de erros

### 3. **Manutenibilidade**
- Código modular e reutilizável
- Separação de responsabilidades
- Tipagem TypeScript completa
- Documentação inline

## Como Testar

### 1. **Pré-requisitos**
- Backend rodando na porta 8081
- Usuário logado como escola
- Escola cadastrada no banco de dados

### 2. **Cenários de Teste**
1. **Visualização**: Acessar dashboard e verificar lista de programas
2. **Edição**: Clicar "Editar", alterar dados, salvar
3. **Status**: Alternar entre ATIVO/INATIVO
4. **Exclusão**: Deletar programa e verificar remoção
5. **Sincronização**: Usar botão "Atualizar" para recarregar dados

### 3. **Validações**
- Verificar se apenas programas da escola logada aparecem
- Confirmar que mudanças são persistidas na API
- Testar responsividade em diferentes tamanhos de tela
- Validar tratamento de erros quando API está offline