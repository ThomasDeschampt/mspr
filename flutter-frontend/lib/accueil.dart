import 'package:flutter/material.dart';
import 'package:mspr/home_page_widget.dart';
import 'package:mspr/trouver.dart';
import 'messages.dart';
import 'gardiennages.dart';
import 'plantes.dart';
import 'profil.dart';
import 'valider.dart';

class AccueilPage extends StatefulWidget {
  final String pseudo;

  AccueilPage({Key? key, required this.pseudo}) : super(key: key);

  @override
  _AccueilPageState createState() => _AccueilPageState();
}

class _AccueilPageState extends State<AccueilPage> {
  @override
  Widget build(BuildContext context) {
    String pseudo = widget.pseudo;
    bool condition = false; // Mettez ici votre condition

    return Scaffold(
      appBar: AppBar(
        title: Text('Accueil Page, $pseudo'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Expanded(
              child: ListView(
                children: condition
                    ? [
                        _buildMenuItem(context, Icons.person, 'Mon Profil', () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (context) => const ProfilPage()),
                          );
                        }),
                        _buildMenuItem(
                            context, Icons.check, 'Valider une Demande', () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (context) => const ValiderPage()),
                          );
                        }),
                        _buildMenuItem(context, Icons.home, 'Mes gardiennages',
                            () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (context) => const GardiennagePage()),
                          );
                        }),
                        _buildMenuItem(
                            context, Icons.search, 'Chercher une Plante', () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (context) => const TrouverPage()),
                          );
                        }),
                        _buildMenuItem(context, Icons.mail, 'Messages', () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (context) => const MessagesPage()),
                          );
                        }),
                      ]
                    : [
                        _buildMenuItem(context, Icons.person, 'Mon Profil', () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (context) => const HomePageWidget()),
                          );
                        }),
                        _buildMenuItem(
                            context, Icons.add, 'Faire une demande Plantes',
                            () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (context) => const PlantePage()),
                          );
                        }),
                        _buildMenuItem(context, Icons.home, 'Mes gardiennages',
                            () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (context) => const GardiennagePage()),
                          );
                        }),
                        _buildMenuItem(
                            context, Icons.search, 'Trouver des Plantes', () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (context) => const TrouverPage()),
                          );
                        }),
                        _buildMenuItem(context, Icons.mail, 'Messages', () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (context) => const MessagesPage()),
                          );
                        }),
                      ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildMenuItem(
      BuildContext context, IconData icon, String title, VoidCallback onTap) {
    return ListTile(
      leading: Icon(icon), // Ajouter une icône à gauche
      title: Text(title),
      onTap: onTap,
    );
  }
}
