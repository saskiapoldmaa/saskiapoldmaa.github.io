Dobble & Maths
---

In a game of Dobble, there are no more than two common pictures on any two cards. There are 55 cards in a pack, and the game features 50 different pictures.

How many pictures are on one card? Is this the upper or lower bound?

We can find the total number of picture pairs from two points of view:

First, we can combine 55 cards into $\\binom {55}2=\\frac{55\\cdot 54}{2}$ pairs.
At the same time, we can find this no. of pairs by considering the pictures themselves. If there are x pictures on a card, then the same picture will appear on $\\frac{55\\cdot x}{50}$ cards.
Hence, we can combine a single piture into $$\\frac{\\frac{55x}{2\\cdot 50}\\left(\\frac{55x}{50}-1\\right)}{2}$$ pairs, where the 2 in the denominator helps us to not count the same pair twice. The total number of pairs is just the previous expression, multiplied by the no. of pictures.
$$\\frac{55\cdot 54{2}=50\\frac{55x}{2 \\cdot 50}\\left(\\frac{55x}{50}-1\\right)$$
From which 
