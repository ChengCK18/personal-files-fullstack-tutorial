// package main

// import (
// 	"fmt"
// 	"math"
// )

// // circle and rect DOES NOT implements shape interface
// // MISSING area2() implementation for both
// type shape2 interface {
// 	area() float64
// 	area2() float64
// }

// // circle and rect implements shape interface
// // any struct that has area() that return float64 is type shape
// type shape interface {
// 	area() float64
// }

// type circle struct {
// 	radius float64
// }

// type rect struct {
// 	width  float64
// 	height float64
// }

// func (r rect) area() float64 {
// 	return r.width * r.height
// }

// func (c circle) area() float64 {
// 	return math.Pi * c.radius * c.radius
// }

// func getArea(s shape) float64 {
// 	return s.area()
// }

// func main() {
// 	c1 := circle{4.5}
// 	r1 := rect{5, 7}
// 	//only can use func defined in interface, like an abstraction
// 	shapes := []shape{c1, r1}

// 	for _, shape := range shapes {
// 		fmt.Println(shape.area())
// 		fmt.Println(getArea(shape))
// 		// fmt.Println(shape.radius) //INVALID, NOT IN INTERFACE
// 	}
// }

// // Pointer based func
package main

import (
	"fmt"
	"math"
)

// circle and rect DOES NOT implements shape interface
// MISSING area2() implementation for both
type shape2 interface {
	area() float64
	area2() float64
}

// circle and rect implements shape interface
// any struct that has area() that return float64 is type shape
type shape interface {
	area() float64
}

// circle and rect implements shape3 interface as well
type shape3 interface {
	area() float64
}

type circle struct {
	radius float64
}

type rect struct {
	width  float64
	height float64
}

func (r *rect) area() float64 {
	return r.width * r.height
}

func (c *circle) area() float64 {
	return math.Pi * c.radius * c.radius
}

func getArea(s shape) float64 {
	return s.area()
}

func main() {
	c1 := circle{4.5}
	r1 := rect{5, 7}
	//only can use func defined in interface, like an abstraction
	shapes := []shape{&c1, &r1}

	for _, shape := range shapes {
		fmt.Println(shape.area())
		fmt.Println(getArea(shape))
		// fmt.Println(shape.radius) //INVALID, NOT IN INTERFACE
	}
}
