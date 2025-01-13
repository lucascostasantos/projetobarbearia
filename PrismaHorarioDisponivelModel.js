import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class HorarioDisponivelModel {

    // Busca todos os horários disponíveis
    async findAll() {
        return await prisma.horarioDisponivel.findMany();
    }

    // Busca um horário por ID
    async findById(id) {
        return await prisma.horarioDisponivel.findUnique({
            where: { id: Number(id) },
        });
    }

    // Busca um horário por data e hora
    async findByDateTime(dataHora) {
        console.log(dataHora);
        return await prisma.horarioDisponivel.findUnique({
            where: {
                dataHora: dataHora // Passa o campo correto dentro de um objeto
            },
        });
    }

    async findByDate(date) {
        const [year, month, day] = date.split('-'); // Divide a data no formato YYYY-MM-DD

        // Cria o início do dia no horário local
        const startOfDay = new Date(year, month - 1, day); 
        startOfDay.setHours(0, 0, 0, 0); // Define o horário para 00:00:00 local

        // Cria o final do dia no horário local
        const endOfDay = new Date(year, month - 1, day);
        endOfDay.setHours(23, 59, 59, 999); // Define o horário para 23:59:59 local

        // Converte para o formato ISO 8601 que o Prisma espera
        const formattedStartOfDay = startOfDay.toISOString(); // Ex: 2025-01-16T00:00:00.000Z
        const formattedEndOfDay = endOfDay.toISOString(); // Ex: 2025-01-16T23:59:59.999Z

    
        try {
            // Busca horários indisponíveis no banco de dados
            const horariosIndisponiveis = await prisma.horarioDisponivel.findMany({
                where: {
                    dataHora: {
                        gte: formattedStartOfDay, // Data maior ou igual ao início do dia
                        lte: formattedEndOfDay,   // Data menor ou igual ao fim do dia
                    },
                    disponivel: false, // Apenas horários marcados como indisponíveis
                },
                select: {
                    dataHora: true,
                },
            });
    
            const horariosIndisponiveisFormatados = horariosIndisponiveis.map((horario) => {
                const dataHora = new Date(horario.dataHora);
                const hour = String(dataHora.getUTCHours()).padStart(2, '0');  // Pega a hora em UTC
                const minute = String(dataHora.getUTCMinutes()).padStart(2, '0');  // Pega o minuto em UTC
                return `${hour}:${minute}`;  // Retorna no formato HH:mm
            });
    
            const startHour = 8;
            const endHour = 19;
            const breakHours = [11, 12, 13]; // Intervalo de almoço
    
            // Gera todos os horários possíveis no intervalo operacional
            const horariosPossiveis = [];
            for (let hour = startHour; hour <= endHour; hour++) {
                if (!breakHours.includes(hour)) {
                    const time = `${hour}:00`;
                    horariosPossiveis.push(time);
                }
            }

    
            // Remove os horários indisponíveis da lista de horários possíveis
            const horariosDisponiveis = horariosPossiveis.filter(
                (horario) => !horariosIndisponiveisFormatados.includes(horario)
            );
    
            // Retorna os horários disponíveis no formato esperado
            return horariosDisponiveis.map((horario) => ({ horario }));
        } catch (error) {
            console.error('Erro ao buscar horários disponíveis:', error);
            throw error; // Repassa o erro para ser tratado pelo chamador
        }
    }
    
    

    // Cria um novo horário
    async create(dataHora) {
        const utcDateTime = new Date(dataHora).toISOString(); // Converte para UTC no formato ISO
        console.log(utcDateTime);
        return await prisma.horarioDisponivel.create({
            data: {
                dataHora: utcDateTime, // Salva sempre em UTC
                disponivel: true, // Define como disponível por padrão
            },
        });
    }
    

    // Atualiza o estado de disponibilidade
    async updateDisponibilidade(id, disponivel) {
        return await prisma.horarioDisponivel.update({
            where: { id: Number(id) },
            data: { disponivel },
        });
    }

    // Remove um horário (caso necessário)
    async delete(id) {
        return await prisma.horarioDisponivel.delete({
            where: { id: Number(id) },
        });
    }
}

export default new HorarioDisponivelModel();
