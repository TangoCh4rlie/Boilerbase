import type {Boilerplate} from "~/models/boilerplate.model";
import type {Like} from "~/models/like.model";

export interface User {
    id?: number;
    username: string;
    email: string;
    password?: string;
    avatar?: string;
    boilerplates?: Boilerplate[];
    likes?: Like[];
}