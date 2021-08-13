export interface SignInDataType {
  email: string;
  password: string;
}

export interface RedisPayloadType {
  id: string;
  token: string;
}

export interface SignInResponseType {
  'access-token': string;
  'refresh-token': string;
}
