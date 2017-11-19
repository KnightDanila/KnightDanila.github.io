/*****************************************************************************

		Copyright (c) My Company

 Project:  CMD
 FileName: CMD.PRO
 Purpose: No description
 Written by: Visual Prolog
 Comments:
 
 1. Search in DB
 2. Add to DB
 3. Method Deextri
 4. Ready System
..........................................................................................
.........................................................:^obo*:..........................
.......................................................^xxxxxxxOxo*:......................
......................................................oxxbxX#@@@#WXOo:....................
.....................................................^bobb#&&&&&&&&$#Xo:..................
...XxBobBbOoOOxOxoBoxBbOOoOOBOXbXoXObOxXOxbboxOObOOxOxo^bO&&$$$$$$$$&&$B^::*******........
...XbXxxBb*BOOxXboBxxOO*XxOOOXWXOxOb:XOOOxxxxOXXxOWBBb*_bO&&o::::::_*O$&Oo*_:::::O........
...X#:...#_B...^OW:...WXb.....*@...W^X.._.....O*..OO#x*_^x&@:..:^_..._Xx:..:o:..:x........
...XW:...#Ox...^xB....WOb......o*..##b..o.....x*..XBWx*_:bWX...:xo...*x..._O^...o^........
...XW:...O@_...^OB....xXb..bb......BW^..O..:^^B*..X*oxb:::b^...ob*...b*...bb:...O.........
...XW:...^$....^#X....^$b..b#o.....xW_._X..*BB#*..O::Bb_::o:...xx....O:...Ob..._x.........
...XW:..._W....^&b...._&b..bxx..:..^$..*X..*bo#*..O:.*bb..b..._Oo...*b...*xbooox*.........
...XW:....b....^&^.:*..$b..b@^..b.._B..xX..*BB#*..O:..Bbo.*...ob_...b*...bobbbbb:.........
...OW:.........^&..^x..#b..^*...#_..O..BX.....x*..X:..Wbx^....xx....O....Ob___^BX.........
...OW:.........^@..bB..Bb......b$b..*..@X.....O*..X*..X^bx^.._xo...*b...*x^...o@&o........
...OW:._^...^..oW..X@..bb.....*@^O.....$X..*BOW*..X*..X.oo^_.ox*...b*...bx_...O&&#o.......
...xW:.:O...O..ox..#$:.ox..o*..XOB....*@X..*x:X*..O_:^X.^_...xx...:O:..:Ob..._W$&$b_......
...xW:..W..:W..o^..::..:b..bX..X*B....oWX..*@XX*..XW#bX.o...*O^...oo...ox_...x$$boo_......
...OW:..&:.^W..o*......:x..b$.._BW*...O^X...::X*...::WX:o...:...:bO^o..:...:x@&&@^.::.....
...W@:..&^.OW..:.._xx*..O..bBb..Wbo...B*X.....O*.....#X^o^^ooooxOo:._booobX#$&&&&O..:_....
...W$:..$O.#X.....bBxB..:..bXW..^Wx...W_O.....X*.....#B::::__*xbbxo:::*xOW$&&&&$B*..*.....
...X^#BBxOWbBBWWW##*bb#@B#WWxo#@#BxWWW**OWX###XWWW@W$OB.......:obxbxb_::_oOXXXXxboxo_.....
...oxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx*........._bbxbxx^*::_^obbobO*^.....
..................................................................*bxbxxOxbboobbOX*.......
...................................................................._oxxxxxOOOOOx*........
......................................................................._^bxOOOo*..........
..........................................................................................
..........................................................................................
..........................................................................................
******************************************************************************/

DOMAINS
/*
	comics Marvel DC
	ability
	type: human god mutant alien
	
	side:
	 1 - good
	 2 - not good enough
	 3 - neutral
	 4 - strange
	 5 - Bad
	hair color
	1 - black, 
	2 - brown, 
	3 - blond, 
	4 - red, 
	5 - white.
	6 - no hair
	age
	
	eyes color
*/
comics, heroName, heroName1, heroName2, alterEgo, ability, gender, type, firstAction = symbol.
height, side, weight, hairColor = integer.
weight1, weight2 = integer.
height1, height2 = integer.
DATABASE
hero(heroName, height, weight, gender, type, firstAction, side, hairColor).
heroAddon(comics, heroName, alterEgo, ability).
manOrWoman(symbol,symbol).
weight(symbol, integer, integer).
height(symbol, integer, integer).
catTree(integer, integer).
darkLord(integer, integer).
snowman(integer, integer).
testRes(integer, integer).
intToHairColor(integer, symbol).
intToSide(integer, symbol).
strToHairColor(symbol, integer).
strToSide(symbol, integer).

PREDICATES
nondeterm start.
nondeterm repeat.
nondeterm doaction(integer).
nondeterm showHero(comics, heroName, alterEgo, ability, height1, height2, weight1, weight2, gender, type, firstAction, side, hairColor).
/*THOR AGE 788*/
/*add Species	Human Mutant*/
/*
	You want DC -> Yes -> 
	No
	You want Marvel ->
	No -> Go away (Oh all)	
*/

CLAUSES
hero("Batman", 188, 95, "man", "human","Detective Comics #27 (May 1939)", 1, 1).
hero("Thor", 198, 105, "man", "god", "Journey into Mystery #83 (August 1962)", 1, 3).
hero("Superman", 190, 100, "man", "alien", "Action Comics #1(April 18, 1938)", 1, 1).
hero("Spider-Man", 178, 64, "man", "mutant", "as Peter Parker's Clone The Amazing Spider-Man #149 (October 1975)", 1, 2).
hero("Wonder Woman", 183, 60, "woman", "human", "All Star Comics #8 (Dec. 1941)", 1, 1).
hero("Wolverine", 176, 166, "man", "mutant", "Cameo: The Incredible Hulk #180 (Oct. 1974)", 2, 1).
hero("Green Lantern", 180, 82, "man", "human", "Green Lantern (vol. 3) #48 (January 1994)", 2, 2).
hero("Storm", 180, 58, "woman", "mutant", "Giant-Size X-Men #1(May 1975)", 1, 5).
hero("Deathstroke", 193, 102, "man", "human", "Slade Wilson as Deathstroke. Cover to Deathstroke (vol. 2) #8", 5, 5).
hero("Silver Surfer", 195, 92, "man", "alien", "The Silver Surfer #1 (Aug. 1968)", 4, 6).
hero("Supergirl", 171, 54, "woman", "alien", "Action Comics #252 (May 1959)", 1, 3).
hero("The Punisher", 180, 90, "man", "human", "Cover to The Punisher #1(1986)", 4, 1).
hero("Doctor Fate", 187, 90, "man", "human", "More Fun Comics #55 (May 1940)", 3, 3).
hero("Thing", 190, 200, "man", "mutant", "The Fantastic Four #1 (November 1961)", 1, 6).
hero("Catwoman", 175, 61, "woman", "human", "Gotham City", 2, 1).
hero("Rogue", 168, 54, "woman", "mutant", "Avengers Annual #10 (1981)", 2, 2).
hero("Atom Girl", 175, 61, "woman", "human", "Teen Titans/Legion Special #1 (2004)", 2, 1).
hero("Black Widow", 170, 59, "woman", "mutant", "Tales of Suspense #52 (April, 1964)", 2, 4).
hero("Deadpool", 188, 95, "man", "mutant", "New Mutants #98 (February, 1991)", 3, 2).
hero("Phoenix", 168, 52, "woman", "mutant", "X-Men #1 (September, 1963)", 2, 4).
hero("Banshee", 183, 77, "woman", "mutant", "X-Men #28 (January, 1967)", 2, 3).
hero("Gamora", 183, 77, "woman", "god", "Strange Tales #180 (June, 1975)", 2, 1).
hero("Goblin Queen", 183, 77, "woman", "mutant", "Uncanny X-Men #168", 5, 4).
hero("Hawkgirl", 175, 61, "woman", "mutant", "Uncanny X-Men #128", 1, 4).
hero("Quicksilver", 183, 79, "man", "mutant", "X-MEN Vol. 1 #4", 2, 5).
hero("John Constantine", 183, 89, "man", "human", "Swamp Thing Vol 2 #37 (June, 1985)", 2, 3).
hero("Shadow King", 185, 249, "man", "alien", "X-Men #117 (1979)", 2, 6).
hero("Siryn", 168, 52, "woman", "mutant", "Spider-Woman (first series) #37", 5, 4).
hero("Red Hood", 183, 81, "man", "human", "(as Jason Todd) Batman #357", 5, 4).
hero("Sportsmaster", 180, 90, "man", "human", "(as Jason Todd) Batman #177", 4, 1).
hero("General Zod", 190, 100, "man", "alien", "Action Comics #845", 5, 1).
heroAddon("DC Comics", "Batman", "Bruce Wayne",  "Master detective").
heroAddon("Marvel Comics", "Thor" ,"Thor Odinson", "Superhuman strength").
heroAddon("DC Comics", "Superman", "Clark Kent", "Superhuman strength").
heroAddon("Marvel Comics", "Spider-Man", "Benjamin 'Ben' Reilly", "Superhuman strength").
heroAddon("DC Comics", "Wonder Woman", "Princess Diana of Themyscira", "Superhuman strength").
heroAddon("Marvel Comics", "Wolverine", "James Howlett", "Regenerative healing factor").
heroAddon("DC Comics", "Green Lantern", "Kyle Rayner", "Green Lantern Corps Power Ring").
heroAddon("Marvel Comics", "Storm", "Ororo Munroe", "Weather manipulation").
heroAddon("DC Comics", "Deathstroke", "Slade Joseph Wilson", "Regenerative healing factor").
heroAddon("Marvel Comics", "Silver Surfer", "Norrin Radd", "Endowed with the Power Cosmic").
heroAddon("DC Comics", "Supergirl", "Kara Denvers", "Superhuman strength").
heroAddon("Marvel Comics", "The Punisher", "Franken-Castle", "Punisher").
heroAddon("DC Comics", "Doctor Fate", "Kent Nelson", "Mastery of magic").
heroAddon("Marvel Comics", "Thing", "Benjamin 'Ben' Grimm", "Superhuman strength").
heroAddon("DC Comics", "Catwoman", "Selina Kyle", "Superhuman strength").
heroAddon("Marvel Comics", "Rogue", "Anna Marie", "Mastery of magic").
heroAddon("DC Comics", "Atom Girl", "Salu Digby", "Superhuman strength").
heroAddon("Marvel Comics", "Deadpool", "Wade Wilson", "Superhuman strength").
heroAddon("Marvel Comics", "Black Widow", "Natalia Alianovna Romanova", "Mastery of magic").
heroAddon("Marvel Comics", "Phoenix", "Jean Grey-Summers", "Mastery of magic").
heroAddon("Marvel Comics", "Banshee", "Sean Cassidy", "Mastery of magic").
heroAddon("Marvel Comics", "Gamora", "Gamora Zen Whoberi Ben Titan", "Mastery of magic").
heroAddon("Marvel Comics", "Goblin Queen", "Madelyne Jennifer Pryor", "Mastery of magic").
heroAddon("Marvel Comics", "Hawkgirl", "Kendra Saunders", "Mastery of magic").
heroAddon("Marvel Comics", "Quicksilver", "Pietro Django Maximoff", "Superhuman strength").
heroAddon("DC Comics", "John Constantine", "John Constantine", "Superhuman strength").
heroAddon("Marvel Comics", "Shadow King", "Amahl Farouk", "Superhuman strength").
heroAddon("Marvel Comics", "Siryn", "Theresa Rourke Cassidy", "Superhuman strength").
heroAddon("DC Comics", "Red Hood", "Jason Todd", "Superhuman strength").
heroAddon("DC Comics", "Sportsmaster", "Lawrence Crock", "Superhuman strength").
heroAddon("DC Comics", "General Zod", "Dru-Zod", "Superhuman strength").

manOrWoman(yes,"woman").
manOrWoman(no,"man").
weight(yes, 71, 10000).
weight(no, 0, 70).
height(yes, 160, 10000).
height(no, 0, 160).
/*min -2 max 1*/
catTree(1,1).
catTree(2,-1).
catTree(3,-2).
catTree(4,1).
/*min -2 max 2*/
darkLord(1, -1).
darkLord(2, 1).
darkLord(3, 2).
darkLord(4, -2).
/*min -2 max 2*/
snowman(1, 1).
snowman(2, 2).
snowman(3, -1).
snowman(4, -2).

testRes(-6, 5).
testRes(-5, 5).
testRes(-4, 5).
testRes(-3, 4).
testRes(-2, 4).
testRes(-1, 4).
testRes(0, 3).
testRes(1, 3).
testRes(2, 2).
testRes(3, 2).
testRes(4, 1).
testRes(5, 1).

intToHairColor(1, "black"). 
intToHairColor(2, "brown").
intToHairColor(3, "blond").
intToHairColor(4, "red").
intToHairColor(5, "white").
intToHairColor(6, "no hair").
intToSide(1, "Good").
intToSide(2, "Not good enough").
intToSide(3, "Neutral").
intToSide(4, "Strange").
intToSide(5, "Bad").

strToHairColor("black", 1). 
strToHairColor("brown", 2).
strToHairColor("blond", 3).
strToHairColor("red", 4).
strToHairColor("white", 5).
strToHairColor("no hair", 6).
strToSide("Good", 1).
strToSide("Not good enough", 2).
strToSide("Neutral", 3).
strToSide("Strange", 4).
strToSide("Bad", 5).


showHero(Comics, Name, Ego, Ab, H1, H2, W1, W2, Gen, T, FA, S, HC):-
                    hero(Name, H, W, Gen, T, FA, S, HC),
		    heroAddon(Comics, Name, Ego, Ab),
                    W1<W, W<W2, H1<H, H<H2,	
                    intToHairColor(HC, HCString),
                    intToSide(S, SString),
                    write("I think you are: "),nl,
                    write("Comics: ", Comics), nl,
                    write("Name: ", Name),nl,
                    write("Alter Ego: ", Ego), nl,
                    write("Ability: ", Ab), nl,
                    write("Height: ", H), nl,
                    write("Weight: ", W), nl,
                    write("Gender: ", Gen), nl,
                    write("Type: ", T), nl,
                    write("First Action: ", FA), nl,
                    write("Hair color: ", HCString), nl,
                    write("Side: ", SString), nl,
                    write("-----------------------------------------------"),nl,
                    start.
		    %fail.
                    
repeat.
repeat:-repeat.

start:-repeat,
          write("-----------------------------------------------"),nl,
          write("Please, choose option: "),nl,
          write("1 - view the base"), nl,
          write("2 - find a character"), nl,
          write("3 - add new character"), nl,
          write("4 - delete a character"), nl,
          write("5 - You are in Comics"), nl,
          write("0 - to exit"), nl,
          write("Your command: "),
          readint(X),
          doaction(X),
          nl.
doaction(1):- hero(Name, H, W, Gen, T, FA, S, HC),
	      heroAddon(CMCS, Name, Ego, Ab),
	      intToHairColor(HC, HCString),
              intToSide(S, SString),
		write(CMCS, " | ", Name, " | ", Ego, " | ", Ab, " | ", 
		 	H, "cm | ", W, "kg | ", Gen, " | ", T, " | ", 
		 	FA, " | ", HCString, " | ", SString
		      ), nl, 
			fail.
doaction(2):-
                    write("Comics: "), readln(Comics), nl,
                    write("Gender: "), readln(Gen), nl,
                    write("Type (human, mutant, alien, god): "), readln(Type), nl,
                    hero(Name, H, W, Gen, Type, FA, S, HC),nl,
                    heroAddon(Comics, Name, Ego, Ab),nl,
                    intToHairColor(HC, HCString),
                    intToSide(S, SString),
                    write("Name: ", Name), nl,
                    write("alterEgo: ", Ego), nl,
                    write("ability: ", Ab), nl,
                    write("height: ", H, "cm"), nl,
                    write("weight: ", W, "kg"), nl,
                    write("firstAction: ", FA), nl, 
                    write("Hair Color: ", HCString), nl,
                    write("Side: ", SString), nl,                    
                    fail.
doaction(3):-       
		    write("Please, write: "), nl,
                    write("Comics: "), readln(Comics),nl,
                    write("Name: "), readln(Name),nl,
                    write("AlterEgo: "), readln(Ego), nl,
                    write("Ability: "), readln(Ab), nl,
                    write("Height: "), readint(H), nl,
                    write("Weight: "), readint(W), nl,
                    write("Gender: "), readln(Gen), nl,
                    write("Type (human, mutant, alien, god): "), readln(T), nl,
                    write("First Action: "), readln(FA), nl,
                    write("Hair Color (black, brown, blond, red, white, no hair): "), readln(HCString), nl,
                    write("Side (Good, Not good enough, Neutral, Strange, Bad): "), readln(SString), nl,  
                    strToHairColor(HCString, HC),
                    strToSide(SString, S),
                    assertz(hero(Name, H, W, Gen, T, FA, S, HC)),
                    assertz(heroAddon(Comics, Name, Ego, Ab)),
                    fail.
doaction(4):-
                    write("Name: "), readln(Name), nl,
                    hero( Name, _, _, _, _, _, _, _),nl,
                    retract(hero(Name, _, _, _, _, _, _, _)),
                    fail,nl.

doaction(0):-write("Have a nice day! \n").
%//////////////////////// AAAAAAAAAAAAAA ///////////////////////////////
doaction(5):-
                    write("So, who are you in comics?\n"),
                    write("You are a woman?(yes/no): "),
                    readln(A),
                    manOrWoman(A, Gen), nl,
                    write("What hair color you like: "), nl,
                    write("1 - black as coal"), nl,
                    write("2 - brown"), nl,
                    write("3 - blond only"), nl,
                    write("4 - red like a fire"), nl,
  		    write("5 - white as snow"), nl,
  		    write("6 - no hair, i don`t like it, i am DIE HARD"), nl,
	            readint(HC),
	            write("Your weight more than 70 kg?(yes/no):"),
	            readln(B),
	            weight(B, W1, W2),
	            write("Your height more than 160 cm?(yes/no):"),
	            readln(C),
	            height(C, H1, H2),
	            
	            write("What would you do, if you saw a cat on a tree?"), nl,
	            write("1 - Try to remove him"), nl,
                    write("2 - Give him a wave"), nl,
                    write("3 - Shake the tree"), nl,
                    write("4 - Use your super power to remove him"), nl,
	            readint(Cat),
	            catTree(Cat,CatRes),
	            
	            write("Do you wanna be a Dark Lord?"), nl,
	            write("1 - Oh, Yes"), nl,
                    write("2 - No"), nl,
                    write("3 - I wanna be a Contemplator"), nl,
                    write("4 - I'm a Dark Lord, the original, the only"), nl,
	            readint(Lord),
	            darkLord(Lord,LordRes),
	            
	            write("Do you wanna build a snowman?"), nl,
	            write("1 - Yes"), nl,
                    write("2 - I know exactly what you are talking about"), nl,
                    write("3 - It is for children"), nl,
                    write("4 - I'm a Dark Lord, the original, the only"), nl,
	            readint(Snowman),
	            snowman(Snowman,SnowmanRes),
	            Www = CatRes+LordRes+SnowmanRes,
		    testRes(Www, S),            
	            
	            write("WWW: ", Www), nl,
	            write("S: ", S), nl,
	            
                    %showHero(_, _, _, Ab, H, W, Gen, T, FA, S, HC),
                    showHero(_, _, _, _, H1, H2, W1, W2, Gen, _, _, S, HC).
goal
write("Welcome! This is data base of 'Combat Marvel DC' - CMD"), nl,
%hero(A, B, C, D, E, F, G, H), nl,
start.
%hero.
