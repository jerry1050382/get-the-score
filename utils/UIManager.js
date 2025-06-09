import { bgSoundManager } from "./BGSoundManager.js"

class UI {
  displayLivesCount(player) {
    this.livesCountUI = add([
      text(`${player.lives}`, {
        font: "Round",
        size: 50,
      }),
      fixed(),
      pos(70, 80),
    ])

    this.livesCountUI.add([
      sprite("heart-icon"),
      pos(-60, -5),
      scale(3),
      fixed(),
    ])
  }

  displayScoreCount(player) {
    this.scoreCountUI = add([
      text(`${player.scores} / ${this.fullScoreCount}`, {
        font: "Round",
        size: 50,
      }),
      {
        fullScoreCount: get("score", { recursive: true }).length,
      },
      fixed(),
      pos(70, 150),
    ])

    this.scoreCountUI.add([sprite("score-icon"), pos(-60, 0), scale(3), fixed()])
  }

  displayBlinkingUIMessage(content, position) {
    const message = add([
      text(content, { size: 24, font: "Round" }),
      area(),
      anchor("center"),
      pos(position),
      opacity(),
      state("flash-up", ["flash-up", "flash-down"]),
    ])

    message.onStateEnter("flash-up", async () => {
      await tween(
        message.opacity,
        0,
        0.5,
        (opacity) => (message.opacity = opacity),
        easings.linear
      )
      message.enterState("flash-down")
    })

    message.onStateEnter("flash-down", async () => {
      await tween(
        message.opacity,
        1,
        0.5,
        (opacity) => (message.opacity = opacity),
        easings.linear
      )
      message.enterState("flash-up")
    })
  }

  displayMainMenu() {
    add([sprite("newsky-background"), scale(4)])

    this.displayBlinkingUIMessage(
      "Press [ Space ] to Start Game and Get All 100!",
      vec2(center().x, center().y + 220)
    )

    onKeyPress("space", () => {
      play("confirm-ui", { speed: 1.5 })
      go("controls")
    })

    this.displayBlinkingUIMessage(
      "Press [ ESC ] to Quit the Game",
      vec2(center().x, center().y + 300)
    )

    //link to home
    
    onKeyPress("escape", () => {
      play("confirm-ui", { speed: 1.5 })
      window.location.href = "https://classroomdaydream.vercel.app/"
    })
  }

  displayControlsMenu() {
    add([sprite("newsky-background"), scale(4)])
    add([
      text("Controls", { font: "Round", size: 50 }),
      area(),
      anchor("center"),
      pos(center().x, center().y - 200),
    ])

    const controlPrompts = add([pos(center().x + 30, center().y)])
    controlPrompts.add([sprite("up"), pos(0, -80)])
    controlPrompts.add([sprite("down")])
    controlPrompts.add([sprite("left"), pos(-80, 0)])
    controlPrompts.add([sprite("right"), pos(80, 0)])
    controlPrompts.add([sprite("space"), pos(-200, 0)])
    controlPrompts.add([
      text("Jump", { font: "Round", size: 32 }),
      pos(-190, 100),
    ])
    controlPrompts.add([
      text("Move", { font: "Round", size: 32 }),
      pos(10, 100),
    ])

    this.displayBlinkingUIMessage(
      "Press [ Space ] to Start Game and get the score",
      vec2(center().x, center().y + 250)
    )

    onKeyPress("space", () => {
      play("confirm-ui", { speed: 1.5 })
      go(1)
    })
  }

  displayGameOverScreen() {
    bgSoundManager.pauseAllSounds()
    add([rect(1280, 720), color(151, 233, 238)])
    add([
      text("Game Over!", { size: 50, font: "Round" }),
      area(),
      anchor("center"),
      pos(center()),
    ])

    this.displayBlinkingUIMessage(
      "Press [ Space ] to Start Game",
      vec2(center().x, center().y + 100)
    )

    onKeyPress("space", () => {
      play("confirm-ui")
      go(1)
    })
  }

  displayEndGameScreen() {
    bgSoundManager.pauseAllSounds()
    add([rect(1280, 720), color(151, 233, 238)])
    add([
      text("You Won! Thanks for Playing.", { size: 50, font: "Round" }),
      area(),
      anchor("center"),
      pos(center()),
    ])

    this.displayBlinkingUIMessage(
      "Press [ Space ] to Play Again",
      vec2(center().x, center().y + 100)
    )

    onKeyPress("space", () => {
      play("confirm-ui")
      go("menu")
    })
  }

  addDarkBg() {
    add([rect(240, 130), color(151, 233, 238), fixed()])
  }
}

export const UIManager = new UI()
