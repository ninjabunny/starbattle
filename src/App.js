import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import RefreshIcon from '@material-ui/icons/Refresh'
import Modal from '@material-ui/core/Modal'
import InfoIcon from '@material-ui/icons/Info'
import StarsIcon from '@material-ui/icons/Stars'
import ClearIcon from '@material-ui/icons/Clear'
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

const cellState = {
  blank: '',
  marked: <ClearIcon style={{ height: '80%', width: '80%', opacity: '0.3' }} />,
  starred: <StarsIcon style={{ height: '80%', width: '80%' }} />,
}
class App extends Component {
  constructor(props) {
    super(props)
    const LEVEL = 9
    const tracker = [
      ...Array(LEVEL)
        .fill(1)
        .map(item => Array(LEVEL).fill('blank')),
    ]
    this.state = {
      tracker,
      level: LEVEL,
      modalOpen: false,
      grid: getGrid(LEVEL),
    }
  }

  toggleModal = () => this.setState({ modalOpen: !this.state.modalOpen })

  updateTracker = (i, j) => () => {
    const { tracker } = this.state
    const newTracker = [...tracker]
    const current = tracker[i][j]
    if (current === 'blank') {
      newTracker[i][j] = 'marked'
    }
    if (current === 'marked') {
      newTracker[i][j] = 'starred'
    }
    if (current === 'starred') {
      newTracker[i][j] = 'blank'
    }
    this.setState({ tracker: newTracker })
  }

  render() {
    const { grid, level, tracker } = this.state
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
            padding: '20px 5px 5px 0',
            justifyContent: 'center',
          }}
        >
          {grid.map((row, i) =>
            row.map((col, j) => (
              <div
                style={{
                  background: colors[col],
                  width: `${90 / level}vw`,
                  height: `${90 / level}vw`,
                  margin: '1px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onClick={this.updateTracker(i, j)}
              >
                {cellState[tracker[i][j]]}
              </div>
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
