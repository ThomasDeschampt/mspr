import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';
import 'package:http/http.dart' as http;

// Fonction pour récupérer les coordonnées à partir d'une adresse
Future<LatLng?> getCoordinatesFromAddress(String address) async {
  final url = Uri.parse('https://nominatim.openstreetmap.org/search?q=$address&format=json');
  final response = await http.get(url);

  if (response.statusCode == 200) {
    final jsonData = json.decode(response.body);
    if (jsonData.isNotEmpty) {
      final location = jsonData[0];
      return LatLng(double.parse(location['lat']), double.parse(location['lon']));
    }
  }

  return null;
}

Future<void> testAddressConversion(List<String> addresses) async {
  for (final address in addresses) {
    final coordinates = await getCoordinatesFromAddress(address);
    if (coordinates != null) {
      print('Adresse : $address');
      print('Latitude : ${coordinates.latitude}');
      print('Longitude : ${coordinates.longitude}');
    } else {
      print('Adresse : $address');
      print('Erreur : Impossible de récupérer les coordonnées');
    }
    print('---');
  }
}

class TrouverPage extends StatefulWidget {
  const TrouverPage({Key? key}) : super(key: key);

  @override
  _TrouverPageState createState() => _TrouverPageState();
}

class _TrouverPageState extends State<TrouverPage> {
  late final List<String> _addresses; // Remplacez ceci par vos adresses réelles

  @override
  void initState() {
    super.initState();
    _addresses = [
      '117 avenue Georges Clemenceau, Saint-Genis-Laval',
      '7 rue jean marie leclair, lyon',
    ];
    testAddressConversion(_addresses);
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "OpenStreetMap Map",
      home: Scaffold(
        body: FlutterMap(
          options: MapOptions(
            center: LatLng(45.76, 4.83), // Centre de la carte sur Lyon
            zoom: 13.0,
          ),
          children: [
            TileLayer(
              urlTemplate: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
              subdomains: ['a', 'b', 'c'],
            ),
          ],
        ),
      ),
    );
  }
}

void main() {
  runApp(TrouverPage());
}
