import api from "../api/axios";

export interface CreateTransactionData {
  text: string;
  file?: File | null;
}

const createTransaction = async (data: CreateTransactionData) => {
  const formData = new FormData();

  formData.append("text", data.text);
  formData.append("userId", "6a7c5f6cf96020b9a1fcf7df");

  if (data.file) {
    formData.append("attachment", data.file);
  }

  const response = await api.post(
    "/transaction/createWebTransaction",
    formData,
  );

  return response.data;
};

const createTransactionApi = {
  createTransaction,
};

export default createTransactionApi;
