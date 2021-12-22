import uniqueId from "lodash/uniqueId";

export const mockOrder = () => ({ id: +uniqueId(), orderPizzas: [] });
