import type { Exame, ExameRequest, ApiResponse } from '../types/exame';

export class ExameApi {
  private static readonly BASE_URL = 'https://sprint4-java-av1f.onrender.com';
  private static readonly TIMEOUT = 30000;

  private static async fetchWithTimeout(
    url: string,
    options: RequestInit = {}
  ): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.TIMEOUT);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...options.headers,
        },
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  private static async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const requestId = `resp_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    const timestamp = new Date().toISOString();
    const status = response.status;

    try {
      if (status === 200 || status === 201) {
        const responseText = await response.text();
        let data;
        
        try {
          data = JSON.parse(responseText);
        } catch {
          data = { message: responseText, success: true };
        }

        return {
          success: true,
          data,
          status,
          requestId,
          timestamp
        };
      }

      const errorText = await response.text();
      return {
        success: false,
        error: errorText || `HTTP ${status}`,
        status,
        requestId,
        timestamp
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido',
        status: 0,
        requestId,
        timestamp
      };
    }
  }

  static async getAllExames(): Promise<ApiResponse<Exame[]>> {
    try {
      const response = await this.fetchWithTimeout(`${this.BASE_URL}/main/exames`);
      return await this.handleResponse<Exame[]>(response);
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao buscar exames',
        status: 0,
        requestId: `err_${Date.now()}`,
        timestamp: new Date().toISOString()
      };
    }
  }

  static async createExame(exame: ExameRequest): Promise<ApiResponse<Exame>> {
    try {
      const response = await this.fetchWithTimeout(`${this.BASE_URL}/main/exame`, {
        method: 'POST',
        body: JSON.stringify(exame),
      });
      return await this.handleResponse<Exame>(response);
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao criar exame',
        status: 0,
        requestId: `err_${Date.now()}`,
        timestamp: new Date().toISOString()
      };
    }
  }

  static async deleteExame(id: number): Promise<ApiResponse<void>> {
    try {
      const response = await this.fetchWithTimeout(`${this.BASE_URL}/main/exames/${id}`, {
        method: 'DELETE',
      });
      return await this.handleResponse<void>(response);
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao deletar exame',
        status: 0,
        requestId: `err_${Date.now()}`,
        timestamp: new Date().toISOString()
      };
    }
  }
}
