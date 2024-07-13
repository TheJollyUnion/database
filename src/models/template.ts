import { MixedType, Schema } from "ottoman";

export const TemplateSchema = new Schema({
  code: { type: String, required: true },
  title: { type: String, required: true },
  profileImage: { type: String, required: true },
  exportFile: { type: String, required: true },
  indexMessage: {
    id: { type: Number, required: true },
    callToAction: { type: String, required: true },
    overview: { type: String, required: true },
    resourceURL: { type: String, required: true },
    author: {
      type: Schema.Types.Mixed,
      required: false,
      schema: {
        name: { type: String, required: true },
        url: { type: String, required: false },
        supportPlatform: { type: String, required: true },
        supportPlatformURL: { type: String, required: true },
      },
    },
  },
});

TemplateSchema.index.findByTid = { by: "_id", type: "n1ql" };

export interface Template {
  code: string;
  title: string;
  profileImage: string;
  exportFile: string;
  indexMessage: {
    id: number;
    callToAction: string;
    overview: string;
    resourceURL: string;
    author?: {
      name: string;
      url?: string;
      supportPlatform: string;
      supportPlatformURL: string;
    };
  };
}
