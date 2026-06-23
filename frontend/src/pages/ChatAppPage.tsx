import Logout from '@/components/auth/Logout'
import { useAuthStore } from '@/stores/useAuthStore';

const ChatAppPage = () => {
  const user = useAuthStore((s) => s.user);
  console.log("Dữ liệu user hiện tại:", user);
  return (
    <div>
      {user ? <h1>Welcome, {user.username}!</h1> : <h1>Loading...</h1>}
      <Logout/>
    </div>
  )
}

export default ChatAppPage