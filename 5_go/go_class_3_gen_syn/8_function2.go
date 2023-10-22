/////////////////////////// func 101, func as a variable
// package main
// import (
// 	"fmt"
// )

// func test(x int) {
// 	fmt.Println("Hello", x)
// }

// func main() {
// 	x := test
// 	x(5)

// 	k := func(x int) {
// 		fmt.Println("hello from k", x)
// 	}
// 	k(5)

// 	multiplyByTwo := func(userNum int) int {
// 		return userNum * 2
// 	}(8)

// 	fmt.Println(multiplyByTwo)

// }

//////////////////////// passing funcs ///////
// package main

// import (
// 	"fmt"
// )

// func test2(myFunc func(int) int) {
// 	fmt.Println(myFunc(8))
// }

// func main() {
// 	testFunc := func(x int) int {
// 		return x * -1
// 	}

// 	testFunc2 := func(x int) int {
// 		return x * 8
// 	}

// 	test2(testFunc)
// 	test2(testFunc2)

// 	func() {
// 		fmt.Println("Immediately call")
// 	}()
// }

//just to demo returning func
// package main

// import (
// 	"fmt"
// )

// func returnFunc(x string) func() {
// 	return func() { fmt.Println(x) }
// }

// func main() {
// 	returnFunc("heyyy")() //just to demo returning func
// }
