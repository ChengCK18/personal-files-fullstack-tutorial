package hello 


import "testing"



func TestGreet(t *testing.T){ // no return, if test fail, call t func to stop
	want := "Hello, test"
	got:= Greet("test")

	if want != got{
		t.Errorf("wanted %s, got %s", want, got)
	}
}