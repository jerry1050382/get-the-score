export class Teachers {
  rangeX = 0
  rangeY = 800

  constructor(positions, amplitudes, velocities, type) {
    this.amplitudes = amplitudes
    this.velocities = velocities
    this.teachers = []
    for (const position of positions) {
      this.teachers.push(
        add([
          sprite(`teacher-${type}`, { anim: "crawl" }),
          pos(position),
          area({
            shape: new Rect(vec2(0, 4.5), 20, 6),
            collisionIgnore: ["teachers"],
          }),
          anchor("center"),
          body(),
          scale(4),
          state("idle", ["idle", "crawl-left", "crawl-right"]),
          offscreen(),
          "teachers",
        ])
      )
    }
  }

  async crawl(teacher, moveBy, duration) {
    if (teacher.currAnim !== "crawl") teacher.play("crawl")

    await tween(
      teacher.pos.x,
      teacher.pos.x + moveBy,
      duration,
      (posX) => (teacher.pos.x = posX),
      easings.easeOutSine
    )
  }

  setMovementPattern() {
    for (const [index, teacher] of this.teachers.entries()) {
      const idle = teacher.onStateEnter("idle", async (previousState) => {
        if (teacher.currAnim !== "idle") teacher.play("idle")

        await new Promise((resolve) => {
          setTimeout(() => resolve(), 1000)
        })

        if (previousState === "crawl-left") {
          teacher.enterState("crawl-right")
        } else {
          teacher.jump()
          if (!teacher.isOffScreen()) {
            play("teacher-attack", { volume: 0.6 })
          }

          teacher.enterState("crawl-left")
        }
      })

      const crawlLeft = teacher.onStateEnter("crawl-left", async () => {
        teacher.flipX = false

        await this.crawl(
          teacher,
          -this.amplitudes[index],
          this.velocities[index]
        )
        teacher.enterState("idle", "crawl-left")
      })

      const crawlRight = teacher.onStateEnter("crawl-right", async () => {
        teacher.flipX = true

        await this.crawl(teacher, this.amplitudes[index], this.velocities[index])
        teacher.enterState("idle", "crawl-right")
      })

      onSceneLeave(() => {
        idle.cancel()
        crawlLeft.cancel()
        crawlRight.cancel()
      })
    }
  }

  enablePassthrough() {
    for (const teacher of this.teachers) {
      teacher.onBeforePhysicsResolve((collision) => {
        if (collision.target.is("passthrough") && teacher.isJumping()) {
          collision.preventResolution()
        }
      })
    }
  }
}
