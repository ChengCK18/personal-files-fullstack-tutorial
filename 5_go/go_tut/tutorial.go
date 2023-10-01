/////////////////TYPES////////////////////
// package main

// import "fmt"

// func main() {

// 	// var test uint //default to 32/64 depending on machine
// 	// var test float64
// 	// var test complex64 // for imaginary part
// 	// var number uint8 = 5
// 	// fmt.Println("Heyyy ", number)

// 	// var number = 52.3 //implicit
// 	// fmt.Printf("%T", number) // print type

// 	// number := "dadadad"      //implicit and omit 'var' (expression assignment operator)
// 	// fmt.Printf("%T", number) // print type

// 	var number uint64 //unassigned would be assign to type's default value. 0 for uint
// 	var bl bool       //default false
// 	fmt.Println(number)
// 	fmt.Println(bl)

// }

/////////////////FMT////////////////////

// package main

// func main() {
// 	/*
// 		%v - default format of val
// 		%T - type of var
// 		%% - print % symbol

// 		%t - bool true/false

// 		%b - int base 2
// 		%o - int base 8
// 		%d - int base 10
// 		%x - int base 16

// 		floating point
// 		%e - scientific notation
// 		%f - decimal no exponent
// 		%g - large exponent

// 		string
// 		%s - default string
// 		%q - double quoted string

// 		width(whole num) and percision(trailing decimals)
// 		%f - default width and precision
// 		%9f - width 9, default precision
// 		%.2f - default width, 2 precision
// 		%9.2f - width 9, 2 precision
// 		%9.f - width 9, 0 precision

// 		padding
// 		%09d - pads digit to length 9 with preceding 0's
// 		%-4d - pads with spaces (width 4, left justified)

// 	*/

// 	// fmt.Printf("test %T %v", 10, 10)                 // printf to directly output to terminal
// 	// var x string = fmt.Sprintf("test %T %v", 10, 10) // sprintf to store as var

// 	// fmt.Printf("%t \n", "hey" == "hey")
// 	// fmt.Printf("%b \n", 155)
// 	// fmt.Printf("%o \n", 155)
// 	// fmt.Printf("%d \n", 155)
// 	// fmt.Printf("%x \n", 155)
// 	// fmt.Printf("%X \n", 155) // hex letter in caps

// 	// fmt.Printf("%e \n", 2.34342424777) //2.343424e+00
// 	// fmt.Printf("%f \n", 2.34342424777) //2.343424
// 	// fmt.Printf("%g \n", 2.34342424777) //2.34342424777

// 	// fmt.Printf("%s \n", "heyo") //heyo
// 	// fmt.Printf("%q \n", "heyo") //"heyo"

// 	// fmt.Printf("kahhh %-9q heee\n", "heyo")          //kahhh "heyo"    heee
// 	// fmt.Printf("kahhh %9q heee\n", "heyo")           //kahhh    "heyo" heee
// 	// fmt.Printf("kahhh %.2f heee\n", 3.2452424247777) //kahhh 3.25 heee
// 	// fmt.Printf("kahhh %.f heee\n", 3.2452424247777)  //kahhh 3 heee

// 	// fmt.Printf("%09d\n", 45) //000000045

// }

package main

/////////////////User input////////////////////
