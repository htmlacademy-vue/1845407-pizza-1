import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api",
});

// добавляем централизованную обработку ошибок при получении ответа от сервера
axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    const defaultMessage = "Возникла ошибка при выполнении запроса к серверу";
    axiosInstance.$notifier.error(
      err?.response?.data?.error?.message || defaultMessage
    );

    throw new Error(err);
  }
);

export default axiosInstance;
