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
	statusPrograma        VARCHAR(20)     NOT NULL DEFAULT 'ATIVO', -- ATIVO, INATIVO, PAUSADO


    PRIMARY KEY (id),
    FOREIGN KEY (escola_id) REFERENCES Escola (id),
	FOREIGN KEY (idioma_id) REFERENCES Idioma (id)
);
 
SELECT * FROM Usuario
SELECT * FROM Mensagem
SELECT * FROM Estudante
SELECT * FROM Escola
SELECT * FROM ProgramaIntercambio
