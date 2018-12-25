import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import RefreshIcon from '@material-ui/icons/Refresh'
import Modal from '@material-ui/core/Modal'
import InfoIcon from '@material-ui/icons/Info'
import getGrid from './gridUtils'
import './App.css'

const colors = [
  '#f9e79f',
  '#a9dfbf',
  '#a3e4d7',
  '#a9cce3',
  '#d7bde2',
  '#e6b0aa',
  '#edbb99',
  '#fad7a0',
  '#a2d9ce',
  '#aed6f1',
  '#d2b4de',
  '#f5b7b1',
]

class App extends Component {
  constructor(props) {
    super(props)
    const LEVEL = 9
    this.state = {
      level: LEVEL,
      modalOpen: false,
      grid: getGrid(LEVEL),
    }
  }

  toggleModal = () => this.setState({ modalOpen: !this.state.modalOpen })

  render() {
    const { grid } = this.state
    console.log('grid', grid)
    return (
      <div className='App'>
        <AppBar className='appBar' position='static'>
          <Toolbar>
            <Typography variant='h6' color='inherit'>
              ★ Star Battle
            </Typography>
          </Toolbar>
        </AppBar>
        <div
          style={{
            display: 'block',
            display: 'flex',
            flexWrap: 'wrap',
            padding: '15px',
            justifyContent: 'center',
          }}
        >
          {grid.map((row, i) =>
            row.map((col, j) => (
              <div
                style={{
                  background: colors[grid[i][j]],
                  width: `${85 / this.state.level}vw`,
                  height: `${85 / this.state.level}vw`,
                  margin: '1px',
                }}
              />
            )),
          )}
        </div>
        <BottomNavigation className='navbar' showLabels>
          <BottomNavigationAction
            label='About'
            icon={<InfoIcon />}
            onClick={this.toggleModal}
          />
          <BottomNavigationAction
            label='Points'
            icon={<InfoIcon />}
            onClick={() => {}}
          />{' '}
          <BottomNavigationAction
            label='Reset'
            icon={<RefreshIcon />}
            onClick={() => {}}
          />
        </BottomNavigation>
        <Modal
          aria-labelledby='simple-modal-title'
          aria-describedby='simple-modal-description'
          open={this.state.modalOpen}
          onClose={this.toggleModal}
        >
          <div className='modal'>hi this is modal </div>
        </Modal>
      </div>
    )
  }
}

export default App
