import { KeyValuePairDto } from "./keyvalue-dto.model";

export interface LlmDto {
  id: number;             
  name: string;
  last_mod: Date;      
  url: string;
  key_req: string;
  key_resp: string;
  kv_body: Set<KeyValuePairDto>;
  kv_header: Set<KeyValuePairDto>;
}