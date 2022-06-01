// 👹 Handle the enemies that appears on the screen

class Obstacle {
  constructor() {
    this.r = config.DEFAULT_OBSTACLE_SIZE
    this.x = width
    this.y = height - this.r
  }

  move() {
    this.x -= speed
    image(obstacleImage, this.x, this.y, this.r, this.r)
  }
}
