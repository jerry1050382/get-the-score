export const load = {
  fonts: () => {
    loadFont("Round", "./assets/Round9x13.ttf")
  },
  assets: () => {
    // controls prompts
    loadSprite("up", "./assets/Arrow_Up_Key.png")
    loadSprite("down", "./assets/Arrow_Down_Key.png")
    loadSprite("left", "./assets/Arrow_Left_Key.png")
    loadSprite("right", "./assets/Arrow_Right_Key.png")
    loadSprite("space", "./assets/Space_Key.png")

    loadSprite("score-icon", "./assets/Scores_Ui.png")
    loadSprite("heart-icon", "./assets/Heart_Ui.png")
    loadSprite("score", "./assets/Score.png")
    // loadSprite("logo", "./assets/Logo.png")
    loadSprite("player", "./assets/Player.png", {
      sliceX: 4,
      sliceY: 3,
      anims: {
        idle: {
          from: 0,
          to: 3,
          loop: true,
        },
        run: {
          from: 4,
          to: 7,
          loop: true,
        },
        "jump-up": 8,
        "jump-down": 9,
      },
    })
    loadSprite("bridge", "./assets/Bridge.png")
    loadSprite("teacher-1", "./assets/Teacher_1.png", {
      sliceX: 3,
      sliceY: 1,
      anims: {
        crawl: { from: 0, to: 2, loop: true },
        idle: 0,
      },
    })
    loadSprite("newsky-background", "./assets/NewSky_Background_0.png")
    loadSprite("topfloor-tileset", "./assets/TopFloor_Tileset.png", {
      sliceX: 3,
      sliceY: 4,
      anims: {
        tl: 0,
        tm: 1,
        tr: 2,
        ml: 3,
        mm: 4,
        mr: 5,
        "ml-2": 6,
        "mm-2": 7,
        "mr-2": 8,
      },
    })
    loadSprite("topfloor-oneway-tileset", "./assets/TopFloor_Oneway.png", {
      sliceX: 3,
      sliceY: 4,
      anims: {
        tl: 0,
        tm: 1,
        tr: 2,
        ml: 3,
        mm: 4,
        mr: 5,
        "ml-2": 6,
        "mm-2": 7,
        "mr-2": 8,
      },
    })
    loadSprite("water", "./assets/Water.png", {
      sliceX: 8,
      sliceY: 1,
      anims: {
        wave: {
          from: 0,
          to: 7,
          speed: 16,
          loop: true,
        },
        "wave-reversed": {
          from: 7,
          to: 0,
          speed: 16,
          loop: true,
        },
      },
    })
  },
  sounds: () => {
    loadSound("jump", "./sounds/jump.wav")
    loadSound("score", "./sounds/score.wav")
    loadSound("water-ambience", "./sounds/water-ambience.mp3")
    loadSound("teacher-attack", "./sounds/teacher-attack.mp3")
    loadSound("hit", "./sounds/hit.wav")
    loadSound("lava-ambience", "./sounds/lava.wav")
    loadSound("confirm-ui", "./sounds/confirm-ui.wav")
    loadSound("swinging-axe", "./sounds/swinging-axe.mp3")
    loadSound("saw", "./sounds/saw.wav")
    loadSound("strong-wind", "./sounds/strong-wind.wav")
    loadSound("dive", "./sounds/dive.wav")
  },
}
