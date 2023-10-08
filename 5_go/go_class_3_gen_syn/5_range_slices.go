package main

import "fmt"

func main() {
	var a []int = []int{1, 2, 7, 2, 8, 9, 10, 99, 9, 99}

	// for i := 0; i < len(a); i++ {
	// 	fmt.Println(a[i])
	// }

	// for i, element := range a { //like enumerate in Python
	// 	fmt.Println(i, "=>", element)
	// }

	// for _, element := range a { // _ will be ignored
	// 	fmt.Println("=>", element)
	// }

	for i, element := range a {
		for j := i + 1; j < len(a); j++ {
			element2 := a[j]
			if element == element2 {
				fmt.Println(element)
			}
		}
	}
}
