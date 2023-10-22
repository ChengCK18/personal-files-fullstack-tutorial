package main

import "fmt"

//// golang pointer 101
// func main() {
// 	x := 7
// 	y := &x

// 	fmt.Println(x) //7
// 	*y = 10
// 	fmt.Println(x) // 10
// 	fmt.Println(*y) // gibberish address

// }

//// golang pointer 101
// func changeValue(str *string) {
// 	*str = "changed!"
// }

// func changeValue2(str string) {
// 	str = "changed2!"
// }

// func main() {
// 	toChange := "hello"
// 	fmt.Println(toChange) //hello
// 	changeValue(&toChange)
// 	fmt.Println(toChange) //changed!
// 	changeValue2(toChange)
// 	fmt.Println(toChange) //changed!

// }

func main() {
	toChange := "hello"
	var pointer *string = &toChange
	fmt.Println(pointer)  // giberrish address
	fmt.Println(*pointer) // hello
}
