import { ADMIN, STANDARD } from "../../constants/roles.constant.js";
import UserController from "../../controllers/user.controller.js";
import BaseRouter from "../base.router.js";

export default class UserRouter extends BaseRouter {
    #userController;

    constructor(){
        super();
        this.#userController = new UserController();

    }

    initialize(){
        const router = this.getRouter();

        this.addGetRoute("/", [], (req, res) => this.#userController.getAll(req, res));
        this.addGetRoute("/:uid", [], (req, res) => this.#userController.getById(req, res));
        this.addPostRoute("/", [], (req, res) => this.#userController.create(req, res));
        this.addPutRoute("/:uid", [], (req, res) => this.#userController.update(req, res));
        this.addDeleteRoute("/:uid", [], (req, res) => this.#userController.delete(req, res));

        // eslint-disable-next-line no-unused-vars
        router.use((error, req, res, next) => {
            res.sendError(error);
        });
    }

    // async #getAll(req, res){

    //     try {
    //         const users = await this.#UserMgr.getAll();
    //         res.sendSuccess200(users);

    //     } catch (error) {
    //         res.sendError(error);
    //     }
    // }

    // async #getOneById(req, res){

    //     try {
    //         const userFound = await this.#UserMgr.getOneById(req.params.uid);
    //         res.sendSuccess200(userFound);

    //     } catch (error) {
    //         res.sendError(error);
    //     }
    // }

    // async #insert(req, res){

    //     try {
    //         const newUser = await this.#UserMgr.insertOne(req.body);
    //         console.log(newUser);

    //         res.sendSuccess201(newUser);

    //     } catch (error) {
    //         res.sendError(error);
    //     }
    // }

    // async #update(req, res){

    //     try {
    //         const userUpdated = await this.#UserMgr.updateOneById(req.params.uid, req.body);

    //         res.sendSuccess200(userUpdated);

    //     } catch (error) {
    //         res.sendError(error);
    //     }
    // }

    // async #delete(req, res){

    //     try {
    //         const userDeleted = await this.#UserMgr.deleteOneById(req.params.uid);
    //         console.log(userDeleted);

    //         res.sendSuccess200(userDeleted);

    //     } catch (error) {
    //         res.sendError(error);
    //     }
    // }

}