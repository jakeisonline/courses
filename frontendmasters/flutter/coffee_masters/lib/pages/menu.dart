import 'package:coffee_masters/datamodel.dart';
import 'package:flutter/material.dart';

import '../datamanager.dart';

class MenuPage extends StatelessWidget {
  final DataManager dataManager;
  const MenuPage({super.key, required this.dataManager});

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: dataManager.getMenu(),
      builder: ((context, snapshot) {
        if (snapshot.hasData) {
          var categories = snapshot.data as List<Category>;
          return ListView.builder(
            itemCount: categories.length,
            itemBuilder: ((context, categoryIndex) {
              return Column(
                children: [
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Text(categories[categoryIndex].name),
                  ),
                  ListView.builder(
                      shrinkWrap: true,
                      physics: const ClampingScrollPhysics(),
                      itemCount: categories[categoryIndex].products.length,
                      itemBuilder: ((context, productIndex) {
                        return ProductItem(
                          product:
                              categories[categoryIndex].products[productIndex],
                          dataManager: dataManager,
                        );
                      }))
                ],
              );
            }),
          );
        } else {
          if (snapshot.hasError) {
            return Text("Error: ${snapshot.error}");
          } else {
            return const CircularProgressIndicator();
          }
        }
      }),
    );
  }
}

class ProductItem extends StatelessWidget {
  final Product product;
  final DataManager dataManager;

  const ProductItem(
      {super.key, required this.product, required this.dataManager});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 100.0,
      height: 300.0,
      padding: const EdgeInsets.all(8),
      child: FittedBox(
        child: Card(
          elevation: 4,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Image.network(product.imageUrl),
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: SizedBox(
                  width: 294.0,
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    mainAxisSize: MainAxisSize.max,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(product.name,
                              style:
                                  const TextStyle(fontWeight: FontWeight.bold)),
                          Text("\$${(product.price).toStringAsFixed(2)}"),
                        ],
                      ),
                      AddToCartButton(
                        product: product,
                        dataManager: dataManager,
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class AddToCartButton extends StatefulWidget {
  final Product product;
  final DataManager dataManager;

  const AddToCartButton({
    super.key,
    required this.product,
    required this.dataManager,
  });

  @override
  State<AddToCartButton> createState() => _AddToCartButtonState();
}

class _AddToCartButtonState extends State<AddToCartButton> {
  late bool _isAdded;
  late String _buttonText;

  @override
  Widget build(BuildContext context) {
    if (widget.dataManager.inCart(widget.product)) {
      setState(() {
        _isAdded = true;
        _buttonText = "Remove";
      });
    } else {
      setState(() {
        _isAdded = false;
        _buttonText = "Add";
      });
    }

    return ElevatedButton(
        onPressed: () {
          if (!_isAdded) {
            setState(() => widget.dataManager.cartAdd(widget.product));
          } else {
            setState(() => widget.dataManager.cartRemove(widget.product));
          }
        },
        child: Text(_buttonText));
  }
}
