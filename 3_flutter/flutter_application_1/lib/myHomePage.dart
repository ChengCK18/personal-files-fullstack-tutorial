import 'package:flutter/material.dart';
import 'post.dart';
import 'postList.dart';
import 'textInputWidget.dart';
import 'database.dart';
import 'package:firebase_auth/firebase_auth.dart';

class MyHomePage extends StatefulWidget {
  //const MyHomePage({Key? key}) : super(key: key);
  final FirebaseUser user;
  MyHomePage(this.user);

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  List<Post> posts = [];

  void newPost(String textFromInput) {
    var post = Post(textFromInput, widget.user.displayName);
    post.setId(savePost(post));

    setState(() {
      posts.add(post);
    });
  }

  void updatePosts() {
    getAllPosts().then((newPosts) {
      setState(() {
        posts = newPosts;
      });
    });
  }

  @override
  void initState() {
    super.initState();
    updatePosts();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar:
            AppBar(title: Text("👋😊 Good day, ${widget.user.displayName}")),
        body: Column(children: <Widget>[
          Expanded(child: PostList(posts, widget.user)),
          TextInputWidget(newPost),
        ]));
  }
}
