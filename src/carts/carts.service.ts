import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart } from './cart.schema';
import { Product } from '../products/product.schema';
import { AddProductToCartDto } from './dtos/add-product.dto';

@Injectable()
export class CartsService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<Cart>,
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async addProductToCart(
    addProductToCartDto: AddProductToCartDto,
  ): Promise<Cart> {
    const productId = addProductToCartDto.product;
    const userId = addProductToCartDto.user;
    const product = await this.productModel.findById(productId);
    if (!product) {
      throw new NotFoundException(
        `No product exists with this ID: ${productId}`,
      );
    }

    let cart = await this.cartModel.findOne({ user: userId });
    if (!cart) {
      cart = await this.cartModel.create({
        user: userId,
        cartItems: [{ product: productId, price: product.price, quantity: 1 }],
      });
    } else {
      const productIndex = cart.cartItems.findIndex(
        (item) => item.product.toString() === productId,
      );

      if (productIndex > -1) {
        cart.cartItems[productIndex].quantity += 1;
      } else {
        cart.cartItems.push({
          product,
          price: product.price,
          quantity: 1,
        });
      }
    }

    this.calculateTotalPrice(cart);
    await cart.save();
    return cart;
  }

  private calculateTotalPrice(cart: Cart) {
    cart.totalCartPrice = cart.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  }

  async getUserCart(userId: string): Promise<Cart> {
    const cart = await this.cartModel.findOne({ user: userId }).populate({
      path: 'cartItems.product',
      model: 'Product',
      select: 'name -_id',
    });
    if (!cart) {
      throw new NotFoundException(`No cart found for user ID: ${userId}`);
    }
    return cart;
  }

  async removeSpecificCartItem(userId: string, itemId: string): Promise<Cart> {
    const cart = await this.cartModel.findOneAndUpdate(
      { user: userId },
      {
        $pull: { cartItems: { _id: itemId } },
      },
      { new: true },
    );
    if (!cart) {
      throw new NotFoundException(`Cart not found for user: ${userId}`);
    }
    this.calculateTotalPrice(cart);
    await cart.save();

    return cart;
  }

  async clearUserCart(userId: string): Promise<Cart> {
    const cart = await this.cartModel.findOneAndDelete({ user: userId });
    if (!cart) {
      throw new NotFoundException(`No cart exist for this user id: ${userId}`);
    }
    return cart;
  }

  async updateCartItemQuantity(
    userId: string,
    itemId: string,
    quantity: number,
  ): Promise<Cart> {
    const cart = await this.cartModel.findOne({ user: userId });

    if (!cart) {
      throw new NotFoundException(`No cart found for user with ID: ${userId}`);
    }

    const updatedCart = await this.cartModel.findOneAndUpdate(
      { user: userId, 'cartItems._id': itemId },
      {
        $set: { 'cartItems.$.quantity': quantity },
      },
      { new: true },
    );

    if (!updatedCart) {
      throw new NotFoundException(`No item found with ID: ${itemId}`);
    }

    this.calculateTotalPrice(updatedCart);
    await updatedCart.save();

    return updatedCart;
  }
}
