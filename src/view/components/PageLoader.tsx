import { Spiner } from "./Spiner";

export function PageLoader() {
  return (
    <div className="flex bg-gray-50 justify-center items-center h-screen">
      <Spiner />
    </div>
  )
}