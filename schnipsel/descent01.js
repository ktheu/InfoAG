
read = () => Array(8).fill().map((_,i) => [readline(), i])

while (true) {
  const mountains = read()

  const highestPointIdx = mountains.sort().pop().pop()

  print(highestPointIdx)
}