# Integração Backend - Programas de Intercâmbio

## Resumo das Alterações

Este documento descreve as alterações feitas para integrar a página de cadastro de programas e a listagem de programas com o backend Spring Boot.

## Arquivos Criados

### 1. `src/services/programaService.ts`
Serviço centralizado para comunicação com a API do backend.

**Endpoints utilizados:**
- `GET /api/programas` - Lista todos os programas
- `GET /api/programas/{id}` - Busca um programa específico
- `POST /api/programas` - Cria um novo programa
- `PUT /api/programas/{id}` - Atualiza um programa existente
- `DELETE /api/programas/{id}` - Remove um programa

**Configuração:**
- URL base da API: `http://localhost:8081/api`

## Arquivos Modificados

### 1. `src/pages/CadastrarPrograma.tsx`

**Alterações principais:**
- Integração com o hook `useAuth` para obter o ID da escola logada
- Formulário simplificado com campos correspondentes ao banco de dados:
  - Título
  - Descrição
  - Idioma (select com opções)
  - País
  - Cidade
  - Vagas Disponíveis
  - Preço (USD)
  - Acomodações (opcional, múltiplas)
  - Informações de Estágio (opcional)
  
**Funcionalidades:**
- Validação de campos obrigatórios
- Formatação de acomodações e estágios em JSON para armazenamento
- Envio para API via `POST /api/programas`
- Feedback visual durante o envio (botão desabilitado e texto "Cadastrando...")
- Toast de sucesso/erro
- Redirecionamento para dashboard após cadastro bem-sucedido

**Mapeamento de dados:**
```typescript
{
  titulo: string,
  descricao: string,
  idioma: { id: number },
  pais: string,
  cidade: string,
  vagasDisponiveis: number,
  preco: number,
  escola: { id: number }, // ID da escola logada
  dataCadastro: string (ISO),
  acomodacao: string (JSON), // Array de acomodações
  acomodacaoPreco: string,
  infoEstagio: string (JSON), // Objeto com informações do estágio
  statusPrograma: 'ATIVO'
}
```

### 2. `src/components/ProgramsSection.tsx`

**Alterações principais:**
- Busca dinâmica de programas do backend no `useEffect`
- Estado de loading com spinner
- Tratamento de erros (fallback para programas estáticos)
- Conversão de dados da API para formato dos cards
- Filtragem por status (apenas programas ATIVOS)

**Funcionalidades:**
- Parse de JSON de acomodações e estágios
- Mapeamento de bandeiras por país
- Formatação de preços
- Exibição condicional de:
  - Acomodações (mostra mensagem se não disponível)
  - Estágios (oculta se não disponível)
  - Requisitos (oculta se não disponível)
  - Duração (oculta se não disponível)

**Lógica de fallback:**
Se o backend não estiver disponível ou não houver programas, a aplicação mostra os programas estáticos de exemplo.

## Como Testar

### Pré-requisitos
1. Backend Spring Boot rodando na porta 8081
2. Banco de dados configurado e acessível
3. Usuário logado como escola (para cadastrar programas)

### Teste 1: Cadastrar Programa
1. Faça login como escola
2. Acesse o dashboard
3. Clique em "Cadastrar Programa"
4. Preencha os campos obrigatórios:
   - Título do Programa
   - Idioma
   - Descrição
   - País
   - Cidade
   - Vagas Disponíveis
   - Preço
5. (Opcional) Adicione acomodações:
   - Clique em "Adicionar Acomodação"
   - Preencha tipo, descrição, preço e comodidades
6. (Opcional) Configure estágio:
   - Marque "Oferece oportunidade de estágio"
   - Preencha descrição, duração, áreas e requisitos
7. Clique em "Cadastrar Programa"
8. Verifique o toast de sucesso
9. Confirme redirecionamento para dashboard

### Teste 2: Visualizar Programas
1. Acesse a página "Programas" (`/programas`)
2. Aguarde o carregamento (spinner)
3. Verifique se os programas cadastrados aparecem nos cards
4. Confirme que as informações estão corretas:
   - Título, país, descrição
   - Preço, vagas
   - Acomodações (se cadastradas)
   - Estágios (se cadastrados)

### Teste 3: Backend Offline
1. Pare o backend
2. Acesse a página "Programas"
3. Verifique se a mensagem de erro aparece
4. Confirme que os programas estáticos são exibidos como fallback

## Estrutura do Banco de Dados

```sql
CREATE TABLE ProgramaIntercambio (
    id                    INT             IDENTITY,
    titulo                VARCHAR(200)    NOT NULL,
    descricao             VARCHAR(1000)   NOT NULL,
    idioma_id             INT             NOT NULL,
    pais                  VARCHAR(50)     NOT NULL,
    cidade                VARCHAR(100)    NOT NULL,
    vagasDisponiveis      INT             NOT NULL,
    preco                 DECIMAL(10,2)   NOT NULL,
    escola_id             INT             NOT NULL,
    dataCadastro          SMALLDATETIME   NOT NULL,
    acomodacao            VARCHAR(200)    NULL,
    acomodacaoPreco       VARCHAR(200)    NULL,
    infoEstagio           VARCHAR(200)    NULL,
    statusPrograma        VARCHAR(20)     NOT NULL DEFAULT 'ATIVO'
)
```

## Formato JSON dos Campos

### Acomodação (campo `acomodacao`)
```json
[
  {
    "tipo": "Casa de Família",
    "descricao": "Acomodação em casa de família americana com café da manhã incluído",
    "precoSemanal": "320.00",
    "comodidades": ["Wi-Fi", "Café da manhã", "Quarto individual"]
  }
]
```

### Estágio (campo `infoEstagio`)
```json
{
  "descricao": "Oportunidade de estágio em empresas locais após completar 6 semanas do curso",
  "duracao": "4-8 semanas",
  "areas": ["Marketing", "Turismo", "Educação"],
  "remunerado": false,
  "requisitos": "Completar 6 semanas do curso"
}
```

## Idiomas Suportados

Os IDs de idiomas disponíveis no select:
1. Inglês
2. Espanhol
3. Francês
4. Alemão
5. Italiano
6. Mandarim

**Nota:** Certifique-se de que esses IDs existem na tabela `Idioma` do banco de dados.

## Possíveis Melhorias Futuras

1. **Validação de Formulário:**
   - Adicionar validação de formato de preço
   - Validar número de vagas (maior que 0)
   
2. **Imagens:**
   - Adicionar upload de imagens do programa
   - Mostrar imagens nos cards
   
3. **Filtros:**
   - Filtrar programas por país, idioma, preço
   - Busca por texto
   
4. **Paginação:**
   - Implementar paginação na listagem de programas
   
5. **Edição/Exclusão:**
   - Permitir editar programas cadastrados
   - Permitir excluir/inativar programas

6. **Busca de Idiomas Dinâmica:**
   - Buscar idiomas disponíveis da API ao invés de lista fixa

## Troubleshooting

### Erro: "Você precisa estar logado como escola"
**Solução:** Certifique-se de que:
- O usuário está logado
- O `userData.id` existe no localStorage
- O tipo de usuário é "school"

### Erro: "Erro ao cadastrar programa"
**Solução:** Verifique:
- Backend está rodando na porta 8081
- Campos obrigatórios estão preenchidos
- O ID da escola existe no banco
- O ID do idioma é válido

### Programas não aparecem na listagem
**Solução:** Verifique:
- Backend está rodando
- Há programas com `statusPrograma = 'ATIVO'` no banco
- O console do navegador para erros de CORS ou rede
- A URL da API está correta no arquivo `programaService.ts`

### CORS Error
Se você encontrar erros de CORS, adicione no backend:

```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                    .allowedOrigins("http://localhost:5173", "http://localhost:3000")
                    .allowedMethods("GET", "POST", "PUT", "DELETE")
                    .allowedHeaders("*");
            }
        };
    }
}
```

