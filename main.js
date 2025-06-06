import kaboom from "./libs/kaboom.mjs"
import { Player } from "./entities/Player.js"
import { Teachers } from "./entities/Teachers.js"
import { Camera } from "./utils/Camera.js"
import { level1Layout, level1Mappings } from "./content/level1/level1Layout.js"
import { level1Config } from "./content/level1/config.js"
import { UIManager } from "./utils/UIManager.js"
import { Level } from "./utils/Level.js"
import { load } from "./utils/loader.js"
import { bgSoundManager } from "./utils/BGSoundManager.js"

kaboom({
  width: 1280,
  height: 720,
  letterbox: true,
  debug: false,
})

load.fonts()
load.assets()
load.sounds()

const scenes = {
  menu: () => {
    UIManager.displayMainMenu()
  },
  controls: () => {
    UIManager.displayControlsMenu()
  },
  1: () => {
    bgSoundManager.addSound("water-ambience", {
      volume: 0.02,
      loop: true,
    })
    bgSoundManager.play("water-ambience")
    const level1 = new Level()
    setGravity(level1Config.gravity)
    level1.drawBackground("newsky-background")
    level1.drawMapLayout(level1Layout, level1Mappings)

    const player = new Player(
      level1Config.playerStartPosX,
      level1Config.playerStartPosY,
      level1Config.playerSpeed,
      level1Config.jumpForce,
      level1Config.nbLives,
      1,
      false
    )
    player.enablePassthrough()
    player.enableScorePickUp()
    player.enableMobVunerability()

    const teachers = new Teachers(
      level1Config.teacherPositions.map((teacherPos) => teacherPos()),
      level1Config.teacherAmplitudes,
      level1Config.teacherSpeeds,
      level1Config.teacherType
    )
    teachers.setMovementPattern()
    teachers.enablePassthrough()

    level1.drawWaves("water", "wave")

    const camera = new Camera()
    camera.attach(player.gameObj, 0, -200, null, 200)
    UIManager.addDarkBg()
    UIManager.displayLivesCount(player)
    UIManager.displayScoreCount(player)

    player.updateLives(UIManager.livesCountUI)
    player.updateScoreCount(UIManager.scoreCountUI)
  },
  gameover: async () => UIManager.displayGameOverScreen(),
  end: () => UIManager.displayEndGameScreen(),
}

for (const key in scenes) {
  scene(key, scenes[key])
}

go("menu")
