import Loading_Skeleton from "../../_Components/Loadings/Loading_Skeleton"

const Loading = () => {
  return (
    <div className="max-w-[1440px] mx-auto md:w-[90vw] mb:w-[342px] flex flex-col">
      <Loading_Skeleton number_elements={2} />
    </div>
  )
}

export default Loading