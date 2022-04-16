import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Ze App',
      theme: ThemeData(
        primarySwatch: Colors.orange,
      ),
      home: MyHomePage(),
    );
  }
}

class MyHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: Text("Konnichiwa Flutter")),
        body: TextInputWidget());
  }
}

class TextInputWidget extends StatefulWidget {
  const TextInputWidget({Key? key}) : super(key: key);

  @override
  _TextInputWidgetState createState() => _TextInputWidgetState();
}

class _TextInputWidgetState extends State<TextInputWidget> {
  final controller = TextEditingController();
  String text = "";

  @override
  void dispose() {
    super.dispose(); //Dispose whatever the parent need to dispose
    controller.dispose(); //Dispose controller
  }

  void changeText(text_from_textfield) {
    if (text_from_textfield == "Clear meeeee") {
      controller.clear();
      text_from_textfield = "";
    }
    setState(() {
      text = text_from_textfield;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(children: <Widget>[
      TextField(
        controller: this.controller,
        decoration: InputDecoration(
            prefixIcon: Icon(Icons.message), labelText: "Type a message:"),
        onChanged: (text_from_textfield) => changeText(text_from_textfield),
      ),
      Text(text)
    ]);
  }
}
