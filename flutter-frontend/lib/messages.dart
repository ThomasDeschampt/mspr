import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:mspr/Chatpage.dart';

class MessagesPage extends StatefulWidget {
  final String pseudo;

  const MessagesPage({Key? key, required this.pseudo}) : super(key: key);

  @override
  _MessagesPageState createState() => _MessagesPageState();
}

class _MessagesPageState extends State<MessagesPage> {
  List<List<String>>? conversations;
  List<List<String>>? pseudos;

  @override
  void initState() {
    super.initState();
    getConversations();
  }

  Future<void> getConversations() async {
    List<List<String>>? convos = await getConversationsFromAPI(widget.pseudo);
    setState(() {
      conversations = convos;
    });
    if (conversations != null) {
      getPseudos();
    }
  }

  Future<void> getPseudos() async {
    List<List<String>>? ps = await getPseudosFromAPI(conversations!);
    setState(() {
      pseudos = ps;
    });
  }

  Future<List<List<String>>?> getConversationsFromAPI(String pseudo) async {
    final url = Uri.parse('http://15.237.169.255:3000/api/message/conversations?psd_utl=$pseudo');
    final response = await http.get(url);

    if (response.statusCode == 200) {
      final jsonData = json.decode(response.body);
      List<List<String>> conversations = [];

      for (int i = 0; i < jsonData.length; i += 2) {
        List<String> conversation = [jsonData[i].toString(), jsonData[i + 1].toString()];
        conversations.add(conversation);
      }

      return conversations;
    }

    return null;
  }

Future<List<List<String>>?> getPseudosFromAPI(List<List<String>> conversations) async {
  List<List<String>> pseudos = [];

  for (List<String> conversation in conversations) {
    String idUt1 = conversation[0];
    String idUt2 = conversation[1];

    String? gardien = await getPseudoFromAPI(idUt1);
    String? proprietaire = await getPseudoFromAPI(idUt2);

    List<String> pseudoPair = [];
    if (gardien != null) {
      pseudoPair.add(gardien);
    }
    if (proprietaire != null) {
      pseudoPair.add(proprietaire);
    }
    pseudos.add(pseudoPair);
  }

  return pseudos;
}


  Future<String?> getPseudoFromAPI(String id_utl) async {
    final url = Uri.parse('http://15.237.169.255:3000/api/utilisateurs/pseudo?id_utl=$id_utl');
    final response = await http.get(url);

    if (response.statusCode == 200) {
      final jsonData = json.decode(response.body);
      return jsonData['utilisateur'];
    }

    return null;
  }

@override
Widget build(BuildContext context) {
  return Scaffold(
    appBar: AppBar(
      title: Text('Messages'),
    ),
    body: Center(
      child: pseudos != null
          ? ListView.builder(
              itemCount: pseudos!.length,
              itemBuilder: (BuildContext context, int index) {
                List<String> pseudoPair = pseudos![index];
                String pseudo1 = pseudoPair.isNotEmpty ? pseudoPair[0] : '';
                String pseudo2 = pseudoPair.length > 1 ? pseudoPair[1] : '';
               return ListTile(
  title: Text('$pseudo1'),
  subtitle: Text('Conversation ${index + 1}'),
  onTap: () {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => chatpage(
          myPseudo: widget.pseudo, // Assurez-vous que c'est le bon identifiant
          gardien: pseudo1, // Ou l'ID correspondant
          proprietaire: pseudo2, // Le pseudo pour afficher dans l'appBar
        ),
      ),
    );
  },
);
              },
            )
          : CircularProgressIndicator(),
    ),
  );
}
}