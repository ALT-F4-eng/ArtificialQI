import { LlmDto } from "../../core/models/llm-dto.model";

export const llmMockList: LlmDto[] = [
  { 
    id: 1,
    name: "GPT-4 Turbo",
    last_mod: new Date("2025-05-10T12:00:00Z"),
    url: "https://api.openai.com/v1/chat/completions",
    key_req: "prompt",
    key_resp: "choices",
    kv_body: new Set(),
    kv_header: new Set()
  },
  {
    id: 2,
    name: "Claude 3 Opus",
    last_mod: new Date("2025-04-22T09:30:00Z"),
    url: "https://api.anthropic.com/v1/messages",
    key_req: "messages",
    key_resp: "completion",
    kv_body: new Set(),
    kv_header: new Set()
  },
  {
    id: 3,
    name: "Mistral 7B",
    last_mod: new Date("2025-03-18T16:45:00Z"),
    url: "https://api.mistral.ai/v1/completions",
    key_req: "input",
    key_resp: "result",
    kv_body: new Set(),
    kv_header: new Set()
  }
];