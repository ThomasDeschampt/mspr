import 'package:flutter/material.dart';
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
        String url0 = 'http://15.237.169.255:3000/api/proprietaire/ajouter?id_utl=$pseudo';
        var response0 = await http.post(Uri.parse(url0));

        String url = 'http://15.237.169.255:3000/api/plante/ajouter?'
            'esp_plt=${especeController.text}&'
            'des_plt=${descriptionController.text}&'
            'nom_plt=${nomController.text}&'
            'adr_plt=${adresseController.text}&'
            'dat_deb_plt=${debutController.text}&'
            'dat_fin_plt=${finController.text}&'
            'psd_utl=$pseudo';

        var response = await http.post(Uri.parse(url));

        if (response.statusCode == 200) {
          showDialog(
            context: context,
            builder: (context) => AlertDialog(
              title: Text('Succès'),
              content: Text('La demande a été ajoutée avec succès.'),
              actions: [
                TextButton(
                  onPressed: () => Navigator.pop(context),
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
            ),
            TextFormField(
              controller: finController,
              decoration: InputDecoration(labelText: 'Date de fin'),
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
