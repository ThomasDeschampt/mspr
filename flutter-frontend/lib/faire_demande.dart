import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:http/http.dart' as http; 

class PlantePage extends StatelessWidget {
  final String pseudo;

  PlantePage({Key? key, required this.pseudo}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    TextEditingController especeController = TextEditingController();
    TextEditingController descriptionController = TextEditingController();
    TextEditingController nomController = TextEditingController();
    TextEditingController adresseController = TextEditingController();
    TextEditingController debutController = TextEditingController();
    TextEditingController finController = TextEditingController();

    // Formatter to limit date input to 10 characters and automatically add "/"
    var dateInputFormatter = FilteringTextInputFormatter.deny(RegExp(r'[^0-9/]'));

    debutController
        .addListener(() {
          if (debutController.text.length == 2 || debutController.text.length == 5) {
            debutController.text += '/';
            debutController.selection = TextSelection.fromPosition(TextPosition(offset: debutController.text.length));
          }
        });

    finController
        .addListener(() {
          if (finController.text.length == 2 || finController.text.length == 5) {
            finController.text += '/';
            finController.selection = TextSelection.fromPosition(TextPosition(offset: finController.text.length));
          }
        });



    Future<String> getId(String pseudo) async {
    final url = Uri.parse('http://localhost:3000/api/utilisateurs/id?psd_utl=$pseudo');
    final response = await http.get(url);

    if (response.statusCode == 200) {
      final jsonData = json.decode(response.body);
      return jsonData['utilisateur'].toString();
    } else {
      throw Exception('Failed to load user ID');
    }
  }


    Future<void> ajouterPlante() async {
      if (especeController.text.isEmpty ||
          descriptionController.text.isEmpty ||
          nomController.text.isEmpty ||
          adresseController.text.isEmpty ||
          debutController.text.isEmpty ||
          finController.text.isEmpty) {
        showDialog(
          context: context,
          builder: (context) => AlertDialog(
            title: Text('Champs incomplets'),
            content: Text('Veuillez remplir tous les champs.'),
            actions: [
              TextButton(
                onPressed: () => Navigator.pop(context),
                child: Text('OK'),
              ),
            ],
          ),
        );
      } else {
        String id = await getId(pseudo);
        String url = 'http://localhost:3000/api/plante/ajouter?'
            'esp_plt=${especeController.text}&'
            'des_plt=${descriptionController.text}&'
            'nom_plt=${nomController.text}&'
            'adr_plt=${adresseController.text}&'
            'dat_deb_plt=${debutController.text}&'
            'dat_fin_plt=${finController.text}&'
            'id_proprietaire=$id';

        var response = await http.post(Uri.parse(url));

        if (response.statusCode == 200) {
          showDialog(
            context: context,
            builder: (context) => AlertDialog(
              title: Text('Succès'),
              content: Text('La demande a été ajoutée avec succès.'),
              actions: [
                TextButton(
                  onPressed: () => 
                  {
                    Navigator.pop(context),
                    Navigator.pop(context),
                  },
                  child: Text('OK'),
                ),
              ],
            ),
          );
        } else {
          showDialog(
            context: context,
            builder: (context) => AlertDialog(
              title: Text('Erreur'),
              content: Text('Une erreur s\'est produite. Veuillez réessayer.'),
              actions: [
                TextButton(
                  onPressed: () => Navigator.pop(context),
                  child: Text('OK'),
                ),
              ],
            ),
          );
        }
      }
    }

    return Scaffold(
      appBar: AppBar(
        title: const Text('Ajouter une nouvelle plante'),
      ),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            TextFormField(
              controller: especeController,
              decoration: InputDecoration(labelText: 'Espèce de la plante'),
            ),
            TextFormField(
              controller: descriptionController,
              decoration: InputDecoration(labelText: 'Description'),
            ),
            TextFormField(
              controller: nomController,
              decoration: InputDecoration(labelText: 'Nom de la plante'),
            ),
            TextFormField(
              controller: adresseController,
              decoration: InputDecoration(labelText: 'Adresse'),
            ),
            TextFormField(
              controller: debutController,
              decoration: InputDecoration(labelText: 'Date de début'),
              inputFormatters: [LengthLimitingTextInputFormatter(10), dateInputFormatter],
            ),
            TextFormField(
              controller: finController,
              decoration: InputDecoration(labelText: 'Date de fin'),
              inputFormatters: [LengthLimitingTextInputFormatter(10), dateInputFormatter],
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: ajouterPlante,
              child: Text('Ajouter'),
            ),
          ],
        ),
      ),
    );
  }
}
