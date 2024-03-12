import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class ValiderPage extends StatefulWidget {
  final String pseudo;
  const ValiderPage({Key? key, required this.pseudo}) : super(key: key);

  @override
  _ValiderPageState createState() => _ValiderPageState();
}

class _ValiderPageState extends State<ValiderPage> {
  String? conseil; // Déclaration de la variable conseil à la portée globale
  List<dynamic> plantes = [];

  @override
  void initState() {
    super.initState();
    fetchPlantes();
  }

  Future<void> fetchPlantes() async {
    try {
      final response = await http.get(Uri.parse('http://15.237.169.255:3000/api/plante/afficherTout'));
      // final response = await http.get(Uri.parse('http://localhost:3000/api/plante/afficherTout'));
      if (response.statusCode == 200) {
        setState(() {
          plantes = json.decode(response.body);
        });
      } else {
        throw Exception('Erreur lors de la récupération des plantes');
      }
    } catch (error) {
      print('Erreur lors de la récupération des plantes: $error');
    }
  }

  Future<void> donnerConseil(int idPlante) async {
    // Afficher la popup pour saisir le conseil
    conseil = await showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Donner un conseil'),
          content: TextField(
            decoration: InputDecoration(hintText: 'Saisissez votre conseil'),
            onChanged: (value) {
              setState(() {
                conseil = value;
              });
            },
          ),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop(); // Fermer la popup
              },
              child: Text('Annuler'),
            ),
            TextButton(
              onPressed: () {
                Navigator.of(context).pop(conseil); // Valider le conseil
              },
              child: Text('Valider'),
            ),
          ],
        );
      },
    );

    if (conseil != null && conseil!.isNotEmpty) {
      try {
        // Appeler votre API pour ajouter le conseil
        final response = await http.post(
          Uri.parse(
            'http://15.237.169.255:3000/api/conseil/ajouter?dsc_csn=$conseil&id_plt=$idPlante&psd_utl=${widget.pseudo}'),
          // Uri.parse('http://15.237.169.255:3000/api/conseil/ajouter'),
          //  Uri.parse('http://localhost:3000/api/conseil/ajouter'),
          headers: {
            'Content-Type': 'application/json',
          },
        );

        if (response.statusCode == 200) {
          // Conseil ajouté avec succès
          print('Conseil ajouté avec succès');
        } else {
          // Gérer les erreurs
          throw Exception('Erreur lors de l\'ajout du conseil: ${response.body}');
        }
      } catch (error) {
        // Gérer les erreurs
        print('Erreur lors de l\'ajout du conseil: $error');
      }
    }
  }

String formatDateTime(String dateString) {
  // Analyser la chaîne de date en tant qu'objet DateTime
  DateTime dateTime = DateTime.parse(dateString);

  // Créer une liste des noms de mois
  List<String> monthNames = [
    "",
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre"
  ];

  // Extraire le jour, le mois et l'année de la date
  int day = dateTime.day;
  int month = dateTime.month;
  int year = dateTime.year;
  int hour = dateTime.hour;
  int minute = dateTime.minute;

  // Formater la date dans le format souhaité
  String formattedDate =
      "$day ${monthNames[month]} $year à ${hour.toString().padLeft(2, '0')}:${minute.toString().padLeft(2, '0')}";

  return formattedDate;
}

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Valider une demande'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Liste des plantes:',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            Expanded(
              child: ListView.builder(
                itemCount: plantes.length,
                itemBuilder: (BuildContext context, int index) {
                  return ListTile(
                    title: Text('Nom: ${plantes[index]['nom_plt']}'),
                    // subtitle: Text('Date début: ${plantes[index]['dat_deb_plt']}, Date fin: ${plantes[index]['dat_fin_plt']}'),
                    subtitle: Text('Date début: ${formatDateTime(plantes[index]['dat_deb_plt'])}, Date fin: ${formatDateTime(plantes[index]['dat_fin_plt'])}'),
                    // 'Date de fin: ${formatDateTime(plantData['dat_fin_plt'])}'),
                    trailing: ElevatedButton(
                      onPressed: () {
                        donnerConseil(plantes[index]['id_plt']);
                      },
                      child: Text('Donner un conseil'),
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
    home: ValiderPage(pseudo: pseudo),
  ));
}
