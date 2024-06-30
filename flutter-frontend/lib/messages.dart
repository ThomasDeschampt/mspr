import 'dart:async';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class MessagesPage extends StatefulWidget {
  final String pseudo;

  const MessagesPage({Key? key, required this.pseudo}) : super(key: key);

  @override
  _MessagesPageState createState() => _MessagesPageState();
}

class _MessagesPageState extends State<MessagesPage> {
  List<Map<String, dynamic>>? conversations;
  Map<int, String> userPseudos = {}; // Cache for user pseudonyms

  @override
  void initState() {
    super.initState();
    fetchConversations();
  }

  Future<String> getId(String pseudo) async {
    final url =
        Uri.parse('http://localhost:3000/api/utilisateurs/id?psd_utl=$pseudo');
    final response = await http.get(url);

    if (response.statusCode == 200) {
      final jsonData = json.decode(response.body);
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

  Future<List<Map<String, dynamic>>?> getConversationsFromAPI(
      String pseudo) async {
    try {
      final id = await getId(pseudo);
      final url = Uri.parse(
          'http://localhost:3000/api/conversation/afficher?id_utl=$id');
      final response = await http.get(url);

      if (response.statusCode == 200) {
        final jsonData = json.decode(response.body);
        List<Map<String, dynamic>> conversations = [];

        for (var conv in jsonData) {
          conversations.add({
            'id_conv': conv['id_conv'],
            'id_utl1': conv['id_utl1'],
            'id_utl2': conv['id_utl2'],
            'other_user_id':
                conv['id_utl1'] == id ? conv['id_utl2'] : conv['id_utl1'],
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

  Future<String> getPseudo(int userId) async {
    if (userPseudos.containsKey(userId)) {
      return userPseudos[userId]!;
    }
    try {
      final url = Uri.parse(
          'http://localhost:3000/api/utilisateurs/pseudo?id_utl=$userId');
      final response = await http.get(url);

      if (response.statusCode == 200) {
        final jsonData = json.decode(response.body);
        userPseudos[userId] = jsonData['utilisateur'];
        return jsonData['utilisateur'];
      } else {
        throw Exception('Failed to load pseudo');
      }
    } catch (e) {
      print('Error in getPseudo: $e');
      return 'Unknown';
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
                return FutureBuilder<String>(
                  future: getPseudo(conversations![index]['other_user_id']),
                  builder: (context, snapshot) {
                    if (snapshot.connectionState == ConnectionState.waiting) {
                      return ListTile(
                        title: Text('Loading...'),
                      );
                    }
                    if (snapshot.hasError) {
                      return ListTile(
                        title: Text('Error: ${snapshot.error}'),
                      );
                    }
                    String pseudo = snapshot.data ?? 'Unknown';
                    return ListTile(
                      title: Text('Conversation avec : $pseudo'),
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => ChatPage(
                              conversationId:
                                  conversations![index]['id_conv'].toString(),
                              pseudo: widget.pseudo,
                            ),
                          ),
                        );
                      },
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
  final String pseudo;

  const ChatPage({Key? key, required this.conversationId, required this.pseudo})
      : super(key: key);

  @override
  _ChatPageState createState() => _ChatPageState();
}

class _ChatPageState extends State<ChatPage> {
  List<Map<String, dynamic>>? messages;
  TextEditingController messageController = TextEditingController();
  Timer? _timer;
  Map<int, String> userPseudos = {}; // Cache for user pseudonyms
  ScrollController _scrollController = ScrollController();
  String? idSender;

  @override
  void initState() {
    super.initState();
    fetchMessages();
    startAutoRefresh();
    getIdSender();
  }

  @override
  void dispose() {
    _timer?.cancel();
    _scrollController.dispose();
    super.dispose();
  }

  void startAutoRefresh() {
    _timer = Timer.periodic(Duration(seconds: 5), (timer) {
      fetchMessages();
    });
  }

  Future<void> fetchMessages() async {
    try {
      final fetchedMessages = await getMessagesFromAPI(widget.conversationId);
      setState(() {
        messages = fetchedMessages;
      });
      _scrollToBottom();
    } catch (e) {
      print('Error fetching messages: $e');
    }
  }

  void _scrollToBottom() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      Future.delayed(Duration(milliseconds: 100), () {
        if (_scrollController.hasClients) {
          _scrollController.jumpTo(_scrollController.position.maxScrollExtent);
        }
      });
    });
  }

  Future<void> getIdSender() async {
    try {
      idSender = await getId(widget.pseudo);
    } catch (e) {
      print('Error getting sender ID: $e');
    }
  }

  Future<List<Map<String, dynamic>>?> getMessagesFromAPI(
      String conversationId) async {
    try {
      final url = Uri.parse(
          'http://localhost:3000/api/message/afficher?id_conv=$conversationId');
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

  Future<String> getId(String pseudo) async {
    final url =
        Uri.parse('http://localhost:3000/api/utilisateurs/id?psd_utl=$pseudo');
    final response = await http.get(url);

    if (response.statusCode == 200) {
      final jsonData = json.decode(response.body);
      return jsonData['utilisateur'].toString();
    } else {
      throw Exception('Failed to load user ID');
    }
  }

  Future<String> getPseudo(int userId) async {
    if (userPseudos.containsKey(userId)) {
      return userPseudos[userId]!;
    }
    try {
      final url = Uri.parse(
          'http://localhost:3000/api/utilisateurs/pseudo?id_utl=$userId');
      final response = await http.get(url);

      if (response.statusCode == 200) {
        final jsonData = json.decode(response.body);
        userPseudos[userId] = jsonData['utilisateur'];
        return jsonData['utilisateur'];
      } else {
        throw Exception('Failed to load pseudo');
      }
    } catch (e) {
      print('Error in getPseudo: $e');
      return 'Unknown';
    }
  }

  Future<void> addMessage(String txtMsg) async {
    try {
      if (idSender == null) return;

      final url = Uri.parse(
          'http://localhost:3000/api/message/ajouter?id_conv=${widget.conversationId}&dat_msg=${DateTime.now().toIso8601String()}&txt_msg=$txtMsg&id_sender=$idSender');
      final response = await http.post(url);

      fetchMessages();
      _scrollToBottom();
    } catch (e) {
      print('Error adding message: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Chat Page'),
        actions: [
          IconButton(
            icon: Icon(Icons.refresh),
            onPressed: fetchMessages,
          ),
        ],
      ),
      body: Column(
        children: [
          Expanded(
            child: messages == null
                ? Center(child: CircularProgressIndicator())
                : ListView.builder(
                    controller: _scrollController,
                    itemCount: messages!.length,
                    itemBuilder: (context, index) {
                      bool isSentByMe =
                          messages![index]['id_sender'].toString() == idSender;
                      return FutureBuilder<String>(
                        future: getPseudo(messages![index]['id_sender']),
                        builder: (context, snapshot) {
                          if (snapshot.connectionState ==
                              ConnectionState.waiting) {
                            return Center(child: CircularProgressIndicator());
                          }
                          if (snapshot.hasError) {
                            return Text('Error: ${snapshot.error}');
                          }
                          String pseudo = snapshot.data ?? 'Unknown';
                          return Row(
                            mainAxisAlignment: isSentByMe
                                ? MainAxisAlignment.end
                                : MainAxisAlignment.start,
                            children: [
                              Container(
                                padding: EdgeInsets.symmetric(
                                    vertical: 10, horizontal: 14),
                                margin: EdgeInsets.symmetric(
                                    vertical: 5, horizontal: 10),
                                constraints: BoxConstraints(
                                    maxWidth:
                                        MediaQuery.of(context).size.width *
                                            0.7),
                                decoration: BoxDecoration(
                                  color: isSentByMe
                                      ? Colors.blue
                                      : Colors.grey[300],
                                  borderRadius: isSentByMe
                                      ? BorderRadius.only(
                                          topLeft: Radius.circular(10),
                                          topRight: Radius.circular(10),
                                          bottomLeft: Radius.circular(10),
                                        )
                                      : BorderRadius.only(
                                          topLeft: Radius.circular(10),
                                          topRight: Radius.circular(10),
                                          bottomRight: Radius.circular(10),
                                        ),
                                ),
                                child: Column(
                                  crossAxisAlignment: isSentByMe
                                      ? CrossAxisAlignment.end
                                      : CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      pseudo,
                                      style: TextStyle(
                                        fontWeight: FontWeight.bold,
                                        color: isSentByMe
                                            ? Colors.white
                                            : Colors.black,
                                      ),
                                    ),
                                    Text(
                                      messages![index]['txt_msg'],
                                      style: TextStyle(
                                        color: isSentByMe
                                            ? Colors.white
                                            : Colors.black,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ],
                          );
                        },
                      );
                    },
                  ),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: messageController,
                    decoration: InputDecoration(
                      hintText: 'Type a message',
                      border: OutlineInputBorder(),
                    ),
                  ),
                ),
                IconButton(
                  icon: Icon(Icons.send),
                  onPressed: () {
                    if (messageController.text.isNotEmpty) {
                      addMessage(messageController.text);
                      messageController.clear();
                    }
                  },
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
