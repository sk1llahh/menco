import useProfile from "@/entities/user/model/useProfile.ts";

const Page = () => {
  const {getProfile} = useProfile()

  console.log('get', getProfile.data)
  return (
    <h1>profile</h1>
  )
}

export const Component = Page