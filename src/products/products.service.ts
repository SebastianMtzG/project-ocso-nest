import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {v4 as uuid} from 'uuid';
import { filter } from 'rxjs';

@Injectable()
export class ProductsService {
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
  if(CreateProductDto.productId) CreateProductDto.productId = uuid()
  CreateProductDto.productId = uuid()
  this.products.push(CreateProductDto)
  return CreateProductDto;
}
  findAll() {
    return this.products;
  }

  findOne(id: string) {
    const productFound = this.products.find((product) =>product.productId === id[0])
    if(!productFound) throw new NotFoundException()
    return productFound;
  }
  findByProvider(id:string){
    const productFound = this.products.filter(product => product.provider === id);
    if (productFound.length === 0) throw new NotFoundException();
    return productFound;  }

  update(id: string, updateProductDto: UpdateProductDto) {

    let product = this.findOne(id); // Encuentra el producto por su ID.
    this.products = this.products.map((product) =>{
      if(product.productId === id) return{
        ...product,
        ...updateProductDto
      }
      return product;
    })
  return product;
  }

  remove(id: string) {
const { productId } = this.findOne(id);
this.products = this.products.filter((product) => product.productId !== productId)
return this.products
  }
}
