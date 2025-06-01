import { KeyValuePairDto } from "./keyvalue-dto.model";

export interface LlmDto {
  id: string;             
  name: string;
  last_mod: string;      
  url: string;
  key_req: string;
  key_resp: string;
  kv_body: KeyValuePairDto[];
  kv_header: KeyValuePairDto[];
}