"""
author: matt venn

turtle program to demonstrate a cellular automaton called Rule 90.
http://en.wikipedia.org/wiki/Sierpi%C5%84ski_triangle

It draws patterns that have the appearance of the Sierpinski triangle
http://en.wikipedia.org/wiki/Sierpi%C5%84ski_triangle

Rules: If the current pattern is:      111 110 101 100 011 010 001 000
then the new state for center cell is:  0   1   0   1   1   0   1   0

Or, if either the above left or the above right cell is 1,
then the new cell will be 1.
"""

import turtle
import random

turtle.shape('triangle')
#make it point the right way, point upwards
turtle.right(30)
turtle.penup()
turtle.speed(0)

#get the height and width
w=turtle.window_width()
h=turtle.window_height()

#guessed these as the size of the triangle
x_size=9
y_size=18

#colunmns and rows
columns = int(w/x_size)
rows = int(h/y_size)

#current row and history
last=[]
this=[]

#initialize history and current row
for i in range(columns):
    this.append(0)
    if random.random() > 0.97:
        last.append(1)
    else:
        last.append(0)

#calculate and draw each row
for y in range(rows):
    #draw the last row
    for x in range(columns):
        turtle.goto(-w/2+x*x_size,h/2-y*y_size-y_size/2)
        if last[x]:
            turtle.stamp()

    #calculate this row
    for i in range(1,columns-1):
        #one above it to the left
        if last[i-1] == 1 and last[i+1] == 0:
            this[i] = 1
        #one above it to the right
        elif last[i-1] == 0 and last[i+1] == 1:
            this[i] = 1
        #otherwise the cell is blank
        else:
            this[i] = 0

    #copy the current row to the history
    for i in range(columns):
        last[i]=this[i]

turtle.done()
