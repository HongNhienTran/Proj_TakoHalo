import { useAuthStore } from '@/stores/useAuthStore';
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router';

const ProtectedRoute = () => {
    const { accessToken, user, loading, refresh, fetchMe } = useAuthStore();
    const [stating, setStating] = useState(true);

    const init = async () => {
        if (!accessToken) {
            await refresh();
        }
        if (accessToken && !user) {
            await fetchMe();
        }
        setStating(false);
    }

    useEffect(() => {
        init();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading || stating) {
        return <div className='flex h-full items-center justify-center'>Loading...</div>
    }

    if (!accessToken) {
        return (
            <Navigate to="/signin" replace></Navigate>
        )
    }
    return (
        <Outlet></Outlet>
    )
}

export default ProtectedRoute