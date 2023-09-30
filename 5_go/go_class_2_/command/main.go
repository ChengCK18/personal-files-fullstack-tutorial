package main

import (
	"fmt"
	"hello"
	"os"
)
	



func main(){ //does not intake args by default, need to retrive from os package
	if(len(os.Args)>1){
		fmt.Println(hello.Greet(os.Args[1]))

	}else{
		fmt.Println(hello.Greet("World"))
	}
}