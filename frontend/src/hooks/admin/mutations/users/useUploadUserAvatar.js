
import {useMutation} from '@tanstack/react-query';

import {uploadUserAvatar} from '../../../../api/uploads.api';


const useUploadUserAvatar = () => {

    return useMutation({
        mutationFn: uploadUserAvatar,
    })
 
}

export default useUploadUserAvatar