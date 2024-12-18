let stages = [];

export const initStage = (data) => {
  stages = [];
  stages.push(data)
}

export const setStage = (data) => {
  stages.push(data)
}

export const getStage = () => {
  console.log('test',stages[stages.length-1])
  return stages[stages.length-1]
}