import { Suspense } from "react";
import Login from "./Login";


const LoginPage = () => {
  return (
    <Suspense fallback={<div>Loading login...</div>}>
        <Login/>
    </Suspense>
  )
}

export default LoginPage
