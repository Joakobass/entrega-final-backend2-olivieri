import { ERROR_NOT_FOUND_ID } from "../constants/messages.constant.js";
import CartRepository from "../repositories/cart.repository.js";

export default class CartService {
    #cartRepository;

    constructor (){
        this.#cartRepository = new CartRepository();
    }

    async findAll() {
        return await this.#cartRepository.findAll();
    }

    async findOneById(id) {
        const cartFound = await this.#cartRepository.findOneById(id);
        if (!cartFound) throw new Error(ERROR_NOT_FOUND_ID);

        return cartFound;
    }

    #findProductInCart(cart, idProduct){
        const productFound = cart.products.find((product) => product.product._id.toString() === idProduct.toString());
        return productFound;
    }

    #findProductIndex(cart, idProduct){
        const index = cart.products.findIndex( (product) => product.product._id.toString() === idProduct.toString());
        return index;
    }

    async createCart() {
        return await this.#cartRepository.create();
    }

    async addProduct(idCart, idProduct){
        const cart = await this.findOneById(idCart);

        const productFound = this.#findProductInCart(cart, idProduct);

        if(!productFound){
            cart.products.push({ product: idProduct, quantity: 1 });
            return await this.#cartRepository.save(cart);

        }
        productFound.quantity++;
        return await this.#cartRepository.save(cart);

    }

    async deleteProduct(idCart, idProduct){

        const cart = await this.findOneById(idCart);
        const index = this.#findProductIndex(cart, idProduct);

        if(index !== -1){
            cart.products[index].quantity > 1 ?
                (cart.products[index].quantity--) :
                (cart.products.splice(index, 1));
            return await this.#cartRepository.save(cart);
        }
        return;
    }

    async updateCart(idCart, updatedProducts){
        const cart = await this.findOneById(idCart);
        cart.products = updatedProducts.products;

        return await this.#cartRepository.save(cart);
    }

    async updateProductQuantity(idCart, idProduct, quantity){
        const cart = await this.findOneById(idCart);
        const product = this.#findProductInCart(idProduct);

        product.quantity += Number(quantity);

        return await this.#cartRepository.save(cart);
    }

    async removeAllProducts(idCart){
        const cart = await this.findOneById(idCart);

        cart.products = [];

        return await this.#cartRepository.save(cart);
    }

    async deleteCart(id){
        const cart = await this.findOneById(id);
        await this.#cartRepository.deleteOneById(id);
        return cart;
    }

}