var PRICE = 9.99;
var LOAD_NUM = 10;

var app = new Vue({
  el: '#app',

  data: {
    total: 0,
    items: [],
    results: [],
    cart: [],
    newSearch: 'anime',
    lastSearch: '',
    loading: false,
    price: PRICE
  },

  methods: {
    appendItems: function() {
      if (this.items.length < this.results.length) {
        var append = this.results.slice(this.items.length, this.items.length + LOAD_NUM);

        this.items = this.items.concat(append);
      }
    },

    onSubmit: function() {
      this.items = [];
      this.loading = true;
      this.$http
        .get('/search/'.concat(this.newSearch))
        .then(function(res) {
          this.lastSearch = this.newSearch;
          this.loading = false;
          this.results = res.data;
          this.appendItems();
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

    var viewInstance = this;
    var elem = document.getElementById('product-list-bottom');
    var watcher = scrollMonitor.create(elem);
    watcher.enterViewport(function() {
      viewInstance.appendItems();
    });
  },

  computed: {
    allResultsLoaded: function() {
      return this.items.length === this.results.length && this.results.length > 0;
    }
  }
});
