package main

import "fmt"

func main() {
	// "cars":12
	var mp map[string]int = map[string]int{
		"apple":  5,
		"orange": 2,
		"grapes": 1,
	}
	// mp2 := make(map[string]int) // another way to declare a map

	mp["apple"] = 222
	mp["waaaa"] = 22222
	delete(mp, "apple")

	val, exist := mp["apple"]
	// val will default value if does not exist
	// exist will be false, indicating this key does not exist

	fmt.Println("val => ", val, " exist=> ", exist)
	fmt.Println(mp)
}
