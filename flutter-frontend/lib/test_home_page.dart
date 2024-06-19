import 'package:flutter/material.dart';
import 'home_page_widget.dart';

void main() {
  runApp(MyTestApp());
}

class MyTestApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Test Home Page',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: HomePageWidget(pseudo: 'proprietaire'), // Utilisez un pseudo de test ici
    );
  }
}
