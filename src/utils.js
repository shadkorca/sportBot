
const validateCount = (inputNum=0) => {
  if (!isNaN(inputNum) && parseInt(inputNum)>0) {
    return parseInt(inputNum)
  }
  else
    return 0
};

const tr = {
  wrong_number: 'Похоже, Вы ввели неправильное значение,\nэто должно быть натуральное число',
};

class CartHandler {
  constructor() {
    this._cart = [];
    this._order = {};
    this.errorMess = ''
  }

  set error (value) {
    this.errorMess = value
  }

  get error() {
    return this.errorMess
  }

  createOrder (productName) {
    this._order = {
      name: productName,
      quantity: 0,
      price: 300,
      invoice: '',
      status:''
    }
  }

  updateOrder(quantity) {
    this._order.quantity = this.validateCount(quantity);
  }

  validateCount(quantity=0) {
    if (!isNaN(quantity) && parseInt(quantity)>0) {
      this.error = '';
      console.log('no error');
      return parseInt(quantity)
    } else {
      this.error = tr.wrong_number;
      console.log('error', this.error);
      return 0
    }
  };

  updateCart () {
    const dublicate = this.findProductInCart(this._order.name);
    if (dublicate) {
      dublicate.quantity += this._order.quantity
    } else {
      this._cart.push(this._order);
    }
  };

  // getLastProductName() {
  //   if (this._cart.length)
  //     return this._cart[this._cart.length -1 ];
  //   return {}
  // }
  //
  // updateLastProduct(quantity=0) {
  //   if (this.getLastProductName()) {
  //     this.getLastProductName().quantity = quantity
  //   }
  // }

  // calculateAmountOld () {
  //   let amount = 0;
  //   this._cart.forEach(item => {
  //     amount += item.price * item.quantity;
  //     console.log(`${amount} consist of ${item.price} and ${item.quantity}`)
  //   });
  //   return amount
  // };

  calculateAmount() {
    return this._cart.reduce(
      (acc, item, ) => acc + item.price * item.quantity,
      0
    );
  }

  findProductInCart(productName) {
    const duplicate = this._cart.find(product => {
      if (product.name === productName) {
        return product
      }
    });
    console.log('duplicate', duplicate);
    return duplicate
  }

  clearCart() {
    this._cart = [];
  }
}

module.exports = {
  validateCount,
  CartHandler
};