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

    // Effectuer la requête HTTP
final response = await http.post(Uri.parse('http://localhost:3000/api/utilisateurs/verifier?psd_utl=$pseudo&mdp_utl=$motdepasse'));

    

    if (response.statusCode == 200) {
      final bool utilisateurTrouve = json.decode(response.body);
      if (utilisateurTrouve) {
        print('Utilisateur trouvé');
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => const AccueilPage()),
        );
      } else {
        print('Utilisateur non trouvé');
      }
    } else {
      print('Erreur de connexion: ${response.statusCode}');
    }
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
