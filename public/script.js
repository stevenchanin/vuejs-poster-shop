var app = new Vue({
  el: '#app',

  data: {
    total: 0,
    items: [
      {id: 1, title: 'Item 1', price: 1.99},
      {id: 2, title: 'Item 2', price: 4.99},
      {id: 3, title: 'Item 3', price: 9.99},
    ],
    cart: []
  },

  methods: {
    addItem: function(index) {
      var item = this.items[index];
      var found = false;

      for(var i = 0; i < this.cart.length; i++) {
        if (this.cart[i].id === item.id) {
          this.cart[i].qty++;
          found = true;
          break
        }
      }

      if (!found) {
        this.cart.push({
          id: item.id,
          title: item.title,
          price: item.price,
          qty: 1
        });
      }

      this.total += item.price;
    },

    inc: function(item) {
      item.qty++;
      this.total += item.price;
    },

    dec: function(item) {
      if (item.qty > 1) {
        item.qty--;
      } else {
        for(var i = 0; i < this.cart.length; i++) {
          if (this.cart[i].id === item.id) {
            this.cart.splice(i, 1);
            break
          }
        }
      }
      this.total -= item.price;
    }
  },

  filters: {
    currency: function(price) {
      return '$'.concat(price.toFixed(2));
    }
  }
});
