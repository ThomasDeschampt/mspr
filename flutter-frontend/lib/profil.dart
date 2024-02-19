import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Mes Plantes',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const ProfilPage(),
    );
  }
}

class ProfilPage extends StatefulWidget {
  const ProfilPage({super.key});

  @override
  _ProfilPageState createState() => _ProfilPageState();
}

class _ProfilPageState extends State<ProfilPage> {
  final List<String> _plantes = ['Plante1', 'Plante2', 'Plante3'];
  final List<String> _gardiennages = ['Plante1', 'Plante2', 'Plante3'];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Accueil'),
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          const SizedBox(
            height: 120, // Hauteur du cercle
            width: 120, // Largeur du cercle
            child: CircleAvatar(
              backgroundColor: Colors.blue, // Couleur du cercle
              radius: 60, // Rayon du cercle
              child: Icon(
                Icons.person, // Icône par défaut (vous pouvez le modifier)
                size: 80, // Taille de l'icône
                color: Colors.white, // Couleur de l'icône
              ),
            ),
          ),
          const SizedBox(height: 16), // Espacement entre le cercle et le texte
          const Text(
            'Nom Prenom',
            style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 16), // Espacement entre le texte et la liste de plantes
          Container(
            padding: const EdgeInsets.all(16),
            child: const Text(
              'Mes plantes :',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
          ),
          Expanded(
            child: ListView.builder(
              itemCount: _plantes.length,
              itemBuilder: (context, index) {
                return ListTile(title: Text(_plantes[index]));
              },
            ),
          ),
          Container(
            padding: const EdgeInsets.all(16),
            child: const Text(
              'Mes gardiennages :',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
          ),
          Expanded(
            child: ListView.builder(
              itemCount: _gardiennages.length,
              itemBuilder: (context, index) {
                return ListTile(title: Text(_gardiennages[index]));
              },
            ),
          ),
        ],
      ),
    );
  }
}