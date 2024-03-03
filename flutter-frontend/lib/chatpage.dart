import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class chatpage extends StatefulWidget {
  final String myPseudo;
  final String proprietaire;
  final String gardien;

  const chatpage({
    Key? key,
    required this.myPseudo,
    required this.proprietaire,
    required this.gardien,
  }) : super(key: key);

  @override
  _chatpageState createState() => _chatpageState();
}

class _chatpageState extends State<chatpage> {
  TextEditingController messageController = TextEditingController();

  @override
  void initState() {
    super.initState();
    loadMessages();
  }

 Future<void> loadMessages() async {
  // Construisez l'URI avec les paramètres de la query
final uri = Uri.http('15.237.169.255:3000', '/api/message/afficher', {
  'psd_utl': widget.myPseudo == 'gardien' ? 'proprietaire' : 'gardien',
  'psd_utl_1': widget.proprietaire.toString(),
});

  // Effectuez la requête GET
  final response = await http.get(uri); // Les headers ne sont pas nécessaires ici

  if (response.statusCode == 200) {
    List<dynamic> messagesJson = json.decode(response.body);
    setState(() {});
  } else {
    print('failed to load messages');
  }
}

  Future<void> sendMessage() async {
    if (messageController.text.isEmpty) {
      // Pas de message à envoyer
      return;
    }
    final uri = Uri.http('15.237.169.255:3000', '/api/message/ajouter', {
      'txt_msg': messageController.text,
      'exp_msg': widget.myPseudo.toString(),
      'psd_utl': widget.gardien.toString(),
      'psd_utl_1': widget.proprietaire.toString(),
    });

   final response = await http.post(uri);

    if (response.statusCode == 200) {
      // Le message a été envoyé avec succès
      messageController.clear();
      loadMessages(); // Recharger les messages pour afficher le nouveau message
    } else {
      // Gérer l'échec de l'envoi du message
      print('Failed to send message: ${response.body}');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
     appBar: AppBar(
    title: Text(
      widget.myPseudo == widget.proprietaire ? widget.gardien :
      widget.myPseudo == widget.gardien ? widget.proprietaire :
      'Pas de conversation', // Fallback au cas où aucune des conditions n'est remplie
  ),
),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              itemBuilder: (BuildContext context, int index) {},
              // Afficher les messages ici
            ),
          ),
          Padding(
            padding: EdgeInsets.all(8.0),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: messageController,
                    decoration: InputDecoration(
                      hintText: 'Tapez un message...',
                    ),
                  ),
                ),
                IconButton(
                  icon: Icon(Icons.send),
                  onPressed: sendMessage,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
