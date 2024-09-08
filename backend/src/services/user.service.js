import { ERROR_NOT_FOUND_ID } from "../constants/messages.constant.js";
import UserRepository from "../repositories/user.repository.js";

export default class UserService {
    #userRepository;

    constructor (){
        this.#userRepository = new UserRepository();
    }

    async findAll(paramFilters) {

        return await this.#userRepository.findAll(paramFilters);
    }

    async findOneById(id) {
        const userFound = await this.#userRepository.findOneById(id);
        if (!userFound) throw new Error(ERROR_NOT_FOUND_ID);

        return userFound;
    }

    async findOneByEmailAndPassword(email, password) {
        return await this.#userRepository.findOneByEmailAndPassword(email, password);
    }

    async insertOne(data) {
        return await this.#userRepository.save(data);
    }

    async updateOneById(id, data){
        const userFound = await this.findOneById(id);
        const newValues = { ...userFound, ...data };
        return await this.#userRepository.save(newValues);
    }

    async deleteOneById(id){
        const userFound = await this.findOneById(id);
        await this.#userRepository.deleteOneById(id);
        return userFound;
    }
}