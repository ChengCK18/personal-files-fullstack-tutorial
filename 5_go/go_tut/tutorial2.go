/////////////////User input////////////////////

package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin) //get input from command line
	fmt.Printf("Type year: ")
	scanner.Scan() //will implicitly be string by default no matter what
	input, _ := strconv.ParseInt(scanner.Text(), 10, 64)
	fmt.Printf("You typed: %d", 2023-input)
}
