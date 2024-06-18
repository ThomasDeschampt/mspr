import 'dart:convert';
import 'dart:html';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

Future<void> main() async {
  runApp(MyApp());
}

const String encryptionKey = 'icicacryptemeceheheheheh';

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
  bool isChecked = false;



  Future<void> _inscription() async {
    final url = Uri.parse('http://localhost:3000/api/utilisateurs/ajouter');
      try {
        final encryptedData = json.encode({
          'nom_utl': nomController.text,
          'pre_ult': prenomController.text,
          'age_utl': ageController.text,
          'num_utl': numeroController.text,
          'eml_utl': emailController.text,
          'adr_utl': adresseController.text,
          'psd_utl': pseudoController.text,
          'mdp_utl': motDePasseController.text,
        });

      final response = await http.post(
        url,
        body: encryptedData,
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

  void _showDialog() {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Conditions d\'utilisation'),
          content: Text(
              'Bienvenue sur notre application mobile ! Nous sommes ravis de vous compter parmi nos utilisateurs. Veuillez lire attentivement les présentes Conditions d\'utilisation, car elles régissent votre accès et votre utilisation de nos services. \n\n1. Acceptation des Conditions d\'utilisation\nEn accédant et en utilisant notre application, vous acceptez d\'être lié par les présentes Conditions d\'utilisation. Si vous n\'acceptez pas ces conditions, veuillez ne pas accéder ou utiliser notre application. \n\n2. Modifications des Conditions d\'utilisation\nNous nous réservons le droit de modifier ces Conditions d\'utilisation à tout moment. Toute modification entrera en vigueur immédiatement après sa publication dans l\'application. L\'utilisation continue de l\'application après la publication des modifications constitue votre acceptation de ces modifications. \n\n3. Utilisation de l\'Application\nVous êtes autorisé à utiliser notre application à des fins personnelles et non commerciales. Vous ne devez pas utiliser notre application d\'une manière qui enfreint les lois ou règlements applicables. \n\n4. Compte Utilisateur\nPour accéder à certaines fonctionnalités de notre application, vous devrez peut-être créer un compte. Vous êtes responsable de maintenir la confidentialité de votre compte et mot de passe, et vous acceptez d\'être responsable de toutes les activités qui se produisent sous votre compte. \n\n5. Propriété Intellectuelle\nTout le contenu de notre application, y compris, mais sans s\'y limiter, le texte, les graphiques, les logos, les icônes de boutons, les images, les clips audio, les téléchargements numériques, les compilations de données, et les logiciels, sont la propriété de notre société ou de nos fournisseurs de contenu et sont protégés par les lois internationales sur le copyright. \n\n6. Limitation de Responsabilité\nEn aucun cas, notre société ou ses fournisseurs ne seront responsables de tout dommage (y compris, sans limitation, les dommages pour perte de données ou de profit, ou en raison d\'une interruption d\'activité) découlant de l\'utilisation ou de l\'impossibilité d\'utiliser notre application. \n\n7. Résiliation\nNous nous réservons le droit de résilier votre accès à notre application à tout moment, avec ou sans cause, avec ou sans préavis. \n\n8. Loi Applicable\nLes présentes Conditions d\'utilisation sont régies et interprétées conformément aux lois de votre pays de résidence. \n\nEn utilisant notre application, vous acceptez les termes et conditions énoncés ci-dessus. Si vous avez des questions concernant nos Conditions d\'utilisation, veuillez nous contacter.'),
          actions: <Widget>[
            TextButton(
              child: Text('Close'),
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
              CheckboxListTile(
                title: Text('J\'accepte les conditions d\'utilisation'),
                value: isChecked,
                onChanged: (newValue) {
                  setState(() {
                    isChecked = newValue!;
                  });
                },
                controlAffinity: ListTileControlAffinity.leading,
              ),
              InkWell(
                onTap: () {
                  _showDialog();
                },
                child: Text('Voir les conditions d\'utilisation'),
              ),
              ElevatedButton(
                onPressed: () {
                  if (_formKey.currentState!.validate() && isChecked) {
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
