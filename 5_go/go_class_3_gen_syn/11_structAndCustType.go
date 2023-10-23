package main

import "fmt"

// type Point struct {
// 	x int32
// 	y int32
// }

// func changeX(pt *Point) {
// 	pt.x = 555

// }

// func changeXNotPt(pt Point) {
// 	pt.x = 555

// }

// func main() {
// 	//p1  := Point{1, 2}
// 	// var p1 Point = Point{1, 2}
// 	// var p2 Point = Point{-5, 7}

// 	// fmt.Println(p1.x) // 1
// 	// fmt.Println(p2.x) // -5
// 	// p1.x = 55
// 	// fmt.Println(p1.x) // 55

// 	// p3 := Point{x: 3}
// 	// fmt.Println(p3) // {3,0} zero cuz default int

// 	///// Pointer
// 	p4 := &Point{y: 3} //a pointer to an Point object
// 	fmt.Println(p4)    // &{0 3}
// 	changeX(p4)        // pass by reference, not value
// 	fmt.Println(p4)    //&{555 3}
// 	p4.x = 2000        //valid, no need dereference for struct
// 	fmt.Println(p4)    //&{2000 3}

// 	p5 := Point{y: 3}
// 	fmt.Println(p5)  // {0 3}
// 	changeXNotPt(p5) // pass by value, not reference
// 	fmt.Println(p5)  //{0 3}

// }

/////////  a type within another type

// type Point struct {
// 	x int32
// 	y int32
// }

// type Circle struct {
// 	radius float64
// 	center *Point
// }

// func main() {
// 	c1 := Circle{4.56, &Point{4, 5}}
// 	fmt.Println(c1)         //{4.56 0xc0000120d0}
// 	fmt.Println(c1.center)  // &{4 5}
// 	fmt.Println(*c1.center) // {4 5}
// }

type Point struct {
	x int32
	y int32
}

type Circle struct {
	radius float64
	*Point //Omitting the variable name if you wish to and access as below
}

func main() {
	c1 := Circle{4.56, &Point{4, 5}}
	fmt.Println(c1.x)      // 4
	fmt.Println(c1.y)      // 5
	fmt.Println(c1.radius) // 4.56
}
