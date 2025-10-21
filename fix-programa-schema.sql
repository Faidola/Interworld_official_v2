-- Script para corrigir o esquema da tabela ProgramaIntercambio
USE bd_intercambio
GO

-- Adicionar campos que estão faltando na tabela ProgramaIntercambio
ALTER TABLE ProgramaIntercambio ADD idioma_id INT NULL;
ALTER TABLE ProgramaIntercambio ADD dataCadastro SMALLDATETIME NULL;
ALTER TABLE ProgramaIntercambio ADD acomodacao VARCHAR(2000) NULL;
ALTER TABLE ProgramaIntercambio ADD acomodacaoPreco VARCHAR(200) NULL;
ALTER TABLE ProgramaIntercambio ADD infoEstagio VARCHAR(2000) NULL;

-- Adicionar foreign key para idioma
ALTER TABLE ProgramaIntercambio ADD CONSTRAINT FK_ProgramaIntercambio_Idioma 
FOREIGN KEY (idioma_id) REFERENCES Idioma (id);

-- Atualizar programas existentes com idioma_id
UPDATE ProgramaIntercambio SET idioma_id = 1, dataCadastro = GETDATE() WHERE id = 1; -- Inglês
UPDATE ProgramaIntercambio SET idioma_id = 1, dataCadastro = GETDATE() WHERE id = 2; -- Inglês

-- Verificar a estrutura atualizada
SELECT * FROM ProgramaIntercambio;