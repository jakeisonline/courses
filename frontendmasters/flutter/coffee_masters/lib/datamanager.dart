import 'dart:convert';

import 'package:flutter/widgets.dart';

import 'datamodel.dart';
import 'package:http/http.dart' as http;

class DataManager {
  List<Category>? _menu;
  // List<ItemInCart> cart = [];
  ValueNotifier<List<ItemInCart>> cart = ValueNotifier<List<ItemInCart>>([]);

  fetchMenu() async {
    const url = "https://firtman.github.io/coffeemasters/api/menu.json";
    var response = await http.get(Uri.parse(url));
    if (response.statusCode == 200) {
      var json = response.body;
      var decodedData = jsonDecode(json) as List<dynamic>;
      _menu = [];
      for (var json in decodedData) {
        _menu?.add(Category.fromJson(json));
      }
    }
  }

  Future<List<Category>> getMenu() async {
    if (_menu == null) {
      await fetchMenu();
    }

    return _menu ?? [];
  }

  cartAdd(Product p) {
    bool found = false;
    for (var item in cart.value) {
      if (item.product.id == p.id) {
        item.quantity++;
        found = true;
        break;
      }
    }

    if (!found) {
      final newCart = cart.value.toList();
      newCart.add(ItemInCart(product: p, quantity: 1));
      cart.value = newCart;
    }
  }

  cartRemove(Product p) {
    final newCart = cart.value.toList();
    newCart.removeWhere((item) => item.product.id == p.id);
    cart.value = newCart;
  }

  cartClear() {
    cart.value = [];
  }

  bool inCart(Product p) {
    return cart.value.any((item) => item.product.id == p.id);
  }

  double cartTotal() {
    var total = 0.0;
    for (var item in cart.value) {
      total += item.product.price * item.quantity;
    }
    return total;
  }
}
