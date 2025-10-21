-- Script para corrigir dados da tabela Escola
USE bd_intercambio
GO

-- Inserir escola de exemplo para o usuário ID 1 (Fulano da Silva)
INSERT INTO Escola (nome, descricao, infoEscola, pais, regiao, telefone, website, usuario_id, statusEscola, identificacaoEscola, codigoPostal, estado, cidade, enderecoCompleto)
VALUES 
('International Language School', 'Escola de idiomas com mais de 20 anos de experiência em intercâmbios internacionais', 'Especializada em cursos de inglês e espanhol', 'Estados Unidos', 'Nova York', '+1-555-0123', 'www.ils-ny.com', 1, 'ATIVO', 'ILS001', '10001', 'NY', 'Nova York', '123 Broadway, New York, NY 10001');

-- Atualizar o nível de acesso do usuário para ESCOLA
UPDATE Usuario SET nivelAcesso = 'ESCOLA' WHERE id = 1;

-- Verificar os dados inseridos
SELECT u.id as usuario_id, u.nome as usuario_nome, u.nivelAcesso, e.id as escola_id, e.nome as escola_nome 
FROM Usuario u 
LEFT JOIN Escola e ON u.id = e.usuario_id 
WHERE u.id = 1;