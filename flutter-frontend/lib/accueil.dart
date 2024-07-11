import 'package:flutter/material.dart';
import '/flutter_flow/flutter_flow_widgets.dart';
import '/flutter_flow/flutter_flow_theme.dart';
import 'package:http/http.dart' as http; 
import 'dart:convert'; 
import 'package:mspr/home_page_widget.dart';
import 'package:mspr/trouver.dart';
import 'messages.dart';
import 'gardiennages.dart';
import 'faire_demande.dart';
import 'profil.dart';
import 'valider.dart';

class AccueilPage extends StatefulWidget {
  final String pseudo;

  AccueilPage({Key? key, required this.pseudo, String? token}) : super(key: key);

  @override
  _AccueilPageState createState() => _AccueilPageState();
}

class _AccueilPageState extends State<AccueilPage> {
  bool condition = false;

  @override
  void initState() {
    super.initState();
    fetchUserType(); 
  }

  Future<void> fetchUserType() async {
    final pseudo = widget.pseudo;
    try {
      final response = await http.get(Uri.parse('http://15.237.169.255:3000/api/botaniste/estBotaniste?psd_utl=$pseudo'));

      if (response.statusCode == 200) {
        setState(() {
          condition = true;
        });
      } else {
        setState(() {
          condition = false;
        });
      }
    } catch (e) {
      setState(() {
        condition = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Accueil Page',
          style: TextStyle(
            fontFamily: 'Plus Jakarta Sans',
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: SingleChildScrollView(
          child: condition
              ? _buildBotanistMenu()
              : _buildNonBotanistMenu(),
        ),
      ),
    );
  }

  Widget _buildBotanistMenu() {
    return Column(
      children: [
        _buildMenuItem(context, Icons.person, 'Mon profil botaniste', () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => HomePageWidget(pseudo: widget.pseudo),
            ),
          );
        }),
        _buildMenuItem(context, Icons.check, 'Valider une demande', () {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => ValiderPage(pseudo: widget.pseudo)),
          );
        }),
        _buildMenuItem(context, Icons.home, 'Mes gardiennages', () {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => GardiennagePage(pseudo: widget.pseudo)),
          );
        }),
        _buildMenuItem(context, Icons.search, 'Trouver des plantes à garder', () {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => TrouverPage(pseudo: widget.pseudo)),
          );
        }),
        _buildMenuItem(context, Icons.mail, 'Messages', () {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => MessagesPage(pseudo: widget.pseudo)),
          );
        }),
      ],
    );
  }

  Widget _buildNonBotanistMenu() {
    return Column(
      children: [
        _buildMenuItem(context, Icons.person, 'Mon profil utilisateur', () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => HomePageWidget(pseudo: widget.pseudo),
            ),
          );
        }),
        _buildMenuItem(context, Icons.add, 'Confier ma plante à quelqu\'un', () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => PlantePage(pseudo: widget.pseudo)),
          );
        }),
        _buildMenuItem(context, Icons.home, 'Mes gardiennages', () {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => GardiennagePage(pseudo: widget.pseudo)),
          );
        }),
        _buildMenuItem(context, Icons.search, 'Trouver des plantes à garder', () {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => TrouverPage(pseudo: widget.pseudo)),
          );
        }),
        _buildMenuItem(context, Icons.mail, 'Messages', () {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => MessagesPage(pseudo: widget.pseudo)),
          );
        }),
      ],
    );
  }

  Widget _buildMenuItem(
      BuildContext context, IconData icon, String title, VoidCallback onTap) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: FFButtonWidget(
        onPressed: onTap,
        iconData: icon,
        text: title,
        options: FFButtonOptions(
          width: double.infinity,
          height: 50,
          color: Color.fromARGB(255, 15, 220, 141),
          textStyle: FlutterFlowTheme.of(context).titleMedium.override(
            fontFamily: 'Plus Jakarta Sans',
            color: Colors.white,
          ),
          elevation: 2,
          borderRadius: BorderRadius.circular(8.0),
        ),
      ),
    );
  }
}
