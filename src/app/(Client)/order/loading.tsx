import { Skeleton } from "@/src/app/_Components/ui/Skeleton/skeleton"

const Loading = () => {
  return (
    <Skeleton className="lg:grid grid-cols-[60vw_38vw] h-[70vh] justify-between">
      <Skeleton></Skeleton>
      <Skeleton></Skeleton>
    </Skeleton>
  )
}

export default Loading