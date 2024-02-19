import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:http/http.dart' as http;
import 'package:latlong2/latlong.dart';
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
              options: MapOptions(
                  initialCenter: const LatLng(45.7578137, 4.8320114), zoom: 13.0),
              children: [
                TileLayer(
                  urlTemplate:
                      "https://api.tomtom.com/map/1/tile/basic/main/%7Bz%7D/%7Bx%7D/%7By%7D.png?key={apiKey}",
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