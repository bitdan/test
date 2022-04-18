package main

func main() {

}

func sum[k comparable, v int64 | float64](m map[k]v) v {
	var s v
	for _, v := range m {
		s += v
	}
	return s

}
