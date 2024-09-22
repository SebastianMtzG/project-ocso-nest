import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {v4 as uuid} from 'uuid';
import { filter } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository : Repository<Product>
  )
  {} 
  private products: CreateProductDto[] = [ {
    productId: uuid(),
    productName: "Helado",
    price: 35,
    countSeal: 3,
    provider: uuid()
  },
  {
    productId: uuid(),
    productName: "Agua",
    price: 15,
    countSeal: 7,
    provider: uuid()
  },
  {
    productId: uuid(),
    productName: "paleta",
    price: 22,
    countSeal: 4,
    provider: uuid()    
  }

]

create(CreateProductDto: CreateProductDto){
  const product =this.productRepository.save(CreateProductDto);
  return product;
}
  findAll() {
    return this.productRepository.find();
  }

  findOne(id: string) {
    const product = this.productRepository.findOneBy({
      productId: id,
    })
    if(!product) throw new NotFoundException()
    return product;
  }
  findByProvider(id:string){
    const productFound = this.products.filter(product => product.provider === id);
    if (productFound.length === 0) throw new NotFoundException();
    return productFound;  }

    async update(id: string, updateProductDto: UpdateProductDto) {
      const productToUpdate = await this.productRepository.preload({
          productId: id,
          ...updateProductDto
      })
      
      if (!productToUpdate) throw new NotFoundException();
      this.productRepository.save(productToUpdate);

      return productToUpdate;
  }
  
  remove(id: string) {
    this.findOne(id);
    this.productRepository.delete({
        productId: id,
    })

    return {
        message: `Objeto con id ${id} eliminado`
    }
}
} 

