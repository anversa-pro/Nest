import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { throws } from 'assert';
import { generate } from 'rxjs';
import { threadId } from 'worker_threads';

import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }
    @Post()
    async addProduct(
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number,
    ) {
        const generatedId = await this.productsService.insertProduct(
            prodTitle,
            prodDesc,
            prodPrice);
        return { id: generatedId };
    }

    @Get()
    async getAllProducts() {
        const products = await this.productsService.getProducts();
        return products;
    }

    @Get(':id')
    async getProduct(@Param('id') prodId: string) {
        const product = await this.productsService.getProduct(prodId);
        return product;
    }

    @Patch(':id')
    async updateProduct(
        @Param('id') prodId: string,
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number,
    ) {
        await this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
        return null;
    }

    @Delete(':id') 
    async removeProduct(@Param('id') prodId: string){
        await this.productsService.removeProduct(prodId);
        return null;
    }
}