import JWTService from "@/services/jwt.service";
import { createResources } from "@/common/helpers";
import router from "@/router";

export default function (store) {
  store.$jwt = JWTService;
  store.$api = createResources();
  store.$router = router;
}
