import 'package:flutter/material.dart';

class PlantePage extends StatelessWidget {
  const PlantePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    TextEditingController especeController = TextEditingController();
    TextEditingController descriptionController = TextEditingController();
    TextEditingController nomController = TextEditingController();
    TextEditingController adresseController = TextEditingController();
    TextEditingController debutController = TextEditingController();
    TextEditingController finController = TextEditingController();

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
              onPressed: () {
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
                  // Ajoutez ici la logique pour ajouter la plante
                  // lorsque tous les champs sont remplis
                }
              },
              child: Text('Ajouter'),
            ),
          ],
        ),
      ),
    );
  }
}
