package main

import (
	"bufio"
	"fmt"
	"io"
	"os"
)

func CopyFile(dstname, srcName string) (written int64, err error) {
	src, err := os.Open(srcName)
	if err != nil {
		return
	}
	defer src.Close()
	dst, err := os.Create(dstname)
	if err != nil {
		return
	}
	defer dst.Close()
	return io.Copy(dst, src)
}
func main() {
	inputFile, inputError := os.Open("input.dat")
	if inputError != nil {
		fmt.Printf("An error occurred on opening the inputfile\n" +
			"Does the file exist?\n" +
			"Have you got acces to it?\n")
		return // exit the function on error
	}
	defer inputFile.Close()

	inputReader := bufio.NewReader(inputFile)
	for {
		inputString, readerError := inputReader.ReadString('\n')
		fmt.Printf("The input was: %s", inputString)
		if readerError == io.EOF {
			return
		}
	}
	CopyFile("4_cpoy.go", "4.go")
	fmt.Println("copy done")
}
