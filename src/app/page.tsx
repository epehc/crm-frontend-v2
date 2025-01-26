'use client'

import {redirect} from "next/navigation";
import {Button} from "@/components/ui/button";

export default function Home() {

 /* const handleGoToLogin = () => {
    redirect('/login');
  }*/

  return (
    <div>
      <Button onClick={() => redirect('login')}>
        Go to login
      </Button>
    </div>
  );
}
