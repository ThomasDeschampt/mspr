import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'dart:io';
import 'package:image_picker/image_picker.dart';

class GardiennagePage extends StatefulWidget {
  final String pseudo;
  const GardiennagePage({Key? key, required this.pseudo}) : super(key: key);

  @override
  _GardiennagePageState createState() => _GardiennagePageState();
}

class _GardiennagePageState extends State<GardiennagePage> {
  List<dynamic> plantes = [];
  File? _image;

  @override
  void initState() {
    super.initState();
    fetchPlantes();
  }

  Future<void> fetchPlantes() async {
    final response = await http.get(Uri.parse(
        'http://15.237.169.255:3000/api/plante/afficherGardees?psd_utl=${widget.pseudo}'));
    if (response.statusCode == 200) {
      setState(() {
        plantes = json.decode(response.body);
      });
    } else {
      throw Exception('Failed to load plantes');
    }
  }

  String formatDateTime(String dateString) {
    // Analyser la chaîne de date en tant qu'objet DateTime
    DateTime dateTime = DateTime.parse(dateString);

    // Créer une liste des noms de mois
    List<String> monthNames = [
      "", "janvier", "février", "mars", "avril", "mai", "juin", "juillet",
      "août", "septembre", "octobre", "novembre", "décembre"
    ];

    // Extraire le jour, le mois et l'année de la date
    int day = dateTime.day;
    int month = dateTime.month;
    int year = dateTime.year;
    int hour = dateTime.hour;
    int minute = dateTime.minute;

    // Formater la date dans le format souhaité
    String formattedDate = "$day ${monthNames[month]} $year à ${hour.toString().padLeft(2, '0')}:${minute.toString().padLeft(2, '0')}";

    return formattedDate;
  }

  Future<void> _showPlanteDetails(BuildContext context, dynamic plante) async {
    return showDialog<void>(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text(plante['nom_plt']),
          content: SingleChildScrollView(
            child: ListBody(
              children: <Widget>[
                Text('Espèce: ${plante['esp_plt']}'),
                Text('Description: ${plante['dsc_plt']}'),
                Text('Adresse: ${plante['adr_plt']}'),
                Text('Date de début: ${formatDateTime(plante['dat_deb_plt'])}'),
                Text('Date de fin: ${formatDateTime(plante['dat_fin_plt'])}'),
                _image != null ? Image.file(_image!) : Container(),
                ElevatedButton(
                  onPressed: _takePicture,
                  child: Text('Prendre une photo'),
                ),
              ],
            ),
          ),
          actions: <Widget>[
            TextButton(
              child: Text('Fermer'),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
          ],
        );
      },
    );
  }

  Future<void> _takePicture() async {
    final picker = ImagePicker();
    final pickedImage = await picker.pickImage(source: ImageSource.camera);
    if (pickedImage != null) {
      setState(() {
        _image = File(pickedImage.path);
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Mes gardiennages'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            Text(
              'Mes gardiennages',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 16),
            Expanded(
              child: ListView.builder(
                itemCount: plantes.length,
                itemBuilder: (BuildContext context, int index) {
                  return Card(
                    child: ListTile(
                      title: Text(plantes[index]['nom_plt']),
                      subtitle: Text(plantes[index]['adr_plt']),
                      onTap: () {
                        _showPlanteDetails(context, plantes[index]);
                      },
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}

void main() {
  String pseudo = "proprietaire";
  runApp(MaterialApp(
    title: 'Gardiennage App',
    theme: ThemeData(
      primarySwatch: Colors.blue,
    ),
    home: GardiennagePage(pseudo: pseudo),
  ));
}
