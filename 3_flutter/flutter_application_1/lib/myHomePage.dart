import 'package:flutter/material.dart';
import 'post.dart';
import 'postList.dart';
import 'textInputWidget.dart';

class MyHomePage extends StatefulWidget {
  //const MyHomePage({Key? key}) : super(key: key);
  final String name;
  MyHomePage(this.name);

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  List<Post> posts = [];

  void newPost(String textFromInput) {
    setState(() {
      posts.add(new Post(textFromInput, widget.name));
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: Text("👋😊 Good day, ${widget.name}")),
        body: Column(children: <Widget>[
          Expanded(child: PostList(posts)),
          TextInputWidget(newPost),
        ]));
  }
}
