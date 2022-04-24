import 'package:firebase_database/firebase_database.dart';
import 'post.dart';

final databaseReference = FirebaseDatabase.instance.reference();

DatabaseReference savePost(Post post) {
  var id = databaseReference
      .child('posts/')
      .push(); //push gives a unique reference id

  id.set(post.toJson()); //toJson is defined in the database.dart
  return id;
}

void updatePost(Post post, DatabaseReference id) {
  id.update(post.toJson());
}

Future<List<Post>> getAllPosts() async {
  DataSnapshot dataSnapshot = await databaseReference.child('posts/').once();
  List<Post> posts = [];

  if (dataSnapshot.value != null) {
    // key
    dataSnapshot.value.forEach((key, value) {
      Post post = createPost(value);
      post.setId(databaseReference.child('posts/' + key));
      posts.add(post);
    });
  }
  return posts;
}
