'use-client'
import { useFormStatus, useFormState } from 'react-dom'

export function SignupButton(){
    const pending = useFormStatus()
    
    return(
        <button type="submit" className='w-1/2 m-2 rounded-md'>
            {pending ? 'Submitting' : 'Sign Up'}
        </button>
    )
}