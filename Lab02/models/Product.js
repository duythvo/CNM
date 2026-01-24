import {v4 as uuidv4} from "uuid"

export default class Product{
  constructor({id, name, price, quantity, url_image}){
    this.id = id || uuidv4(),
    this.name = name,
    this.price = Number(price),
    this.quantity = Number(quantity),
    this.url_image = url_image
  }
}