import 'package:flutter/material.dart';
import 'package:http/http.dart' as http; // Importez le package http
import 'dart:convert'; // Pour utiliser json.decode
import 'accueil.dart';
import 'package:http/http.dart' as http;
import 'package:http/browser_client.dart' as browser_http;

void main() {
  runApp(const MyApp());
  http.Client client =
      browser_http.BrowserClient(); // Utiliser le client pour le navigateur
  http.Client().close(); // Fermer le client par défaut
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.greenAccent),
        useMaterial3: true,
      ),
      home: const LoginPage(),
    );
  }
}

class LoginPage extends StatefulWidget {
  const LoginPage({Key? key});

  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final TextEditingController _usernameController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();

  Future<void> _login() async {
    final pseudo = _usernameController.text;
    final motdepasse = _passwordController.text;
    final BuildContext currentContext = context;

    // Effectuer la requête HTTP
    final response = await http.post(Uri.parse('http://localhost:3000/api/utilisateurs/verifier?psd_utl=$pseudo&mdp_utl=$motdepasse'));

    final Map<String, dynamic> responseData = json.decode(response.body);

    if (responseData.containsKey('message') && responseData['message'] == 'Utilisateur trouvé') {
      print('Utilisateur trouvé');
      Navigator.push(
        currentContext,  // Utiliser la variable locale du BuildContext
        MaterialPageRoute(builder: (context) => AccueilPage(pseudo: pseudo)),
      );
    } else {
      print('Utilisateur non trouvé');
      _showErrorDialog();
    }
  }

  void _showErrorDialog() {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Erreur de connexion'),
          content: Text('Utilisateur non trouvé.'),
          actions: <Widget>[
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: Text('OK'),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Container(
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(10.0),
                color: Colors.grey[200],
              ),
              padding: const EdgeInsets.symmetric(horizontal: 16.0),
              child: TextField(
                controller: _usernameController,
                decoration: const InputDecoration(
                  labelText: 'Nom d\'utilisateur',
                  border: InputBorder.none,
                ),
              ),
            ),
            const SizedBox(height: 16),
            Container(
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(10.0),
                color: Colors.grey[200],
              ),
              padding: const EdgeInsets.symmetric(horizontal: 16.0),
              child: TextField(
                controller: _passwordController,
                decoration: const InputDecoration(
                  labelText: 'Mot de passe',
                  border: InputBorder.none,
                ),
                obscureText: true,
              ),
            ),
            const SizedBox(height: 24),
            ElevatedButton(
              onPressed: _login,
              child: const Text('Connexion'),
            ),
          ],
        ),
      ),
    );
  }
}
