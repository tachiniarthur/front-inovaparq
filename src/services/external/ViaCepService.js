import axios from 'axios';

export const useViaCEP = () => {
    async function getAddress(cep) {
        try {
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                }
            });
            if (response.data.erro) {
                throw new Error("CEP inválido ou não encontrado.");
            }
            return { data: response.data, error: null };
        } catch (error) {
            return { data: null, error };
        }
    }

    return { getAddress };
};
