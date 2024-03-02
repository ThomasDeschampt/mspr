import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';


class chatpage extends StatefulWidget {
  final String myId;
  final String otherUserId;
  final String otherUserPseudo;

  const chatpage({
    Key? key,
    required this.myId,
    required this.otherUserId,
    required this.otherUserPseudo, 
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
    final uri = Uri.parse('http://15.237.169.255:3000/api/message/afficher');
    final response = await http.get(uri, headers: {
      'id_utl': widget.myId,
      'id_utl_1': widget.otherUserId,
    });

    if (response.statusCode == 200) {
      List<dynamic> messagesJson = json.decode(response.body);
      setState(() {
      });
    } else {
      print('failed to load messages');
    }
  }

 Future<void> sendMessage() async {
  if (messageController.text.isEmpty) {
    // Pas de message à envoyer
    return;
  }
  final uri = Uri.parse('http://15.237.169.255:3000/api/message/ajouter');
  final headers = {"Content-Type": "application/x-www-form-urlencoded"};
  final body = {
    'txt_msg': messageController.text,  // Utilisez le texte saisi par l'utilisateur
    'exp_msg': widget.myId,             // ID de l'utilisateur courant qui envoie le message
    'id_utl': widget.myId,              // ID de l'utilisateur courant (peut être le même que exp_msg)
    'id_utl_1': widget.otherUserId,     // ID de l'autre utilisateur avec qui vous avez une conversation
  };

  final response = await http.post(uri, headers: headers, body: body);

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
        title: Text(widget.otherUserPseudo), 
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(itemBuilder: (BuildContext context, int index) {  },
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