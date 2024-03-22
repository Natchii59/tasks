import { useState } from 'react'
import { toast } from 'sonner'

type MutationFunction<T> = (props: T) => void | Promise<void>

type UseMutationOptions<T> = {
  mutationFn: MutationFunction<T>
  onError?: (err: unknown) => void
}

export function useMutation<T>({ mutationFn, onError }: UseMutationOptions<T>) {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const mutate = async (props: T) => {
    setIsLoading(true)

    try {
      await mutationFn(props)
    } catch (err) {
      if (onError) {
        onError(err)
      } else if (err instanceof Error) {
        toast.error(err.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return {
    mutate,
    isLoading
  }
}
