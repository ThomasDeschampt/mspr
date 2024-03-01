import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class User {
  final String id;
  final String username;

  User({required this.id, required this.username});

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      username: json['username'],
    );
  }
}

class MessagesPage extends StatelessWidget {
  const MessagesPage({Key? key});

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
            // Ajoutez ici votre widget de conversation
            Expanded(
              child: ConversationPage(),
            ),
          ],
        ),
      ),
    );
  }
}

class Message {
  final String text;
  final bool isBot;

  Message({required this.text, required this.isBot});
}

class ConversationPage extends StatefulWidget {
  @override
  _ConversationPageState createState() => _ConversationPageState();
}

class _ConversationPageState extends State<ConversationPage> {
  final TextEditingController _textController = TextEditingController();
  final List<Message> _messages = [];

  void _sendMessage(String messageText) {
    setState(() {
      _messages.add(Message(text: messageText, isBot: false));
      _messages.add(Message(text: 'Bot: $messageText', isBot: true));
    });
    _textController.clear();
  }

Future<List<User>> fetchUsers() async {
  try {
    final response1 = await http.get(Uri.parse('http://15.237.169.255:3000/api/proprietaire/estProprietaire?psd_utl=proprietaire'));
    final response2 = await http.get(Uri.parse('http://15.237.169.255:3000/api/gardien/estGardien?psd_utl=gardien'));

    if (response1.statusCode == 200 && response2.statusCode == 200) {
      final Map<String, dynamic> data1 = jsonDecode(response1.body);
      final Map<String, dynamic> data2 = jsonDecode(response2.body);

      
      final List<dynamic>? usersData1 = data1['users'];
      final List<dynamic>? usersData2 = data2['users'];

      if (usersData1 != null && usersData2 != null) {
        List<User> allUsers = [];

        for (var userData in usersData1) {
          allUsers.add(User.fromJson(userData));
        }

        for (var userData in usersData2) {
          allUsers.add(User.fromJson(userData));
        }

        return allUsers;
      } else {
        throw Exception('Failed to load users: data is null');
      }
    } else {
      throw Exception('Failed to load users: HTTP status code');
    }
  } catch (error) {
    print('Error fetching users: $error');
    throw error;
  }
}

  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        Expanded(
          child: FutureBuilder<List<User>>(
            future: fetchUsers(),
            builder: (context, snapshot) {
              if (snapshot.connectionState == ConnectionState.waiting) {
                return Center(child: CircularProgressIndicator());
              } else if (snapshot.hasError) {
                return Center(child: Text('Error: ${snapshot.error}'));
              } else {
                List<User> users = snapshot.data ?? [];
                return ListView.builder(
                  itemCount: users.length,
                  itemBuilder: (context, index) {
                    final user = users[index];
                    return ListTile(
                      title: Text(user.username),
                      onTap: () {
                        // Implémentez l'action pour commencer la conversation avec cet utilisateur
                        _sendMessage("Vous avez commencé une conversation avec ${user.username}");
                      },
                    );
                  },
                );
              }
            },
          ),
        ),
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: Row(
            children: <Widget>[
              Expanded(
                child: TextField(
                  controller: _textController,
                  decoration: InputDecoration(
                    hintText: 'Type a message...',
                  ),
                ),
              ),
              IconButton(
                icon: Icon(Icons.send),
                onPressed: () {
                  if (_textController.text.isNotEmpty) {
                    _sendMessage(_textController.text);
                  }
                },
              ),
            ],
          ),
        ),
      ],
    );
  }

  @override
  void dispose() {
    _textController.dispose();
    super.dispose();
  }
}
