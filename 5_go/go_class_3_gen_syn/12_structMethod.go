package main

import "fmt"

type Student struct {
	name   string
	grades []int
	age    int
}

func (s Student) getAge() int {
	return s.age
}

func (s *Student) setAge(age int) {
	s.age = age
}

func (s Student) getAverageGrade() float32 {
	sum := 0
	for _, v := range s.grades {
		sum += v
	}
	return float32(sum) / float32(len(s.grades))
}

func (s Student) getMaxGrade() int {
	curMax := 0

	for _, v := range s.grades {
		if v > curMax {
			curMax = v
		}
	}
	return curMax
}

func main() {
	s1 := Student{"Time", []int{70, 90, 80, 55}, 19}

	fmt.Println(s1.getAge())          //19
	s1.setAge(18)                     //need pointer as arg
	fmt.Println(s1.getAge())          //18
	fmt.Println(s1.getAverageGrade()) //73.75
	fmt.Println(s1.getMaxGrade())     //90

}
