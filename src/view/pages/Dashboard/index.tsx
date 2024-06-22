import logo from "../../../assets/logo.svg"
import { UserMenu } from "../../components/UserMenu"
import { Accounts } from "./components/Accounts"
import { DashboardProvider } from "./components/DashboadContext"
import { Fab } from "./components/Fab"
import { Transactions } from "./components/Transactions"
import { EditAccountModal } from "./modals/EditAccountModal"
import { NewAccountModal } from "./modals/NewAccountModal"
import { NewTransactionModal } from "./modals/NewTransactionModal"

export function Dashboard() {
  return (
    <DashboardProvider>
      <div className="h-full w-full p-4 md:px-8 md:pb-8 md:pt-6 flex flex-col gap-4">
        <header className="h-12 flex justify-between items-center">
          <img className="h-6 cursor-pointer" src={logo} />
          <UserMenu />
        </header>
        <main className="flex-1 flex gap-4 flex-col md:flex-row max-h-full">
          <div className="md:w-1/2 w-full">
            <Accounts />
          </div>
          <div className="md:w-1/2 w-full">
            <Transactions />
          </div>
        </main>
        <Fab />
      </div>
      <NewAccountModal />
      <NewTransactionModal />
      <EditAccountModal />
    </DashboardProvider>
  )
}