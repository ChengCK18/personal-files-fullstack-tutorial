import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_database/firebase_database.dart';
import 'database.dart';

class Post {
  String body = "gah";
  String author = "";
  //int likes = 0;
  //bool userLiked = false;
  Set usersLiked = {};
  late DatabaseReference _id; //unique identifier

  Post(this.body, this.author);

  void likePost(FirebaseUser user) {
    if (usersLiked.contains(user.uid)) {
      usersLiked.remove(user.uid);
    } else {
      usersLiked.add(user.uid);
    }
    update();
  }

  void update() {
    updatePost(this, this._id);
  }

  void setId(DatabaseReference id) {
    _id = id;
  }

  Map<String, dynamic> toJson() {
    //dynamic meaning any type
    // for firebase to store data, the data format has to be dicionary
    return {'author': author, 'usersLiked': usersLiked.toList(), 'body': body};
  }
}

//record will contain a dict of values including author,
//usersLiked, and body from database.dart
Post createPost(record) {
  Map<String, dynamic> attributes = {
    'author': '',
    'usersLiked': [],
    'body': ''
  };

  record.forEach((key, value) {
    attributes[key] = value;
  });

  Post post = Post(attributes['body'], attributes['author']);
  post.usersLiked = Set.from(attributes['usersLiked']);
  return post;
}
