export interface RedisPayloadType {
  id: string;
  token: string;
}

export interface RefreshTokenResponseType {
  'access-token': string;
}

export interface RequestBodyType {
  'refresh-token': string;
}
