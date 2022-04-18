package main

import "fmt"

func maxConsecutiveAnswers(answerKey string, k int) (ans int) {
	return max(maxConsecutiveChar(answerKey, k, 'T'), maxConsecutiveChar(answerKey, k, 'F'))
}

func maxConsecutiveChar(answerKey string, k int, ch byte) (ans int) {
	l, sum := 0, 0
	for right := range answerKey {
		if answerKey[right] == ch {
			sum++

		}
		for sum > k {
			if answerKey[l] == ch {
				sum--

			}
			l++
		}
		ans = max(ans, right-l+1)

	}
	return
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}
func main() {
	var answerKey string = "TFFT"
	var k int = 1
	var tmp int
	tmp = maxConsecutiveAnswers(answerKey, k)
	fmt.Println(tmp)
}
