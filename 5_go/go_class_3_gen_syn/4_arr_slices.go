package main

import (
	"fmt"
)

func main() {
	/////////// array ///////////
	// var arr [5]string //default initialize "" for each
	// var arr2 [5]int   //default initialize 0 for each

	// sum := 0
	// arr2[2] = 12
	// fmt.Println(arr, arr2)
	// fmt.Println(len(arr))

	// for i := 0; i < len(arr2); i++ {
	// 	sum += arr2[i]
	// }
	// fmt.Println(sum)

	// var arr2d [2][2]int
	// fmt.Println(arr2d)

	/////////////// slices(portions of array) /////////////////
	//
	// length == length of the current size of slice
	// capacity == size from start of slice to end of arr
	// var x [5]int = [5]int{1, 2, 3, 4, 5}
	// var s []int = x[1:3] //no size defined means this is slice, not array
	// fmt.Println(s, cap(s), len(s))
	// fmt.Println(s[:cap(s)]) //extended based on original arr

	// it would create an array first then the slice based on
	// the create array, in this case slice is the whole array
	// var a []int = []int{5, 6, 7, 8, 9}
	// fmt.Println(a[:3], cap(a))
	// b := append(a, 10) //1st a slice,2nd a value, create a new slice with new added val
	// fmt.Println((b))

	// create slice with make command
	k := [5]int{1, 2, 3, 4, 5}
	a := make([]int, 5)
	fmt.Println((a))
	fmt.Printf("%T", a) // no num meaning slice
	fmt.Printf("%T", k) // with num, meaning array

}
