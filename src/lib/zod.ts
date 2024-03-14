import { z } from 'zod'

export function neutralValuesToNull<T extends z.ZodTypeAny>(zodType: T) {
  return z.preprocess(
    val => (val === '' || val === undefined ? null : val),
    zodType
  )
}
