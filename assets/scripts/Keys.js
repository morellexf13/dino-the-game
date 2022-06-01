function keyPressed() {
  if (restart) {
    restart = false
    score = 0
    scollBg = 0
    scroll = 10
    obstacles = []
    bgsound.play()
    loop()
  }
  if (key == " ") {
    player.jump()
    return false
  }
}
