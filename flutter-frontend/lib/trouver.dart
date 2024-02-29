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

Future<Map<String, dynamic>?> getPlantDataFromAPI(String address) async {
  final url = Uri.parse('http://15.237.169.255:3000/api/plante/afficher?adr_plt=$address');
  final response = await http.get(url);

  if (response.statusCode == 200) {
    final jsonData = json.decode(response.body);
    return jsonData;
  }

  return null;
}

Future<List<String>?> getAddressesFromAPI() async {
  final url = Uri.parse('http://15.237.169.255:3000/api/plante/recupererlocalisation');
  final response = await http.get(url);

  if (response.statusCode == 200) {
    final jsonData = json.decode(response.body);
    return List<String>.from(jsonData);
  }

  return null;
}

class TrouverPage extends StatefulWidget {
  const TrouverPage({Key? key}) : super(key: key);

  @override
  _TrouverPageState createState() => _TrouverPageState();
}

class _TrouverPageState extends State<TrouverPage> {
  late List<String> _addresses;
  List<Marker> markerList = <Marker>[];

  @override
  void initState() {
    super.initState();
    getAddressesFromAPI().then((addresses) {
      if (addresses != null) {
        setState(() {
          _addresses = addresses;
          print(_addresses);
        });


// fonction pour créer un marqueur sur la carte à partir d'une coordonnée et d'une adresse
Marker createMarker(LatLng latLng, String address) {
  return Marker(
    child: InkWell(
      onTap: () {
        getPlantDataFromAPI(address).then((plantData) {
          if (plantData != null) {
            showDialog(
              context: context,
              builder: (BuildContext context) {
                return AlertDialog(
                  title: Text(plantData['nom_plt']),
                  content: Column(
                    mainAxisSize: MainAxisSize.min,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Adresse: ${plantData['adr_plt']}'),
                      Text('Date de début: ${plantData['dat_deb_plt'] ?? 'N/A'}'),
                      Text('Date de fin: ${plantData['dat_fin_plt'] ?? 'N/A'}'),
                    ],
                  ),
                  actions: <Widget>[
                    TextButton(
                      child: Text('OK'),
                      onPressed: () {
                        Navigator.of(context).pop();
                      },
                    ),
                  ],
                );
              },
            );
          }
        });
      },
      child: Image.asset('images/plante.png'),
    ),
    width: 80,
    height: 80,
    point: latLng,
  );
}



        // on va recuperer les coordonnées de chaque adresse puis les afficher sur la carte
        for (final address in _addresses) {
          getCoordinatesFromAddress(address).then((latLng) {
            if (latLng != null) {
              setState(() {
                markerList.add(createMarker(latLng, address));
                // on va afficher les marqueurs sur la carte
                print(markerList);
              });
            }
          });
        }
      }
    });
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
