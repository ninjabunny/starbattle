import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import RefreshIcon from '@material-ui/icons/Refresh'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'
import InfoIcon from '@material-ui/icons/Info'
import LayersIcon from '@material-ui/icons/Layers'
import StarsIcon from '@material-ui/icons/Stars'
import ClearIcon from '@material-ui/icons/Clear'
import getGrid from './gridUtils'
import './App.css'

const colors = [
  'lightgrey',
  '#f9e79f',
  '#a9dfbf',
  '#a3e4d7',
  '#a9cce3',
  '#d7bde2',
  '#e6b0aa',
  '#edbb99',
  '#fad7a0',
  // '#a2d9ce',
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
    const LEVEL = localStorage.getItem('myLevel') || 1
    const grid = getGrid(LEVEL)
    const tracker = [
      ...Array(grid.length)
        .fill(1)
        .map(item => Array(grid.length).fill('blank')),
    ]
    this.state = {
      tracker,
      level: LEVEL,
      modalOpen: false,
      grid,
      winner: false,
      errors: [],
    }
  }

  toggleModal = () => this.setState({ modalOpen: !this.state.modalOpen })
  checker = () => {
    const { tracker, grid } = this.state
    // check if there are >= LEVEL starred
    const errors = []
    // console.log(stars)
    // check each row
    const rowParse = tracker
      .map(row => row.filter(col => col === 'starred'))
      .map(row => row.length === 1)
    // rowParse.forEach(row => {
    //   if(!row) {
    //     // errors = [...errors, ...Array(grid.length).]
    //   }
    // })
    const rowCheck = !rowParse.includes(false)
    // check each column
    const colCheck = !tracker
      .map((row, i) => row.map((col, j) => tracker[j][i] === 'starred'))
      .map(row => row.filter(col => col))
      .map(row => row.length === 1)
      .includes(false)

    // check each area
    let areaCheck = Array(grid.length).fill(0)
    grid.forEach((row, z) => {
      grid.forEach((row, i) =>
        row.forEach((col, j) => {
          if (grid[i][j] === z && tracker[i][j] === 'starred') {
            areaCheck[z] = areaCheck[z] + 1
          }
        }),
      )
    })
    areaCheck = areaCheck.filter(area => area === 1).length === grid.length

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
    // console.log(rowCheck, colCheck, areaCheck, checkProximity(tracker))
    if (rowCheck && colCheck && areaCheck && checkProximity(tracker)) {
      this.setState({ winner: true })
    } else {
      this.setState({ winner: false })
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
    this.setState({ tracker: newTracker }, this.checker())
  }

  resetTracker = () =>
    this.setState({
      tracker: [
        ...Array(this.state.grid.length)
          .fill(1)
          .map(item => Array(this.state.grid.length).fill('blank')),
      ],
    })
  nextLevel = () => {
    const level = new Number(this.state.level) + 1
    const grid = getGrid(level)
    this.setState(
      {
        level,
        tracker: [
          ...Array(grid.length)
            .fill(1)
            .map(item => Array(grid.length).fill('blank')),
        ],
        grid,
        winner: false,
      },
      () => localStorage.setItem('myLevel', level),
    )
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
                  width: `${90 / grid.length}vw`,
                  height: `${90 / grid.length}vw`,
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
            label={`Level ${this.state.level} of 100`}
            icon={<LayersIcon />}
            onClick={() => {}}
          />
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
          <div className='modal'>
            <p>
              Rules: Each row, column, and colored area must only contain one
              star. Also, stars are not allowed to be adjacent to each other,
              even diagonally. Click once to use X to mark where stars cannot
              be. Then Click on the X to mark a star.
            </p>
            <Button
              variant='contained'
              color='primary'
              onClick={() => localStorage.setItem('myLevel', 1)}
            >
              Reset to level 1
            </Button>
          </div>
        </Modal>
        <Modal
          aria-labelledby='simple-modal-title'
          aria-describedby='simple-modal-description'
          open={this.state.winner}
          onClose={this.nextLevel}
        >
          <div className='modal'>
            <p>Youve solved the level!</p>
            <Button
              variant='contained'
              color='primary'
              onClick={this.nextLevel}
            >
              Next Level
            </Button>
          </div>
        </Modal>
      </div>
    )
  }
}

export default App
