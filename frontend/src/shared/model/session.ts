import {useEffect, useState} from "react";
import * as localforage from "localforage";
import {CONSTANT} from "@/shared/model/const.ts";
import {jwtDecode} from "jwt-decode";

interface JWTPayload {
  sub?: string;
  exp?: number;
  [key: string]: any;
}

export const useSession = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    localforage.getItem<string>(CONSTANT.TOKEN)
      .then((storedToken) => {
        setToken(storedToken || null);
      });
  }, []);

  const login = async (value: string) => {
    await localforage.setItem(CONSTANT.TOKEN, value)
    setToken(value)
  }

  const logout = async () => {
    await localforage.removeItem(CONSTANT.TOKEN)
    setToken(null)
  }

  const session: JWTPayload | null = token ? jwtDecode<JWTPayload>(token) : null;

  return {
    login,
    logout,
    session
  }
}