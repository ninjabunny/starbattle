import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import RefreshIcon from '@material-ui/icons/Refresh'
import Modal from '@material-ui/core/Modal'
import InfoIcon from '@material-ui/icons/Info'
import LayersIcon from '@material-ui/icons/Layers'
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
    const LEVEL = 10
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
  checker = () => {
    const { tracker, grid, level } = this.state
    // check if there are >= LEVEL starred

    let stars = 0
    tracker.forEach(
      row =>
        row.forEach(col => {
          if (col === 'starred') {
            stars++
          }
        }),
      0,
    )
    // console.log(stars)
    // check each row
    const rowCheck = !tracker
      .map(row => row.filter(col => col === 'starred'))
      .map(row => row.length === 1)
      .includes(false)

    // check each column
    const colCheck = !tracker
      .map((row, i) => row.map((col, j) => tracker[j][i] === 'starred'))
      .map(row => row.filter(col => col))
      .map(row => row.length === 1)
      .includes(false)

    // check each area
    let areaCheck = Array(level).fill(0)
    grid.forEach((row, z) => {
      grid.forEach((row, i) =>
        row.forEach((col, j) => {
          if (grid[i][j] === z && tracker[i][j] === 'starred') {
            areaCheck[z] = areaCheck[z] + 1
          }
        }),
      )
    })
    areaCheck = areaCheck.filter(area => area === 1).length === level

    // check proximity
    const checkProximity = tracker => {
      // get all cords of stars
      const stars = []
      tracker.forEach((row, i) =>
        row.forEach((col, j) => {
          if (col === 'starred') {
            stars.push([i, j])
          }
        }),
      )

      // check if they are in prox of each other
      let isProx = true
      stars.forEach(pos => {
        // get all prox for pos
        const prox = []
        prox.push([pos[0] - 1, pos[1]])
        prox.push([pos[0] - 1, pos[1] - 1])
        prox.push([pos[0], pos[1] - 1])
        prox.push([pos[0] + 1, pos[1] - 1])
        prox.push([pos[0] + 1, pos[1]])
        prox.push([pos[0] + 1, pos[1] + 1])
        prox.push([pos[0], pos[1] + 1])
        prox.push([pos[0] - 1, pos[1] + 1])
        console.log('stars', stars, 'prox', prox)

        prox.forEach(pos => {
          return stars.forEach(star => {
            if (JSON.stringify(pos) === JSON.stringify(star)) {
              isProx = false
            }
          })
        })
      })
      return isProx
    }
    console.log(rowCheck && colCheck && areaCheck && checkProximity(tracker))
    if (rowCheck && colCheck && areaCheck && checkProximity(tracker)) {
      alert('you win!')
    }
  }
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
    this.checker()
  }

  resetTracker = () =>
    this.setState({
      tracker: [
        ...Array(this.state.level)
          .fill(1)
          .map(item => Array(this.state.level).fill('blank')),
      ],
    })

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
            label='Level 1'
            icon={<LayersIcon />}
            onClick={() => {}}
          />{' '}
          <BottomNavigationAction
            label='Reset'
            icon={<RefreshIcon />}
            onClick={this.resetTracker}
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
