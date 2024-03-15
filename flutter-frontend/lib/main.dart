import 'package:flutter/material.dart';
import 'package:http/http.dart' as http; // Importez le package http
import 'dart:convert'; // Pour utiliser json.decode
import 'accueil.dart';
import 'inscription.dart';
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

  static of(BuildContext context) {}

}


class LoginPage extends StatefulWidget {
  const LoginPage({Key? key});

  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final TextEditingController _usernameController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  String? _jwtToken; 


  Future<void> _login() async {
    final pseudo = _usernameController.text;
    final motdepasse = _passwordController.text;
    final BuildContext currentContext = context;

    // Effectuer la requête HTTP
    final response = await http.post(Uri.parse('http://15.237.169.255:3000/api/utilisateurs/verifier?psd_utl=$pseudo&mdp_utl=$motdepasse'));
    // final response = await http.post(Uri.parse('localhost:3000/api/utilisateurs/verifier?psd_utl=$pseudo&mdp_utl=$motdepasse'));

    final Map<String, dynamic> responseData = json.decode(response.body);

    if (responseData.containsKey('message') && responseData['message'] == 'Utilisateur trouvé') {
      print('Utilisateur trouvé');
      // Extraire et stocker le token JWT de la réponse
      _jwtToken = responseData['token'];
      // Naviguer vers la page d'accueil en passant le pseudo et le token JWT
      Navigator.push(
        currentContext,
        MaterialPageRoute(builder: (context) => AccueilPage(pseudo: pseudo, token: _jwtToken)),
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

//naviguer vers page d'inscription
  void _navigateToSignUp() {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => InscriptionPage()),
    );
  }

@override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
               const SizedBox(height: 32), 
               Image.asset(
                'images/Logo.png',
                width: 150.0, // Largeur fixe pour le logo
                height: 150.0, // Hauteur fixe pour le logo
              ),
               const Text(
              "S'identifier", // Titre
              style: TextStyle(
                fontSize: 28, // Taille de la police du titre
                fontWeight: FontWeight.bold, // Épaisseur de la police
              ),
            ),
             const SizedBox(height: 32), 
              Container(
                
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(10.0),
                  color: Colors.white,
                  boxShadow: [
                    BoxShadow(
                      color: Colors.grey.withOpacity(0.5),
                      spreadRadius: 5,
                      blurRadius: 7,
                      offset: Offset(0, 3), // changes position of shadow
                    ),
                  ],
                ),
                padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 12.0),
                child: TextField(
                  controller: _usernameController,
                  decoration: const InputDecoration(
                    labelText: 'Utilisateur',
                    labelStyle: TextStyle(
                      color: Colors.grey,
                      fontSize: 14,
                    ),
                    border: InputBorder.none,
                    focusedBorder: InputBorder.none,
                    enabledBorder: InputBorder.none,
                    errorBorder: InputBorder.none,
                    disabledBorder: InputBorder.none,
                  ),
                ),
              ),
              const SizedBox(height: 16),
              Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(10.0),
                  color: Colors.white,
                  boxShadow: [
                    BoxShadow(
                      color: Colors.grey.withOpacity(0.5),
                      spreadRadius: 5,
                      blurRadius: 7,
                      offset: Offset(0, 3), // changes position of shadow
                    ),
                  ],
                ),
                padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 12.0),
                child: TextField(
                  controller: _passwordController,
                  decoration: const InputDecoration(
                    labelText: 'Mot de passe',
                    labelStyle: TextStyle(
                      color: Colors.grey,
                      fontSize: 14,
                    ),
                    border: InputBorder.none,
                    focusedBorder: InputBorder.none,
                    enabledBorder: InputBorder.none,
                    errorBorder: InputBorder.none,
                    disabledBorder: InputBorder.none,
                  ),
                  obscureText: true,
                ),
              ),
              const SizedBox(height: 24),
              ElevatedButton(
                onPressed: _login,
                style: ElevatedButton.styleFrom(
                  primary: Color.fromARGB(255, 15, 220, 141),
                  minimumSize: Size(double.infinity, 50), // fromHeight use double.infinity as width and 50 is the height
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(5)), // Pas de bordures arrondies
                ),
                child: const Text('Connexion', style: TextStyle(fontSize: 16, color: Colors.white),),
              ),
              ElevatedButton(
              onPressed: _navigateToSignUp, // Méthode pour naviguer vers la page d'inscription
              style: ElevatedButton.styleFrom(
                primary: Colors.blue, // Couleur du bouton d'inscription
                minimumSize: Size(double.infinity, 50), // Taille du bouton d'inscription
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(5)), // Bordures arrondies
              ),
              child: const Text('Inscription', style: TextStyle(fontSize: 16, color: Colors.white),),
            ),
            ],
          ),
        ),
      ),
    );
  }
}
