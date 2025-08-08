import {useSession} from "@/shared/model/session.ts";
import {Navigate, Outlet, redirect} from "react-router";
import {ROUTES} from "@/shared/model/routes.ts";
import localforage from "localforage";
import {CONSTANT} from "@/shared/model/const.ts";

async function getToken() {
  return await localforage.getItem<string>(CONSTANT.TOKEN);
}

export function ProtectedRoute() {
  const {session} = useSession()

  if(!session){
    return <Navigate to={ROUTES.LOGIN} />
  }

  return <Outlet/>
}

export async function protectedLoader(){
  const token = await getToken();
  if (!token) {
    return redirect(ROUTES.LOGIN);
  }
  return null;
}