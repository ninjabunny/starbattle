const getGrid = level => {
  const binLength = 20
  const gridSize = Math.floor(level / binLength) + 5
  const initStars = gridSize => {
    let grid = [Math.floor(Math.random() * gridSize)]
    while (grid.length < gridSize) {
      const safeNums = [
        ...new Set(
          new Array(gridSize)
            .fill(1)
            .map((_, i) => i)
            .filter(item => grid.indexOf(item) === -1)
            .filter(item => item !== grid[grid.length - 1] + 1)
            .filter(item => item !== grid[grid.length - 1] - 1)
            .map(JSON.stringify),
        ),
      ].map(JSON.parse)
      if (safeNums.length > 0) {
        grid.push(safeNums[Math.floor(Math.random() * safeNums.length)])
      } else {
        grid = [Math.floor(Math.random() * gridSize)]
      }
    }
    return grid
  }

  function printStars(stars = []) {
    stars.forEach(item => {
      let str = Array(stars.length).fill('.')
      str[item] = `${item}`
      console.log(str)
    })
  }
  const grid = initStars(gridSize)
  // console.log(grid)
  // printStars(grid)
  const createAreas = stars => {
    const initGrid = stars.map(star => {
      const row = Array(stars.length).fill(undefined)
      row[star] = star
      return row
    })

    while (!isFilled(initGrid)) {
      // Biassedly pick region ID depending on level
      // 20 = .5
      const dificulty = ((level % binLength) + 1) / binLength / 2
      const regionId = Math.floor(
        stars.length * Math.pow(Math.random(), dificulty), // .5 is max
      )
      console.log('diff', dificulty)
      //find current regions
      const regions = []
      initGrid.forEach((row, i) =>
        row.forEach((col, j) => {
          if (col === regionId) {
            regions.push([i, j])
          }
        }),
      )
      //find all of its safe spaces
      const safeSpaces = []
      regions.forEach(region => {
        if (region[0] !== 0) {
          //if not in first row
          //check the top
          if (initGrid[region[0] - 1][region[1]] === undefined) {
            safeSpaces.push([region[0] - 1, region[1]])
          }
        }
        if (region[0] !== stars.length - 1) {
          //if not in last row
          //check the botom
          if (initGrid[region[0] + 1][region[1]] === undefined) {
            safeSpaces.push([region[0] + 1, region[1]])
          }
        }
        if (region[1] !== 0) {
          //if not first column
          //check the left
          if (initGrid[region[0]][region[1] - 1] === undefined) {
            safeSpaces.push([region[0], region[1] - 1])
          }
        }
        if (region[1] !== stars.length - 1) {
          //if not last column
          //check the right
          if (initGrid[region[0]][region[1] + 1] === undefined) {
            safeSpaces.push([region[0], region[1] + 1])
          }
        }
      })
      if (safeSpaces.length) {
        const space = safeSpaces[Math.floor(Math.random() * safeSpaces.length)]
        initGrid[space[0]][space[1]] = regionId
      }
    }

    function isFilled(initGrid) {
      let count = 0
      initGrid.forEach(row => {
        row.forEach(col => {
          if (col === undefined) {
            count++
          }
        })
      })

      return !count
    }
    return initGrid
  }
  const area = createAreas(grid)

  // console.log(area)
  const distro = []
  area.forEach(row => row.forEach(col => (distro[col] = distro[col] + 1 || 1)))
  // console.log(distro)
  return area
}

export default getGrid
