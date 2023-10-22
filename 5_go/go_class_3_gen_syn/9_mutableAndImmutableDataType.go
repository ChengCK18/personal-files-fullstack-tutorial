package main

import "fmt"

/// data types mutable and immutable behaviour
// func main() {
// 	/////// immutable int
// 	// var x int = 5
// 	// y := x
// 	// y = 7
// 	// fmt.Println(x, y) //5,7

// 	/////// mutable slice
// 	// var x []int = []int{3, 4, 5} // x points to the defined slice
// 	// y := x // x and y point at the same slice
// 	// y[0] = 100
// 	// fmt.Println(x, y) //[100 4 5] [100 4 5]

// 	/////// mutable map
// 	// var x map[string]int = map[string]int{"hello": 3} // x points to the defined map
// 	// y := x // x and y point at the same map
// 	// y["there"] = 100
// 	// x["you"] = 5
// 	// fmt.Println(x, y) //map[hello:3 there:100 you:5] map[hello:3 there:100 you:5]

// 	////// mutable array, diff behaviour than slice and map
// 	// var x [2]int = [2]int{3, 4}
// 	// y := x // makes a copy
// 	// y[0] = 100
// 	// fmt.Println(x, y) //[3 4] [100 4]

// }

func changeFirst(slice []int) {
	slice[0] = 1000
}

func main() {
	var x []int = []int{3, 4, 5}
	fmt.Println(x) //[3 4 5]
	changeFirst(x) //passing the pointer
	fmt.Println(x) //[1000 4 5]
}
