import JWTService from "@/services/jwt.service";
import { createResources } from "@/common/helpers";
import Notifier from "@/plugins/notifier";
import router from "@/router";

export default function (store) {
  store.$jwt = JWTService;
  store.$api = createResources(store.$notifier);
  store.$notifier = new Notifier(store);
  store.$router = router;
}
