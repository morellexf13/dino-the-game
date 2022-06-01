// 🦖 Handle the player that appears on the screen

class Player {
  constructor() {
    this.r = 100
    this.x = 50
    this.y = height - this.r
    this.vy = 0
    this.gravity = 1
  }

  move() {
    this.y += this.vy
    this.vy += this.gravity
    this.y = constrain(this.y, 0, height - this.r)
    image(playerImage, this.x, this.y + 20, config.DEFAULT_PLAYER_SIZE, config.DEFAULT_PLAYER_SIZE)
  }

  jump() {
    if (this.y == height - this.r) {
      this.vy = -20
      jumpSound.play()
    }
  }

  collide(other) {
    let hitX = this.x + this.r > other.x && this.x < other.x + other.r
    let hitY = this.y + this.r > other.y
    return hitX && hitY
  }
}