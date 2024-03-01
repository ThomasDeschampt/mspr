import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class GardiennagePage extends StatefulWidget {
  final String pseudo;
  const GardiennagePage({Key? key, required this.pseudo}) : super(key: key);

  @override
  _GardiennagePageState createState() => _GardiennagePageState();
}

class _GardiennagePageState extends State<GardiennagePage> {
  List<dynamic> plantes = [];

  @override
  void initState() {
    super.initState();
    fetchPlantes();
  }

  Future<void> fetchPlantes() async {
    final response = await http.get(Uri.parse('http://15.237.169.255:3000/api/plante/afficherGardees?psd_utl=${widget.pseudo}'));
    if (response.statusCode == 200) {
      setState(() {
        plantes = json.decode(response.body);
      });
    } else {
      throw Exception('Failed to load plantes');
    }
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
                Text('Date de début: ${plante['dat_deb_plt']}'),
                Text('Date de fin: ${plante['dat_fin_plt']}'),
                // Ajoutez d'autres détails si nécessaire
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
