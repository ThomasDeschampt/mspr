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
  List<Map<String, dynamic>>? conversations;

  @override
  void initState() {
    super.initState();
    fetchConversations();
  }

  Future<String> getId(String pseudo) async {
    final url = Uri.parse('http://localhost:3000/api/utilisateurs/id?psd_utl=$pseudo');
    final response = await http.get(url);

    if (response.statusCode == 200) {
      final jsonData = json.decode(response.body);
      print("User ID: ${jsonData['utilisateur']}");
      return jsonData['utilisateur'].toString();
    } else {
      throw Exception('Failed to load user ID');
    }
  }

  Future<void> fetchConversations() async {
    try {
      final fetchedConversations = await getConversationsFromAPI(widget.pseudo);
      setState(() {
        conversations = fetchedConversations;
      });
    } catch (e) {
      print('Error fetching conversations: $e');
    }
  }

  Future<List<Map<String, dynamic>>?> getConversationsFromAPI(String pseudo) async {
    try {
      final id = await getId(pseudo);
      final url = Uri.parse('http://localhost:3000/api/conversation/afficher?id_utl=$id');
      final response = await http.get(url);

      if (response.statusCode == 200) {
        final jsonData = json.decode(response.body);
        List<Map<String, dynamic>> conversations = [];

        for (var conv in jsonData) {
          conversations.add({
            'id_conv': conv['id_conv'],
            'last_message': conv['type'],  // Adjust this if you have another field for the last message
          });
        }

        return conversations;
      } else {
        throw Exception('Failed to load conversations');
      }
    } catch (e) {
      print('Error in getConversationsFromAPI: $e');
      return null;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Conversations'),
      ),
      body: conversations == null
          ? Center(child: CircularProgressIndicator())
          : ListView.builder(
              itemCount: conversations!.length,
              itemBuilder: (context, index) {
                return ListTile(
                  title: Text('Conversation ID: ${conversations![index]['id_conv']}'),
                  subtitle: Text('Last Message: ${conversations![index]['last_message']}'),
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => ChatPage(conversationId: conversations![index]['id_conv'].toString()),
                      ),
                    );
                  },
                );
              },
            ),
    );
  }
}

class ChatPage extends StatefulWidget {
  final String conversationId;

  const ChatPage({Key? key, required this.conversationId}) : super(key: key);

  @override
  _ChatPageState createState() => _ChatPageState();
}

class _ChatPageState extends State<ChatPage> {
  List<Map<String, dynamic>>? messages;

  @override
  void initState() {
    super.initState();
    fetchMessages();
  }

  Future<void> fetchMessages() async {
    try {
      final fetchedMessages = await getMessagesFromAPI(widget.conversationId);
      setState(() {
        messages = fetchedMessages;
      });
    } catch (e) {
      print('Error fetching messages: $e');
    }
  }

  Future<List<Map<String, dynamic>>?> getMessagesFromAPI(String conversationId) async {
    try {
      final url = Uri.parse('http://localhost:3000/api/message/afficher?id_conv=$conversationId');
      final response = await http.get(url);

      if (response.statusCode == 200) {
        final jsonData = json.decode(response.body);
        List<Map<String, dynamic>> messages = [];

        for (var msg in jsonData) {
          messages.add({
            'id_msg': msg['id_msg'],
            'txt_msg': msg['txt_msg'],
            'id_sender': msg['id_sender'],
            'createdAt': msg['createdAt'],
          });
        }

        return messages;
      } else {
        throw Exception('Failed to load messages');
      }
    } catch (e) {
      print('Error in getMessagesFromAPI: $e');
      return null;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Chat Page'),
      ),
      body: messages == null
          ? Center(child: CircularProgressIndicator())
          : ListView.builder(
              itemCount: messages!.length,
              itemBuilder: (context, index) {
                return ListTile(
                  title: Text('Message: ${messages![index]['txt_msg']}'),
                  subtitle: Text('Sender ID: ${messages![index]['id_sender']} at ${messages![index]['createdAt']}'),
                );
              },
            ),
    );
  }
}
