import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:http/http.dart' as http;
import 'dart:convert' as convert;


class TrouverPage extends StatelessWidget {
  const TrouverPage({Key? key}) : super(key: key);
  final String apiKey = "r5tgib4GBlr2Zv5Cj8Zla0RGYWZRpZOw";

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "TomTom Map",
      home: Scaffold(
        body: Center(
            child: Stack(
          children: <Widget>[
FlutterMap(
  options: MapOptions(zoom: 13.0),
  children: [
    TileLayer(
      urlTemplate: "https://api.tomtom.com/map/1/tile/basic/main/{z}/{x}/{y}.png?key={apiKey}",
      additionalOptions: {"apiKey": apiKey},
    ),
  ],
),
         ],
        )),
      ),
    );
  }
}
