from mesa import Agent


class Cell(Agent):
    '''Represents a single ALIVE or DEAD cell in the simulation.'''

    WASTE = 0
    RECYCLE = 1

    def __init__(self, pos, model, init_state=WASTE):
        '''
        Create a cell, in the given state, at the given x, y position.
        '''
        super().__init__(pos, model)
        self.x, self.y = pos
        self.state = init_state
        self._nextState = None

    @property
    def isRecycled(self):
        return self.state == self.RECYCLE

    @property
    def neighbors(self):
        return self.model.grid.neighbor_iter((self.x, self.y), True)

    def step(self):
        '''
        Compute if the cell will be dead or alive at the next tick.  This is
        based on the number of alive or dead neighbors.  The state is not
        changed here, but is just computed and stored in self._nextState,
        because our current state may still be necessary for our neighbors
        to calculate their next state.
        '''

        # Get the neighbors and apply the rules on whether to be alive or dead
        # at the next tick.
        Recycle_neighbors = sum(neighbor.isRecycled for neighbor in self.neighbors)

        # Assume nextState is unchanged, unless changed below.
        self._nextState = self.state
        if self.isRecycled:
            if Recycle_neighbors < 1 or Recycle_neighbors > 5:
                self._nextState = self.WASTE
        else:
            if Recycle_neighbors == 3:
                self._nextState = self.RECYCLE

    def advance(self):
        '''
        Set the state to the new computed state -- computed in step().
        '''
        self.state = self._nextState
