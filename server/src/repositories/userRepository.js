import User from "../schema/user";
import crudRepository from "./crudRepository";

export const userRepository = {
    ...crudRepository(User),
}