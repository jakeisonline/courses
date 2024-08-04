import 'package:coffee_masters/pages/menu.dart';
import 'package:coffee_masters/pages/offers.dart';
import 'package:coffee_masters/pages/order.dart';
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

class Greet extends StatefulWidget {
  const Greet({super.key});

  @override
  State<Greet> createState() => _GreetState();
}

class _GreetState extends State<Greet> {
  var name = "";

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text("Hello $name!"),
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: TextField(
              onChanged: (value) => setState(() {
                    name = value;
                  })),
        ),
      ],
    );
  }
}

class _MyHomePageState extends State<MyHomePage> {
  var dataManager = DataManager();
  int _currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    Widget currentWidgetPage = const Text("!");

    switch (_currentIndex) {
      case 0:
        currentWidgetPage = MenuPage(dataManager: dataManager);
        break;
      case 1:
        currentWidgetPage = const OffersPage();
        break;
      case 2:
        currentWidgetPage = OrderPage(dataManager: dataManager);
        break;
    }

    return Scaffold(
        appBar: AppBar(
          title: Image.asset("images/logo.png"),
        ),
        bottomNavigationBar: BottomNavigationBar(
            currentIndex: _currentIndex,
            onTap: (newIndex) {
              setState(() {
                _currentIndex = newIndex;
              });
            },
            backgroundColor: Theme.of(context).appBarTheme.backgroundColor,
            selectedItemColor: Theme.of(context).primaryColorLight,
            unselectedItemColor:
                Theme.of(context).primaryColorLight.withOpacity(0.7),
            items: const [
              BottomNavigationBarItem(
                icon: Icon(Icons.coffee),
                label: "Coffee",
              ),
              BottomNavigationBarItem(
                icon: Icon(Icons.local_offer),
                label: "Offers",
              ),
              BottomNavigationBarItem(
                icon: Icon(Icons.shopping_cart_checkout_outlined),
                label: "Offers",
              ),
            ]),
        body: currentWidgetPage);
  }
}
