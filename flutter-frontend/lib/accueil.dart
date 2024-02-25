import 'package:flutter/material.dart';
import '/flutter_flow/flutter_flow_widgets.dart'; // Importez les widgets FlutterFlow
import '/flutter_flow/flutter_flow_theme.dart'; // Importez le thème FlutterFlow
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
        title: Text('Accueil Page'),
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
                                builder: (context) => HomePageWidget(pseudo: pseudo),
                              ),
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
    return FFButtonWidget( // Utilisez le widget FFButtonWidget à la place de ListTile
      onPressed: onTap,
      iconData: icon,
      text: title,
      options: FFButtonOptions(
        width: 300,
        height: 50,
        color: Color.fromARGB(255, 15, 220, 141),
        textStyle: FlutterFlowTheme.of(context).titleMedium.override(
          fontFamily: 'Plus Jakarta Sans',
          color: Colors.white,
        ),
        elevation: 2,
      ),
    );
  }
}
