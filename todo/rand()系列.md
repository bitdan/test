从上面一系列的分析可以发现，如果给你两个生成随机数的函数Randa和Randb， 你可以通过以下方式轻松构造Randab，生成1到a*b的随机数。

```java

Randab = b * (Randa - 1) + Randb
Randab = a * (Randb - 1) + Randa
```



```c++
// A > b
int Randb(){
    int x = ~(1<<31); // max int
    while(x > b*(A/b)) // b*(A/b)表示最接近A且小于A的b的倍数  为n的最大倍数，且满足t<m*m      
        x = RandA();
    return x%b + 1;
}
```





```C++
int rand3()
{
	int n = 5;
	// rand5 [1,2,3,4,5]
	while (n > 3)
	{
		n = rand5();
	}
	return n;
}

```

```C++
int Rand7()
{
	int x;
	do
	{
		x = Rand5() + (Rand5() - 1) * 5;  
	} while (x > 21)  // x取值  x< 5*5的最大7的倍数
		return x % 7 + 1;
}
```



