import { useAuth } from "../../../app/hooks/useAuth"
import { Button } from "../../components/Button"

export function Dashboard() {
  const { signout } = useAuth()
  return (
    <div>
      <Button onClick={signout}>Saiir</Button>
    </div>
  )
}