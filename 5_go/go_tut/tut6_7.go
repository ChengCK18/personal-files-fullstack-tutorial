// package main

// import (
// 	"fmt"
// 	"math"
// )

// func main() {
// 	// var num1 float64 = 8
// 	// var num2 int = 4
// 	// answer := num1 - num2 // err: both need same type

// 	// var num1 float64 = 8
// 	// var num2 int = 4
// 	// answer := num1 - float64(num2) // var need to be of same types
// 	// fmt.Println(answer) //4

// 	// var num1 int = 9
// 	// var num2 int = 4
// 	// answer := num1 / num2 // var need to be of same types

// 	// fmt.Printf("%d", answer) //2, answer rounded off

// 	// var num1 float32 = 9
// 	// var num2 float32 = 4
// 	// answer := num1 / num2 // var need to be of same types

// 	// fmt.Printf("%g", answer) //2.25, answer rounded off

// 	// var num1 int = 9
// 	// var num2 int = 4
// 	// answer := num1 / num2       // var need to be of same types
// 	// num3 := math.Float64bits(2) //math package for more complex math ops

// 	// fmt.Printf("%d %d", num3, answer) //2, answer rounded off

// }

// package main

// import (
// 	"fmt"
// )

// func main() {
// 	x := 5
// 	y := 6.5

// 	fmt.Printf("%t", float64(x)+1.5 != y)

// }

package main

import (
	"fmt"
)

func main() {
	x := 5 < 7 && 2 > 1

	fmt.Printf("%t", x)

}
