package main

import (
	"fmt"
	// "net/http"
	// "github.com/gorilla/mux"
	// "util" //need to include the main package path as well
	"go_pkg_and_module/test/util"
)

func main(){
	greeting := fmt.Sprintf("Helooooo")
	fmt.Println(greeting)
	fmt.Println("Length of greeting is ",util.StringLength(greeting))
	fmt.Println(util.GetGreeting())
	// fmt.Println(util.greeting) // greeting variable is only visible within the scope of util package
	
	
	
	
	
	// r := mux.NewRouter()
	// http.ListenAndServe(":9000",r)
}
	