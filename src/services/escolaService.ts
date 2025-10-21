const API_BASE_URL = 'http://localhost:8081/api';

export interface Escola {
  id: number;
  nome: string;
  descricao: string;
  pais: string;
  regiao: string;
  telefone: string;
  website: string;
  usuario_id: number;
  statusEscola: string;
}

class EscolaService {
  async buscarPorUsuarioId(usuarioId: number): Promise<Escola> {
    try {
      const response = await fetch(`${API_BASE_URL}/escolas/usuario/${usuarioId}`);
      if (!response.ok) {
        throw new Error('Escola não encontrada para este usuário');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar escola:', error);
      throw error;
    }
  }
}

export default new EscolaService();