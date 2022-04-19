import 'package:flutter/material.dart';
import 'package:flutter_application_1/myHomePage.dart';

class LoginPage extends StatelessWidget {
  const LoginPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: Text("Konnichiwa Flutter")), body: Body());
  }
}

class Body extends StatefulWidget {
  const Body({Key? key}) : super(key: key);

  @override
  State<Body> createState() => _BodyState();
}

class _BodyState extends State<Body> {
  String name = "";
  TextEditingController controller = TextEditingController();

  void click() {
    setState(() {
      name = controller.text;
      controller.clear();
      Navigator.push(
          context, MaterialPageRoute(builder: (context) => MyHomePage(name)));
    });
  }

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: Alignment.center,
      child: Padding(
          padding: EdgeInsets.all(10),
          child: TextField(
            controller: controller,
            decoration: InputDecoration(
                prefixIcon: Icon(Icons.person),
                labelText: "Enter your name...",
                border: OutlineInputBorder(
                    borderSide: BorderSide(width: 5, color: Colors.black)),
                suffixIcon: IconButton(
                  icon: Icon(Icons.done),
                  splashColor: Colors.blue,
                  tooltip: "Submit your name",
                  onPressed: click,
                )),
          )),
    );
  }
}
