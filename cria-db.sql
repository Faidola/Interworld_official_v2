USE master
IF EXISTS(select * from sys.databases where name='bd_intercambio')
DROP DATABASE bd_intercambio
GO
-- CRIAR UM BANCO DE DADOS
CREATE DATABASE bd_intercambio
GO
-- ACESSAR O BANCO DE DADOS
USE bd_intercambio
GO
 
CREATE TABLE Usuario
(
   id            INT            IDENTITY,
   nome          VARCHAR(100)   NOT NULL,
   email         VARCHAR(100)   UNIQUE NOT NULL,
   senha         VARCHAR(100)   NOT NULL,
   nivelAcesso   VARCHAR(20)    NULL, -- ADMIN ou INTERCAMBISTA ou ESCOLA ou SENHORIO
   foto          VARBINARY(MAX) NULL,
   dataCadastro  SMALLDATETIME  NOT NULL,
   statusUsuario VARCHAR(20)    NOT NULL, -- ATIVO ou INATIVO ou TROCAR_SENHA
 
   PRIMARY KEY (id)
);
INSERT Usuario (nome, email, senha, nivelAcesso, foto, dataCadastro, statusUsuario)
VALUES ('Fulano da Silva', 'fulano@email.com.br', 'MTIzNDU2Nzg=', 'ADMIN', NULL, GETDATE(), 'ATIVO')
INSERT Usuario (nome, email, senha, nivelAcesso, foto, dataCadastro, statusUsuario)
VALUES ('Beltrana de Sá', 'beltrana@email.com.br', 'MTIzNDU2Nzg=', 'USER', NULL, GETDATE(), 'ATIVO')
INSERT Usuario (nome, email, senha, nivelAcesso, foto, dataCadastro, statusUsuario)
VALUES ('Sicrana de Oliveira', 'sicrana@email.com.br', 'MTIzNDU2Nzg=', 'USER', NULL, GETDATE(), 'INATIVO')
INSERT Usuario (nome, email, senha, nivelAcesso, foto, dataCadastro, statusUsuario)
VALUES ('Ordnael Zurc', 'ordnael@email.com.br', 'MTIzNDU2Nzg=', 'USER', NULL, GETDATE(), 'TROCAR_SENHA')
GO
 
CREATE TABLE Escola
(
    id           INT            IDENTITY,
    nome         VARCHAR(100)   NOT NULL,
    descricao    VARCHAR(400)   NOT NULL,
	infoEscola   VARCHAR(400)   	NULL,
    pais         VARCHAR(50)    NOT NULL,
    regiao       VARCHAR(50)    NOT NULL,
    telefone     VARCHAR(20)    NOT NULL,
    website      VARCHAR(100)   NOT NULL,
    foto         VARBINARY(max)     NULL,
    avalicao     DECIMAL(3,1)       NULL,
    usuario_id   INT            NOT NULL,
    statusEscola VARCHAR(10)    NOT NULL, -- ATIVO ou INATIVO
	identificacaoEscola VARCHAR(30) NULL,
	codigoPostal        VARCHAR(20) NULL,
	estado VARCHAR(50) NULL,
	cidade VARCHAR(50) NULL,
	enderecoCompleto     VARCHAR(300) NOT NULL,
 
    PRIMARY KEY (id),
    FOREIGN KEY (usuario_id) REFERENCES Usuario (id)
);
 
CREATE TABLE Idioma
(
    id        INT          IDENTITY,
    nome      VARCHAR(50)  NOT NULL,
    descricao VARCHAR(100) NOT NULL,
 
    PRIMARY KEY(id)
);
 
CREATE TABLE EscolaIdioma
(
    id                  INT             IDENTITY,
    descricao           VARCHAR(400)    NOT NULL,
    escola_id           INT             NOT NULL,
    idioma_id           INT             NOT NULL,
    statusEscolaIdioma  VARCHAR(10)     NOT NULL, -- ATIVO ou INATIVO
 
    PRIMARY KEY (id),
    FOREIGN KEY (escola_id) REFERENCES Escola (id),
    FOREIGN KEY (idioma_id) REFERENCES Idioma (id)
);
 
CREATE TABLE Senhorio
(
    id              INT             IDENTITY,
    nome            VARCHAR(100)    NOT NULL,
    descricao       VARCHAR(400)    NOT NULL,
    pais            VARCHAR(50)     NOT NULL,
    localSenhorio   VARCHAR(100)    NOT NULL,
    telefone        VARCHAR(20)     NOT NULL,
    foto            VARBINARY(max)      NULL,
    usuario_id      INT             NOT NULL,
    statusSenhorio  VARCHAR(10)     NOT NULL, -- ATIVO ou INATIVO
 
    PRIMARY KEY (id),
    FOREIGN KEY (usuario_id) REFERENCES Usuario (id)
);
 
CREATE TABLE Estudante
(
    id              INT             IDENTITY,
    usuario_id      INT             NOT NULL,
    dataNascimento  VARCHAR(10)         NULL,
	nome			VARCHAR(60)         NULL,
    cpf             VARCHAR(14)         NULL,
    rg              VARCHAR(12)         NULL,
    telefone        VARCHAR(20)         NULL,
    endereco        VARCHAR(200)        NULL,
    cidade          VARCHAR(100)        NULL,
    estado          VARCHAR(2)          NULL,
    cep             VARCHAR(9)          NULL,
    statusEstudante VARCHAR(10)     NOT NULL, -- ATIVO ou INATIVO
 
    PRIMARY KEY (id),
    FOREIGN KEY (usuario_id) REFERENCES Usuario (id)
);
/*
CREATE TABLE CadastroEscola
(
    id               INT IDENTITY PRIMARY KEY,
    nomeEscola       VARCHAR(100)   NOT NULL,
    emailContato     VARCHAR(100)   NOT NULL,
    pais             VARCHAR(50)    NOT NULL,
    regiao           VARCHAR(50)    NOT NULL,
    telefone         VARCHAR(20)    NOT NULL,
    website          VARCHAR(100)   NOT NULL,
    endereco         VARCHAR(150)   NOT NULL,
    descricao        VARCHAR(400)   NULL,
    foto             VARBINARY(MAX) NULL,
    usuario_id       INT            NOT NULL,
    dataCadastro     SMALLDATETIME  NOT NULL DEFAULT GETDATE(),
    statusCadastro   VARCHAR(10)    NOT NULL DEFAULT 'ATIVO', -- ATIVO / INATIVO

    FOREIGN KEY (usuario_id) REFERENCES Usuario (id)
);

CREATE TABLE CadastroCasa
(
    id               INT IDENTITY PRIMARY KEY,
    nomeSenhorio     VARCHAR(100)   NOT NULL,
    emailContato     VARCHAR(100)   NOT NULL,
    telefone         VARCHAR(20)    NOT NULL,
    pais             VARCHAR(50)    NOT NULL,
    localidade       VARCHAR(100)   NOT NULL,
    numeroVagas      INT            NOT NULL,
    descricao        VARCHAR(400)   NULL,
    foto             VARBINARY(MAX) NULL,
    usuario_id       INT            NOT NULL,
    dataCadastro     SMALLDATETIME  NOT NULL DEFAULT GETDATE(),
    statusCadastro   VARCHAR(10)    NOT NULL DEFAULT 'ATIVO', -- ATIVO / INATIVO

    FOREIGN KEY (usuario_id) REFERENCES Usuario (id)
);
*/
CREATE TABLE Mensagem
(
    id              INT             IDENTITY,
    dataMensagem    SMALLDATETIME   NOT NULL,
    usuario_id      INT             NOT NULL,
    tipo            VARCHAR(20)     NOT NULL, -- Feedback, Comentário, Contato ou Avaliação
    texto           VARCHAR(400)    NOT NULL,
    nota            DECIMAL(3,1)        NULL,
    escola_id       INT                 NULL,
    dataResposta    SMALLDATETIME       NULL,
    resposta        VARCHAR(400)        NULL,
    statusMensagem  VARCHAR(10)     NOT NULL, -- ATIVO ou RESPONDIDA ou INATIVO
 
    PRIMARY KEY (id),
    FOREIGN KEY (usuario_id) REFERENCES Usuario (id),
    FOREIGN KEY (escola_id) REFERENCES Escola (id)
);
 
-- Tabela para Programas de Intercâmbio
CREATE TABLE ProgramaIntercambio
(
    id                    INT             IDENTITY,
    titulo                VARCHAR(200)    NOT NULL,
    descricao             VARCHAR(1000)   NOT NULL,
    pais                  VARCHAR(50)     NOT NULL,
    cidade                VARCHAR(100)    NOT NULL,
    duracaoSemanas        INT             NOT NULL,
    vagasDisponiveis      INT             NOT NULL,
    preco                 DECIMAL(10,2)   NOT NULL,
    moeda                 VARCHAR(3)      NOT NULL DEFAULT 'USD',
    nivelIdioma           VARCHAR(50)     NOT NULL,
    tipoPrograma          VARCHAR(50)     NOT NULL, -- 'CURSO_IDIOMA', 'ACADEMICO', 'PROFISSIONAL'
    temBolsa              BIT             NOT NULL DEFAULT 0,
    dataInicio            DATE            NULL,
    dataFim               DATE            NULL,
    requisitos            VARCHAR(1000)   NULL,
    escola_id             INT             NOT NULL,
    statusPrograma        VARCHAR(20)     NOT NULL DEFAULT 'ATIVO', -- ATIVO, INATIVO, PAUSADO
    dataCriacao           SMALLDATETIME   NOT NULL DEFAULT GETDATE(),
    dataAtualizacao       SMALLDATETIME   NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (escola_id) REFERENCES Escola (id)
);

-- Tabela para Acomodações dos Programas
CREATE TABLE AcomodacaoPrograma
(
    id                    INT             IDENTITY,
    programa_id           INT             NOT NULL,
    tipoAcomodacao        VARCHAR(50)     NOT NULL, -- 'CASA_FAMILIA', 'RESIDENCIA', 'APARTAMENTO', 'STUDIO'
    descricao             VARCHAR(500)    NOT NULL,
    precoSemanal          DECIMAL(10,2)   NOT NULL,
    moeda                 VARCHAR(3)      NOT NULL DEFAULT 'USD',
    comodidades           VARCHAR(500)    NULL, -- JSON string com comodidades
    disponivel            BIT             NOT NULL DEFAULT 1,

    PRIMARY KEY (id),
    FOREIGN KEY (programa_id) REFERENCES ProgramaIntercambio (id)
);

-- Tabela para Estágios dos Programas
CREATE TABLE EstagioPrograma
(
    id                    INT             IDENTITY,
    programa_id           INT             NOT NULL,
    disponivel            BIT             NOT NULL DEFAULT 0,
    descricao             VARCHAR(500)    NULL,
    duracaoSemanas        VARCHAR(50)     NULL, -- '4-8 semanas', '6-12 semanas', etc
    areas                 VARCHAR(500)    NULL, -- JSON string com áreas de estágio
    remunerado            BIT             NOT NULL DEFAULT 0,
    requisitos            VARCHAR(500)    NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (programa_id) REFERENCES ProgramaIntercambio (id)
);

-- Tabela para Candidaturas de Estudantes
CREATE TABLE CandidaturaPrograma
(
    id                    INT             IDENTITY,
    programa_id           INT             NOT NULL,
    estudante_id          INT             NOT NULL,
    statusCandidatura     VARCHAR(20)     NOT NULL DEFAULT 'PENDENTE', -- PENDENTE, APROVADA, REJEITADA, CANCELADA
    dataCandidatura       SMALLDATETIME   NOT NULL DEFAULT GETDATE(),
    observacoes           VARCHAR(1000)   NULL,
    documentosEnviados    VARCHAR(500)    NULL, -- JSON string com documentos
    dataResposta          SMALLDATETIME   NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (programa_id) REFERENCES ProgramaIntercambio (id),
    FOREIGN KEY (estudante_id) REFERENCES Estudante (id)
);

-- Inserir alguns idiomas básicos
INSERT INTO Idioma (nome, descricao) VALUES 
('Inglês', 'Língua inglesa'),
('Espanhol', 'Língua espanhola'),
('Francês', 'Língua francesa'),
('Alemão', 'Língua alemã'),
('Italiano', 'Língua italiana'),
('Português', 'Língua portuguesa'),
('Japonês', 'Língua japonesa'),
('Chinês', 'Língua chinesa');

-- Inserir dados de exemplo para programas
INSERT INTO ProgramaIntercambio (titulo, descricao, pais, cidade, duracaoSemanas, vagasDisponiveis, preco, moeda, nivelIdioma, tipoPrograma, temBolsa, dataInicio, dataFim, requisitos, escola_id, statusPrograma)
VALUES 
('Inglês Intensivo em Nova York', 'Aprenda inglês no coração da Big Apple. Aulas dinâmicas com foco em conversação e cultura local.', 'Estados Unidos', 'Nova York', 4, 15, 1850.00, 'USD', 'Básico', 'CURSO_IDIOMA', 0, '2025-03-01', '2025-03-29', 'Nível Básico, Visto de Turista', 1, 'ATIVO'),
('Inglês Geral em Londres', 'Desenvolva sua fluência em um ambiente acadêmico tradicional e explore a capital britânica.', 'Reino Unido', 'Londres', 8, 10, 3200.00, 'USD', 'Intermediário', 'CURSO_IDIOMA', 1, '2025-04-01', '2025-05-27', 'Nível Intermediário, Passaporte Válido', 1, 'ATIVO');

-- Inserir acomodações para os programas
INSERT INTO AcomodacaoPrograma (programa_id, tipoAcomodacao, descricao, precoSemanal, moeda, comodidades, disponivel)
VALUES 
(1, 'CASA_FAMILIA', 'Acomodação em casa de família americana com café da manhã incluído', 320.00, 'USD', '["Wi-Fi", "Café da manhã", "Quarto individual"]', 1),
(2, 'RESIDENCIA', 'Residência universitária no centro de Londres com outros estudantes internacionais', 280.00, 'USD', '["Wi-Fi", "Cozinha compartilhada", "Quarto individual", "Área de estudos"]', 1);

-- Inserir estágios para os programas
INSERT INTO EstagioPrograma (programa_id, disponivel, descricao, duracaoSemanas, areas, remunerado, requisitos)
VALUES 
(1, 0, 'Programa focado em estudos - sem estágio disponível', NULL, NULL, 0, NULL),
(2, 1, 'Oportunidade de estágio em empresas locais após completar 6 semanas do curso', '4-8 semanas', '["Marketing", "Turismo", "Educação"]', 0, 'Completar 6 semanas do curso');

SELECT * FROM Usuario
SELECT * FROM Mensagem
SELECT * FROM Estudante
SELECT * FROM Escola
SELECT * FROM ProgramaIntercambio
SELECT * FROM AcomodacaoPrograma
SELECT * FROM EstagioPrograma