import JWTService from "@/services/jwt.service";
import { createResources } from "@/common/helpers";
import Notifier from "@/plugins/notifier";

export default function createPlugin() {
  return (store) => {
    store.$jwt = JWTService;
    store.$notifier = new Notifier(store);
    store.$api = createResources(store.$notifier);
  };
}
