import { template } from "lodash"
import { Schema } from "ottoman"

export const GroupSchema = new Schema({
    id: { type: String, required: true },
    template: { type: String, required: true },
    inviteLink: { type: String, required: true },
    status: { type: String, required: true },
    clean: { type: Boolean, required: true },
})

GroupSchema.index.findByTid = { by: "_id", type: "n1ql" }

export interface Group {
    id: string
    template: string
    inviteLink: string
    status: "ready" | "loading" | "error"
    clean: boolean
}
