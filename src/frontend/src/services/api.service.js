import JwtService from "@/services/jwt.service";
import axios from "@/plugins/axios";

// Базовый API-сервис
export class BaseApiService {}

export class ReadOnlyApiService extends BaseApiService {
  // resource — приватное свойство класса. Добавляем его к базовому URL, чтобы получить
  // финальный URL, на который нужно отправлять запросы
  #resource;
  constructor(resource) {
    super();
    this.#resource = resource;
  }

  // запрос на получение списка сущностей
  // GET /resources
  async query(config = {}) {
    const { data } = await axios.get(this.#resource, config);
    return data;
  }

  // запрос на получение одной сущности по id
  // GET /resources/:id
  async get(id, config = {}) {
    const { data } = await axios.get(`${this.#resource}/${id}`, config);
    return data;
  }
}

export class CrudApiService extends ReadOnlyApiService {
  // resource — приватное свойство класса. Добавляем его к базовому URL, чтобы получить
  // финальный URL, на который нужно отправлять запросы
  #resource;
  constructor(resource) {
    super(resource);
    this.#resource = resource;
  }

  // запрос на создание сущности
  // POST /resources
  async post(entity) {
    const { data } = await axios.post(this.#resource, entity);
    return data;
  }

  // запрос на обновление сущности
  // PUT /resources/:id
  async put(entity) {
    const { data } = await axios.put(`${this.#resource}/${entity.id}`, entity);
    return data;
  }

  // запрос на удаление сущности
  // DELETE /resources/:id
  async delete(id) {
    const { data } = await axios.delete(`${this.#resource}/${id}`);
    return data;
  }
}

export class AuthApiService extends BaseApiService {
  constructor() {
    super();
  }

  setAuthHeader() {
    const token = JwtService.getToken();
    axios.defaults.headers.common.authorization = token
      ? `Bearer ${token}`
      : "";
  }

  async login(params) {
    const { data } = await axios.post("/login", params);
    return data;
  }

  async logout() {
    const { data } = await axios.delete("/logout");
    return data;
  }

  async whoAmI() {
    const { data } = await axios.get("/whoAmI");
    return data;
  }
}

export class BuilderApiService extends BaseApiService {
  // resource — приватное свойство класса. Добавляем его к базовому URL, чтобы получить
  // финальный URL, на который нужно отправлять запросы
  #resource;
  constructor(resource) {
    super();
    this.#resource = resource;
  }

  // запрос на получение списка сущностей
  // GET /resources
  async query(config = {}) {
    const { data } = await axios.get(this.#resource, config);
    return data;
  }
}
