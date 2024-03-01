import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

Future<List<List<String>>?> getConversationsFromAPI(String psd_utl) async {
  final url = Uri.parse('http://15.237.169.255:3000/api/message/conversations?psd_utl=$psd_utl');
  try {
    final response = await http.get(url);

    if (response.statusCode == 200) {
      final jsonData = json.decode(response.body);
      List<List<String>> conversations = [];

      if (jsonData.length % 2 != 0) {
        throw Exception("Les données de conversation ne sont pas en paires.");
      }

      for (int i = 0; i < jsonData.length; i += 2) {
        List<String> conversation = [jsonData[i], jsonData[i + 1]];
        conversations.add(conversation);
      }

      return conversations;
    } else {
      throw Exception("Échec de chargement des conversations: ${response.statusCode}");
    }
  } catch (e) {
    print(e); // Pour les besoins de débogage
    return null;
  }
}

Future<String> getPseudoFromAPI(String id_utl) async {
  final url = Uri.parse('http://15.237.169.255:3000/api/utilisateurs/pseudo?id_utl=$id_utl');
  try {
    final response = await http.get(url);

    if (response.statusCode == 200) {
      final jsonData = json.decode(response.body);
      return jsonData['psd_utl'];
    } else {
      throw Exception("Échec de chargement du pseudo: ${response.statusCode}");
    }
  } catch (e) {
    print(e);
    return '';
  }
}

Future<List<List<String>>?> getPseudosFromAPI(List<List<String>> conversations) async {
  List<List<String>> pseudos = [];
  for (List<String> conversation in conversations) {
    try {
      String pseudoUt1 = await getPseudoFromAPI(conversation[0]);
      String pseudoUt2 = await getPseudoFromAPI(conversation[1]);
      List<String> pseudoPair = [pseudoUt1, pseudoUt2];
      pseudos.add(pseudoPair);
    } catch (e) {
      print(e);
      return null;
    }
  }
  return pseudos;
}

class MessagesPage extends StatefulWidget {
  final String pseudo;
  const MessagesPage({Key? key, required this.pseudo}) : super(key: key);

  @override
  _MessagesPageState createState() => _MessagesPageState();
}

class _MessagesPageState extends State<MessagesPage> {
  List<List<String>>? conversations;
  List<List<String>>? pseudos;
  bool isLoading = true;
  String? errorMessage;

  @override
  void initState() {
    super.initState();
    _fetchConversations(widget.pseudo);
  }

  Future<void> _fetchConversations(String psd_utl) async {
    try {
      final fetchedConversations = await getConversationsFromAPI(psd_utl);
      if (fetchedConversations != null && fetchedConversations.isNotEmpty) {
        final fetchedPseudos = await getPseudosFromAPI(fetchedConversations);
        if (fetchedPseudos != null) {
          setState(() {
            conversations = fetchedConversations;
            pseudos = fetchedPseudos;
            isLoading = false;
          });
        } else {
          setState(() {
            errorMessage = "Impossible de charger les pseudos des utilisateurs.";
            isLoading = false;
          });
        }
      } else {
        setState(() {
          errorMessage = "Aucune conversation trouvée.";
          isLoading = false;
        });
      }
    } catch (e) {
      setState(() {
        errorMessage = e.toString();
        isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Messages'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (isLoading)
              const Center(child: CircularProgressIndicator())
            else if (errorMessage != null)
              Center(child: Text(errorMessage!))
            else if (conversations != null && pseudos != null)
              ..._buildConversationList(conversations!, pseudos!)
          ],
        ),
      ),
    );
  }

  List<Widget> _buildConversationList(
      List<List<String>> conversations, List<List<String>> pseudos) {
    return List.generate(conversations.length, (index) {
      final String otherUserPseudo =
          pseudos[index][0] == widget.pseudo ? pseudos[index][1] : pseudos[index][0];
      return ListTile(
        title: Text(otherUserPseudo),
        onTap: () {
          // Handle conversation tap.
        },
      );
    });
  }
}