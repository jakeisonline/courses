import 'package:coffee_masters/datamodel.dart';
import 'package:flutter/material.dart';

class MenuPage extends StatelessWidget {
  const MenuPage({super.key});

  @override
  Widget build(BuildContext context) {
    var p = Product(
      id: 1,
      name: "Espresso",
      price: 2.5,
      image: "1",
    );
    return ProductItem(
      product: p,
      onAdd: (product) {
        print("Buy $product");
      },
    );
  }
}

class ProductItem extends StatelessWidget {
  final Product product;
  final Function onAdd;

  const ProductItem({super.key, required this.product, required this.onAdd});

  handleOnPressed(product) => onAdd(product);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(8),
      child: Center(
        child: Card(
          elevation: 4,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Image.asset("images/black_coffee.png"),
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(product.name,
                            style:
                                const TextStyle(fontWeight: FontWeight.bold)),
                        Text("\$${product.price}"),
                      ],
                    ),
                    ElevatedButton(
                        onPressed: () {
                          handleOnPressed(product);
                        },
                        child: const Text("Buy")),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
