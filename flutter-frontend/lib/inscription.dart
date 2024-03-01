import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Inscription',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: InscriptionPage(),
    );
  }
}

class InscriptionPage extends StatefulWidget {
  @override
  _InscriptionPageState createState() => _InscriptionPageState();
}

class _InscriptionPageState extends State<InscriptionPage> {
  final _formKey = GlobalKey<FormState>();
  TextEditingController nomController = TextEditingController();
  TextEditingController prenomController = TextEditingController();
  TextEditingController ageController = TextEditingController();
  TextEditingController numeroController = TextEditingController();
  TextEditingController emailController = TextEditingController();
  TextEditingController adresseController = TextEditingController();
  TextEditingController pseudoController = TextEditingController();
  TextEditingController motDePasseController = TextEditingController();

  Future<void> _inscription() async {
    final url = Uri.parse('http://15.237.169.255:3000/api/utilisateurs/ajouter');
    try {
      final response = await http.post(
        url,
        body: json.encode({
          'nom_utl': nomController.text,
          'pre_ult': prenomController.text,
          'age_utl': ageController.text,
          'num_utl': numeroController.text,
          'eml_utl': emailController.text,
          'adr_utl': adresseController.text,
          'psd_utl': pseudoController.text,
          'mdp_utl': motDePasseController.text,
        }),
        headers: {'Content-Type': 'application/json'},
      );

      if (response.statusCode == 200) {
        // Utilisateur ajouté avec succès
        print('Utilisateur ajouté avec succès');
        Navigator.pop(context);

      } else {
        // Erreur lors de l'ajout de l'utilisateur
        print('Erreur lors de l\'ajout de l\'utilisateur');
      }
    } catch (erreur) {
      print('Erreur lors de l\'ajout de l\'utilisateur: $erreur');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Inscription'),
      ),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: ListView(
            children: [
              TextFormField(
                controller: nomController,
                decoration: InputDecoration(labelText: 'Nom'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Veuillez entrer votre nom';
                  }
                  return null;
                },
              ),
              TextFormField(
                controller: prenomController,
                decoration: InputDecoration(labelText: 'Prénom'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Veuillez entrer votre prénom';
                  }
                  return null;
                },
              ),
              TextFormField(
                controller: ageController,
                decoration: InputDecoration(labelText: 'Âge'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Veuillez entrer votre âge';
                  }
                  return null;
                },
              ),
              TextFormField(
                controller: numeroController,
                decoration: InputDecoration(labelText: 'Numéro de téléphone'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Veuillez entrer votre numéro de téléphone';
                  }
                  return null;
                },
              ),
              TextFormField(
                controller: emailController,
                decoration: InputDecoration(labelText: 'Adresse email'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Veuillez entrer votre adresse email';
                  }
                  return null;
                },
              ),
              TextFormField(
                controller: adresseController,
                decoration: InputDecoration(labelText: 'Adresse'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Veuillez entrer votre adresse';
                  }
                  return null;
                },
              ),
              TextFormField(
                controller: pseudoController,
                decoration: InputDecoration(labelText: 'Pseudo'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Veuillez entrer votre pseudo';
                  }
                  return null;
                },
              ),
              TextFormField(
                controller: motDePasseController,
                obscureText: true,
                decoration: InputDecoration(labelText: 'Mot de passe'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Veuillez entrer votre mot de passe';
                  }
                  return null;
                },
              ),
              ElevatedButton(
                onPressed: () {
                  if (_formKey.currentState!.validate()) {
                    _inscription();
                  }
                },
                child: Text('S\'inscrire'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
