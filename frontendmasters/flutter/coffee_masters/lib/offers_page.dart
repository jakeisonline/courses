import 'package:flutter/material.dart';

class OffersPage extends StatelessWidget {
  const OffersPage({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: const [
        Offer(
          title: "Buy One Get One Free",
          description:
              "Enjoy a complimentary coffee with the purchase of any medium or large coffee.",
        ),
        Offer(
          title: "Morning Boost",
          description:
              "Get 20% off all coffees purchased between 6 AM and 9 AM.",
        ),
        Offer(
          title: "Student Discount",
          description:
              "Show your student ID to receive 15% off any coffee beverage.",
        ),
        Offer(
          title: "Loyalty Program",
          description:
              "Join our loyalty program and get a free coffee after every 10 purchases.",
        ),
        Offer(
          title: "Weekend Special",
          description:
              "Buy any coffee on weekends and get a free pastry of your choice.",
        ),
        Offer(
          title: "New Flavor Launch",
          description:
              "Try our new seasonal flavor and get \$1 off your purchase.",
        ),
        Offer(
          title: "Afternoon Pick-Me-Up",
          description:
              "Enjoy a 10% discount on all coffees purchased between 2 PM and 5 PM.",
        ),
        Offer(
          title: "Friends and Family",
          description:
              "Bring a friend and both of you receive 10% off your coffee orders.",
        ),
        Offer(
          title: "Reusable Cup Discount",
          description:
              "Bring your own reusable cup and get 25 cents off your coffee.",
        ),
      ],
    );
  }
}

class Offer extends StatelessWidget {
  final String title;
  final String description;

  const Offer({
    super.key,
    required this.title,
    required this.description,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: SizedBox(
        child: Card(
          color: Theme.of(context).cardTheme.color,
          elevation: 7,
          child: Container(
            decoration: const BoxDecoration(
                image: DecorationImage(
                    fit: BoxFit.cover,
                    image: AssetImage("images/background.png"))),
            child: Column(
              children: [
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Center(
                      child: Container(
                    color: Colors.white,
                    child: Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Text(title,
                          style: Theme.of(context).textTheme.headlineLarge),
                    ),
                  )),
                ),
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Center(
                      child: Container(
                    color: Colors.white,
                    child: Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Text(description,
                          style: Theme.of(context).textTheme.bodyLarge),
                    ),
                  )),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
