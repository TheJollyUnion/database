import { Groups, Templates } from "../index"
import { readFile } from "fs/promises"
import type { Group, Template } from "../models"

const templateFile = await readFile("./templates.json", "utf8")
const templates = JSON.parse(templateFile) as Template[]

const groupFile = await readFile("./groups.json", "utf8")
const groups = JSON.parse(groupFile) as Record<string, Omit<Group, "template">[]>

for (const templateCode in groups) {
    const templateGroups = groups[templateCode]
    for (const group of templateGroups) {
        let existsInDB = false
        try {
            existsInDB = await Groups.findOne({
                id: group.id,
            })
        } catch (e) {}

        if (existsInDB) continue
        group["template"] = templateCode

        await Groups.create(group as Group)
    }
}

for (const template of templates) {
    const templateCode = template.code
    let existsInDB = false
    try {
        existsInDB = await Templates.findOne({
            code: templateCode,
        })
    } catch (e) {}

    if (existsInDB) continue
    await Templates.create(template as Template)
}
