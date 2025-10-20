const API_BASE_URL = 'http://localhost:8081/api';

export interface ProgramaIntercambio {
  id?: number;
  titulo: string;
  descricao: string;
  idioma?: {
    id: number;
    nome: string;
  };
  pais: string;
  cidade: string;
  vagasDisponiveis: number;
  preco: number;
  escola?: {
    id: number;
    nome: string;
  };
  dataCadastro?: string;
  acomodacao?: string;
  acomodacaoPreco?: string;
  infoEstagio?: string;
  statusPrograma?: string;
}

export interface ProgramaCreate {
  titulo: string;
  descricao: string;
  idioma: {
    id: number;
  };
  pais: string;
  cidade: string;
  vagasDisponiveis: number;
  preco: number;
  escola: {
    id: number;
  };
  dataCadastro: string;
  acomodacao?: string;
  acomodacaoPreco?: string;
  infoEstagio?: string;
  statusPrograma: string;
}

class ProgramaService {
  async listarTodos(): Promise<ProgramaIntercambio[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/programas`);
      if (!response.ok) {
        throw new Error('Erro ao buscar programas');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao listar programas:', error);
      throw error;
    }
  }

  async buscarPorId(id: number): Promise<ProgramaIntercambio> {
    try {
      const response = await fetch(`${API_BASE_URL}/programas/${id}`);
      if (!response.ok) {
        throw new Error('Programa não encontrado');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar programa:', error);
      throw error;
    }
  }

  async criar(programa: ProgramaCreate): Promise<ProgramaIntercambio> {
    try {
      const response = await fetch(`${API_BASE_URL}/programas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(programa),
      });
      if (!response.ok) {
        throw new Error('Erro ao criar programa');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao criar programa:', error);
      throw error;
    }
  }

  async atualizar(id: number, programa: ProgramaCreate): Promise<ProgramaIntercambio> {
    try {
      const response = await fetch(`${API_BASE_URL}/programas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(programa),
      });
      if (!response.ok) {
        throw new Error('Erro ao atualizar programa');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao atualizar programa:', error);
      throw error;
    }
  }

  async deletar(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/programas/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Erro ao deletar programa');
      }
    } catch (error) {
      console.error('Erro ao deletar programa:', error);
      throw error;
    }
  }
}

export default new ProgramaService();

