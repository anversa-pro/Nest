import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from './product.model';

@Injectable()
export class ProductsService {
    products: Product[] = [];

    insertProduct(title: string, desc: string, price: number) {
        const prodId = Math.random().toString();
        const newProduct = new Product(prodId, title, desc, price)
        this.products.push(newProduct);
        return prodId;
    }

    getProducts() {
        return [...this.products];
    }

    getProduct(productId: string) {
        const product = this.findProduct(productId)[0];
        return { ...product };
    }

    updateProduct(productId: string, title: string, desc: string, price: number) {
        // const product = this.findProduct(productId)[0];
        // const index = this.findProduct(productId)[1];
        const [product, index] = this.findProduct(productId);
        const updateProduct = { ...product }
        if (title) {
            updateProduct.title = title;
        }
        if (desc) {
            updateProduct.desc = desc;
        }
        if (price) {
            updateProduct.price = price;
        }
        this.products[index] = updateProduct;
    }

    removeProduct(productId: string){
        const [_, index] = this.findProduct(productId);
        this.products.splice(index, 1);
    }

    private findProduct(productId: string): [Product, number] {
        const productIndex = this.products.findIndex(prod => prod.id === productId)
        const product = this.products[productIndex];
        if (!product) {
            throw new NotFoundException('Could not find product');
        }
        return [product, productIndex]
    }
}