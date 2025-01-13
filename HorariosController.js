import HorarioDisponivelModel from './PrismaHorarioDisponivelModel.js';

class HorariosController {
    // Método para buscar horários disponíveis
    async getHorariosDisponiveis(req, res) {
        try {
            const { data } = req.query; // Obtém a data dos parâmetros de consulta

            // Chama o método do modelo para buscar os horários disponíveis
            const horariosDisponiveis = await HorarioDisponivelModel.findByDate(data);
            res.json(horariosDisponiveis);
        } catch (error) {
            console.error('Erro ao buscar horários disponíveis:', error);
            res.status(500).json({ error: 'Erro ao buscar horários disponíveis' });
        }
    }
}

export default new HorariosController();
