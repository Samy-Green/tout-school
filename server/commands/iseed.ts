import { args, BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import db from '@adonisjs/lucid/services/db'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// recrée __dirname comme en CommonJS
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default class Iseed extends BaseCommand {
  static commandName = 'iseed'
  static description = "Génère un seeder JSON à partir d'une ou plusieurs tables"

  private toPascalCase(str: string): string {
    return str
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('')
  }

  static options: CommandOptions = {
    startApp: true,
    allowUnknownFlags: false,
    staysAlive: false,
  }

  @args.string({ description: 'Nom des tables séparées par des virgules' })
  public tables: string = ''

  public async run() {
    const tables = this.tables.split(',').map((t) => t.trim())
    const generatedDir = path.join(dirname, '..', 'database', 'seeders', 'generated')
    const jsonDir = path.join(generatedDir, 'data')

    if (!fs.existsSync(generatedDir)) {
      fs.mkdirSync(generatedDir, { recursive: true })
    }
    if (!fs.existsSync(jsonDir)) {
      fs.mkdirSync(jsonDir, { recursive: true })
    }

    for (const table of tables) {
      try {
        this.logger.info(`Lecture de la table ${table}...`)

        // Correction : utilisation de la syntaxe query builder correcte
        const rows = await db.query().from(table).select('*')

        console.log(rows)

        const jsonPath = path.join(jsonDir, `${table}.json`)
        fs.writeFileSync(jsonPath, JSON.stringify(rows, null, 2))

        // Création / mise à jour du seeder correspondant avec nom en PascalCase
        const seederPath = path.join(generatedDir, `${table}generated_seeder.ts`)
        const seederContent = `
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import db from '@adonisjs/lucid/services/db'

export default class ${this.toPascalCase(table)}GeneratedSeeder extends BaseSeeder {
  public async run() {
    const data = require('./data/${table}.json')
    await db.table('${table}').multiInsert(data)
  }
}
        `
        fs.writeFileSync(seederPath, seederContent.trim())
        this.logger.success(`Seeder généré pour ${table}`)
      } catch (error) {
        this.logger.error(`Erreur lors de la génération du seeder pour ${table}: ${error.message}`)
      }
    }
  }
}
