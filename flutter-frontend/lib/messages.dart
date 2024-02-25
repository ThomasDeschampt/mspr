import 'package:flutter/material.dart';

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
      // Here you would handle bot's response, for now let's just echo the message
      _messages.add(Message(text: 'Bot: $messageText', isBot: true));
    });
    _textController.clear();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        Expanded(
          child: ListView.builder(
            itemCount: _messages.length,
            itemBuilder: (context, index) {
              final message = _messages[index];
              return ListTile(
                title: Text(message.text),
                leading: message.isBot
                    ? Icon(Icons.android) // You can use any bot icon here
                    : null,
                trailing: !message.isBot
                    ? Icon(Icons.person) // You can use any user icon here
                    : null,
              );
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
