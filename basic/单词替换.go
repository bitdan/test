package main

import (
	"fmt"
	"strings"
)

func replaceWords(dictionary []string, sentence string) string {
	dictionarySet := map[string]bool{}
	for _, s := range dictionary {
		dictionarySet[s] = true
	}
	words := strings.Split(sentence, " ")
	for i, word := range words {
		for j := 1; j <= len(word); j++ {
			if dictionarySet[word[:j]] {
				words[i] = word[:j]
				break
			}
		}
	}
	return strings.Join(words, " ")
}

func main() {
	dictionary := []string{"cat", "bat", "rat"}
	sentence := "the cattle was rattled by the battery"
	rel := replaceWords(dictionary, sentence)
	fmt.Println(rel)
}
