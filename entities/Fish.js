export class Gangster {
  constructor(positions, amplitudes, type) {
    this.amplitudes = amplitudes
    this.gangster = []
    for (const position of positions) {
      this.gangster.push(
        add([
          sprite(`gangster-${type}`, { anim: "gangster" }),
          area({ shape: new Rect(vec2(0), 12, 12) }),
          anchor("center"),
          pos(position),
          scale(4),
          rotate(0),
          state("launch", ["launch", "rotate", "fall"]),
          offscreen(),
          "gangster",
        ])
      )
    }
  }

  setMovementPattern() {
    for (const [index, gangster] of this.gangster.entries()) {
      const launch = gangster.onStateEnter("launch", async () => {
        await tween(
          gangster.pos.y,
          gangster.pos.y - this.amplitudes[index],
          2,
          (posY) => (gangster.pos.y = posY),
          easings.easeOutSine
        )
        gangster.enterState("rotate", "fall")
      })

      const rotate = gangster.onStateEnter("rotate", (nextState) => {
        gangster.rotateBy(180)
        gangster.enterState(nextState)
      })

      const fall = gangster.onStateEnter("fall", async () => {
        await tween(
          gangster.pos.y,
          gangster.pos.y + this.amplitudes[index],
          2,
          (posY) => (gangster.pos.y = posY),
          easings.easeOutSine
        )
        gangster.enterState("rotate", "launch")
      })

      onSceneLeave(() => {
        launch.cancel()
        rotate.cancel()
        fall.cancel()
      })
    }
  }
}
