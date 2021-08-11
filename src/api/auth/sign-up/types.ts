export interface SignUpDataType {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export interface RedisPayloadType {
  id: string;
  token: string;
}
