import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';
import 'package:http/http.dart' as http;

// Fonction pour récupérer les coordonnées à partir d'une adresse
Future<LatLng?> getCoordinatesFromAddress(String address) async {
  final url = Uri.parse(
      'https://nominatim.openstreetmap.org/search?q=$address&format=json');
  final response = await http.get(url);

  if (response.statusCode == 200) {
    final jsonData = json.decode(response.body);
    if (jsonData.isNotEmpty) {
      final location = jsonData[0];
      //on va log la latitude et la longitude
      print('Latitude: ${location['lat']}, Longitude: ${location['lon']}');
      return LatLng(
          double.parse(location['lat']), double.parse(location['lon']));
    }
  }

  return null;
}

// fonction pour créer un marquer sur la carte à partir d'une coordonnée
Marker createMarker(LatLng latLng) {
  return Marker(
    child: Image.asset('images/plante.png'),
    width: 80,
    height: 80,
    point: latLng,
  );
}

class TrouverPage extends StatefulWidget {
  const TrouverPage({Key? key}) : super(key: key);

  @override
  _TrouverPageState createState() => _TrouverPageState();
}

class _TrouverPageState extends State<TrouverPage> {
  late final List<String> _addresses;
  List<Marker> markerList = <Marker>[];

  @override
  void initState() {
    super.initState();
    _addresses = [
      '117 avenue Georges Clemenceau, Saint-Genis-Laval',
      '7 rue jean marie leclair, lyon',
    ];

    // on va recuperer les coordonnées de chaque adresse puis les afficher sur la carte
    for (final address in _addresses) {
      getCoordinatesFromAddress(address).then((latLng) {
        if (latLng != null) {
          setState(() {
            markerList.add(createMarker(latLng));
            // on va afficher les marqueurs sur la carte
            print(markerList);
          });
        }
      });
    }
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
            MarkerLayer(
              markers: markerList,
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
