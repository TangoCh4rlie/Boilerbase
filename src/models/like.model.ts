import type {User} from "~/models/user.model";
import type {Boilerplate} from "~/models/boilerplate.model";

export interface Like {
    id: number;
    boilerplateId: number;
    boilerplate?: Boilerplate;
    userId: number;
    user?: User
}