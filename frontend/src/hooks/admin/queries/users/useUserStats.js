import {useQuery} from '@tanstack/react-query';
import {getUserStats} from '../../../../api/users.api'
const useUserStats = () => {
  return useQuery({
    queryKey: ["admin-users"],

    queryFn: getUserStats,

    staleTime: 30 * 1000,

    refetchOnWindowFocus: true,
  })
  
}

export default useUserStats