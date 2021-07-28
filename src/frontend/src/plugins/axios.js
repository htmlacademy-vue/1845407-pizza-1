import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api",
});

// добавляем централизованную обработку ошибок при получении ответа от сервера
axiosInstance.interceptors.response.use(
  (res) => res,
  (e) => {
    const defaultMessage = "Возникла ошибка при выполнении запроса к серверу";
    // axiosInstance.$notifier.error(
    //   e?.response?.data?.error?.message || defaultMessage
    // );
    console.log({ e });
    console.warn(e?.response?.data?.error?.message || defaultMessage);

    throw new Error(e);
  }
);

export default axiosInstance;
