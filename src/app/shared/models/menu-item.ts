import {Identifiable} from "@core/models/identifable";

export interface MenuItem extends Identifiable<string | number> {
  name?: string;
  icon?: string;
}
