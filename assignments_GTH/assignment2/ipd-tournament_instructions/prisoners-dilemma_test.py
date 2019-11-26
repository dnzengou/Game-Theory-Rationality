import random
def ipd_start():
    print("Welcome to Prisoner's Dilemma. \n If you don't know what Game Theory is, you're in the wrong place. \n \n Enter Collude to collude, or Betray to betray.")
    round_one()

def round_one():
    answer=(input("You and a buddy got caught commiting a crime. Do you keep quiet, or rat on your best friend? \n "))
    a = ["Collude", "Betray"]
    G = random.choice(a)
    print("You chose " + answer + ", and your partner chose " + G + ". ")
    if all(G == "Collude" and answer==("Collude")):
        both_free()
    if all(G == 'Collude' and answer==('Betray')):
        you_free()
    if all(G == 'Betray' and answer=='Betray'):
        both_jail
    if all(G == 'Betray' and answer=='Collude'):
        you_jail