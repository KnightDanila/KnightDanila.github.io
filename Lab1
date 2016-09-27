#include <iostream>

using namespace std;

void e1(){
	int N = 10;
	int pos = 0;
	int neg = 0;
	int a[11] = {0,
					1,2,3,4,-5,   6,-7,8,9,10
				};
	/*
		N = 9;
		int a[9] = {1,2,3,4,5,6,7,8,9};
	*/

	for(int i = 1; i <= N; i++){
		if(i <= N/2 &&){
			if(a[i]>0){
				pos++;
			}
		}
		else{
			if(a[i]<0){
				neg++;
			}
		}
	}

	printf("Pos = %i, Neg = %i\n", pos, neg);
}

void e1s(){
	int N = 10;
	int pos = 0;
	int neg = 0;
	int a[11] = {0,
					1,2,3,4,-5,   6,-7,8,9,10
				};
	/*
		N = 9;
		int a[9] = {1,2,3,4,5,6,7,8,9};
	*/
	for(int i = 1; i <= N; i++){
		if( i <= N/2 && a[i]>0 ){
			pos++;
		}
		else if(a[i]<0){
			neg++;
		}
	}

	printf("Pos = %i, Neg = %i\n", pos, neg);
}

void e2(){
	int N = 10;
	int pos = 0;
	int neg = 0;
	int a[11] = {0,
					1,2,3,4,-5,   6,-7,8,9,10
				};
	/*
		N = 9;
		int a[10] = {1,2,3,4,5,6,7,8,9};
	*/
	for(int i = 1; i <= N/2; i++){
		if(a[i]>0){
			pos++;
		}
		if(a[(i+N/2)]<0){
			neg++;
		}
	}

	printf("Pos = %i, Neg = %i\n", pos, neg);
}

int main(){

	e1();
	e2();

	system("pause");
}
