# Tasks

Abbreviations  
Q - Question  
A - Answer  
A-Short - Short Answer  
A-Long - Long&Full Answer  

#### [1](#1),[2](#2),[3](#3),[4](#4),[5](#5),[6](#6),[7](#7),[8](#8),[9](#9),[10](#10)
<a name="1"></a>
1. Q: Find the maximum value of the function f(x) = ln ln sin(x).  
A: This task can be solved in two ways, 
Mathematical and Analytical may be more, but I will write only these two.  
Analytical -  
	a. ln pos: ln x -> &infin; if x->&infin;  
	b. ln zero: ln x -> -&infin; if x->0  
	c. ln neg: ln x -> complex number if x < 0  
	d. So it means - ln ln sin(x) -> max, if (ln sin(x)) -> max, if sin(x)-> max; if x=Pi/2  
	e. ln sin(Pi/2) -> ln 1 -> 0  
	f. ln ln sin(x) -> ln ln sin(Pi/2) -> ln ln 1 ->  ln 0 -> -&infin;  
	g. If we take x in 0<x<Pi/2 - ln ln sin(x) -> ln ln sin(0<x<Pi/2) -> ln ln ```[0..1)``` ->  ln (-&infin..0) -> -&infin;  
	
	So, f(x) - it has no max :)))  
	But, we can try to find the answer in complex spaces, I am joking :D Don't do that :D  
	
	Mathematical -  
	1. We have to find f'(x)  
	2. Then find x01, x02... for f'(x)=0  
	3. Then find signs +--+ - of f'(x01), f'(x02), ...   
	4. The answer is the same :D  
	
	f(x) - it has no max :)))
<a name="2"></a>
2. Q: What is algorithm complexity?  
A-Short: O(f(n)) or Θ(f(n)  
A-Long: This is Big O function, or it is sometimes denoted by Θ.  
Ideally, the complexity of the algorithm is equal to the time 
complexity is the computational complexity that describes the 
amount of time it takes to run an algorithm.  
But how to count it???   
In reality, it depends on the input data and the processing algorithm,
also it depends on the processor architecture, the quality of transistors 
in the Logic gate, Arithmetic logic units (ALUs) and what algorithms are 
implemented in them.  
Therefore, Asymptotic analysis is mainly used. 
In fact, we define the upper bound (and lower if necessary) 
of the complexity of the algorithm using the function big O and complexity classes.
Complexity classes are typically O(n), (n log n), O(n<sup>&alpha;</sup>), O(2<sub>n</sub>), etc., where n is the input size in units of bits needed 
to represent the input.
<a name="3"></a>
3. Q: How to check if three vectors are coplanar?  
A: The three vectors are coplanar if their scalar triple product 
is zero - (a,b,c)=a &middot; (b x c)=0. Also if at least one of the three vectors 
is zero, then the three vectors are also considered coplanar.
<a name="4"></a>
4. Q: How do you detect a loop in a singly linked list?  
	A: This problem can be solved in different ways :) And everyone has their own charm :)  
	a. Cell address or Hash Table - Save the address to the list and check  
	If NULL is reached then return false   
	If next of current node points to any of the previously stored nodes in List then return true.  
	b. Mark the Nodes -  add visited flag in node structure.  
	Mark until NULL - return false  
	Mark until Marked node - return true  
	c. Tortoise and Hare - Floyd’s Algorithm - first eats pasta, second runs fast :)))  
	d. There are many more algorithms, mine and not mine, whose name I do not know :D  
<a name="5"></a>
5. Q: What is the geometrical sense of the curve’s curvature? 
What information is needed to compute the curvature of a curve?  
A: Joke from our teacher of Math Analysis - "A straight line is a curve whose coefficient of curvature is equal to 0." :D  
It is neither simple question nor difficult - it is a part of Math Analysis :D  
A-Short:
In this question we have to use curve like trajectory of point. 
The curvature at a point measures how sharply the curve bends or how 
quickly it changes direction.
So we can use terms of arc-length parametrization. 
Every differentiable curve can be parameterized with respect to arc length.
Formally, the curvature measures how quickly the direction of T(s) changes with respect to a change in arc length s.  
K=||dT/ds||=||T'(s)||  
<a name="6"></a>
6. Q: Can you explain the difference between new and new[]? Is it possible
to delete memory using delete[] allocated within the new operator?  
A-Short:  
```new``` - It creates an instance - only one element in memory |instance-0x00013120|  
```new[n]``` - It will allocate memory like this: |n|instance1|instance2|...|  
```new``` must be used with ```delete```.  
```new[]``` must be used with ```delete[]```.  
Otherwise , according to the C ++ Standard, the behavior is not defined in this situation.  
It all depends on the compiler. But you can always write your own :D
<a name="7"></a>
7. Q: What will happen if an exception is thrown within a constructor?  
A: If a constructor throws an exception, the memory associated with the object itself is cleaned up — there is no memory leak.
<a name="8"></a>
8. Q: How do you create a virtual constructor and virtual destructor for a class? 
Why would you do this?  
A: We cannot create a virtual constructor - Bjarne Stroustrup :)
virtual destructor - we can do that...
`

		class Turtle{
		public:
			Turtle(){
				cout << "simple Turtle\n";
			}
			virtual ~Turtle(){
				cout << "~Turtle\n";
			}
		};
		
		class TeenageMutantNinjaTurtle: public Turtle{
			Pizza  somePizza;
		public:
			TeenageMutantNinjaTurtle(){
				cout << "Teenage Mutant Ninja Turtle\n";
			}
			~TeenageMutantNinjaTurtle(){
				cout << "~TeenageMutantNinjaTurtle\n";
			}
		};

		int main ()
		{
			Turtle * Michelangelo = new TeenageMutantNinjaTurtle();
			delete Michelangelo ;
			return 0;
		}
		/*
		if virtual ~Turtle() - it will del pizza
		Turtle::ctor()
		Pizza::ctor()
		TeenageMutantNinjaTurtle::ctor()
		TeenageMutantNinjaTurtle::dtor()
		Pizza::dtor()
		Turtle::dtor()

		if not virtual ~Turtle() - pizza will stay
		Turtle::ctor()
		Pizza::ctor()
		TeenageMutantNinjaTurtle::ctor()
		Turtle::dtor()
		*/`
	Destroying an object of a derived class through a pointer to a base class with a 
non-virtual destructor gives an undefined result. In practice, this is 
expressed in the fact that only part of the object corresponding to the 
base class will be destroyed.  
<a name="9"></a>
9. Q: Can you find an even number greater than 4, that is not a sum of two
prime numbers?  
A: Funny… So you want to win a million dollars from …
if I wrote you a proving of Goldbach Conjecture :D
Now, I want to see who write this tasks :D
<a name="10"></a>
10. Q: Does the following code have any issues?  
`
				
				// Returns the number of solutions of the equation ax + b =
				0; -1, if there is infinite number of solutions.
				int solve(double a, double b) {
					if (a != 0) {
						return 1;
					}
					if (b != 0) {
						return 0;
					}
					return -1;
				}`  
	A: In an ideal world, everything should work fine, but in the real world there can be 
	problems here a != 0 and b!= 0, with super small double... It is better to use some epsilon - std::numeric_limits<double>::epsilon()
	
That's all folks!  
![Alt Text](https://thumbs.gfycat.com/SecretImprobableIberianmole-size_restricted.gif)