import Loading_Skeleton from "../../_Components/Loadings/Loading_Skeleton"

const LoadingCart = () => {
  return (
    <div className="max-w-[1440px] mx-auto w-[95vw] h-full">
      <Loading_Skeleton number_elements={1} />

    </div>
  )
}

export default LoadingCart