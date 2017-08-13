var PRICE = 9.99;

var app = new Vue({
  el: '#app',

  data: {
    total: 0,
    items: [],
    cart: [],
    newSearch: 'anime',
    lastSearch: '',
    loading: false,
    price: PRICE
  },

  methods: {
    onSubmit: function() {
      this.items = [];
      this.loading = true;
      this.$http
        .get('/search/'.concat(this.newSearch))
        .then(function(res) {
          this.lastSearch = this.newSearch;
          this.loading = false;
          this.items = res.data;
        })
    },

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
          price: PRICE,
          qty: 1
        });
      }

      this.total += PRICE;
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
  },

  mounted: function() {
    this.onSubmit();
  }
});
