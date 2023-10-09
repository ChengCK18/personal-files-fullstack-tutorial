package main

import "fmt"

func testFn() {
	fmt.Println("hey")
}

func testFnPara(x int) {
	fmt.Println(x)
}

// x and y defined as int
func add(x, y int) (int, int) {
	return x + y, x + y + 12
}

// defined return var
func add2(x, y int) (z1, z2 int) {
	defer fmt.Println("Runs right before func ends, like useEffect cleanup in react ;D")

	z1 = x + y
	z2 = x + y + 12
	return //automatically return z1 and z2
}

func main() {
	testFn()
	testFnPara(12)

	ans1, ans2 := add(61, 7)
	fmt.Println(ans1, ans2)

	ans3, ans4 := add2(61, 7)
	fmt.Println(ans3, ans4)
}
