import 'package:coffee_masters/pages/menu.dart';
import 'package:coffee_masters/pages/offers.dart';
import 'package:coffee_masters/pages/checkout.dart';
import 'package:flutter/material.dart';

import 'datamanager.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Coffee Masters',
      theme: ThemeData(
        primarySwatch: Colors.brown,
        appBarTheme: const AppBarTheme(backgroundColor: Colors.brown),
      ),
      home: const MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key});

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  var dataManager = DataManager();
  int _currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    Widget currentWidgetPage = const Text("!");
    final Color? foregroundColor =
        Theme.of(context).appBarTheme.foregroundColor;
    final Color? backgroundColor =
        Theme.of(context).appBarTheme.backgroundColor;
    final selectedIconColor = Colors.white.withOpacity(0.9);

    switch (_currentIndex) {
      case 0:
        currentWidgetPage = MenuPage(dataManager: dataManager);
        break;
      case 1:
        currentWidgetPage = const OffersPage();
        break;
      case 2:
        currentWidgetPage = CheckoutPage(dataManager: dataManager);
        break;
    }

    return Scaffold(
        appBar: AppBar(
          title: Image.asset("images/logo.png"),
        ),
        bottomNavigationBar: NavigationBar(
            selectedIndex: _currentIndex,
            onDestinationSelected: (newIndex) {
              setState(() {
                _currentIndex = newIndex;
              });
            },
            backgroundColor: foregroundColor,
            indicatorColor: backgroundColor,
            shadowColor: backgroundColor,
            destinations: [
              NavigationDestination(
                icon: Icon(
                  Icons.coffee,
                  color: backgroundColor,
                ),
                selectedIcon: Icon(
                  Icons.coffee,
                  color: selectedIconColor,
                ),
                label: "Coffee",
              ),
              NavigationDestination(
                icon: Icon(
                  Icons.local_offer,
                  color: backgroundColor,
                ),
                selectedIcon: Icon(
                  Icons.local_offer,
                  color: selectedIconColor,
                ),
                label: "Offers",
              ),
              NavigationDestination(
                icon: Icon(
                  Icons.shopping_cart_checkout_outlined,
                  color: backgroundColor,
                ),
                selectedIcon: Icon(
                  Icons.shopping_cart_checkout_outlined,
                  color: selectedIconColor,
                ),
                label: "Checkout",
              ),
            ]),
        body: currentWidgetPage);
  }
}
