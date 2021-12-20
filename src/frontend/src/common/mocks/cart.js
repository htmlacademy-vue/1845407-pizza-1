import { normalizeByKey } from "@/common/helpers";

import { MISC_ADDITIONAL } from "@/common/constants";
import misc from "@/static/misc.json";

import { mockChoice } from "@/common/mocks/pizza";

export const mockPizza = mockChoice;
export const mockMisc = normalizeByKey(misc, MISC_ADDITIONAL, "name");
