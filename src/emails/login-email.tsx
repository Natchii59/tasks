import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text
} from '@react-email/components'
import { Tailwind } from '@react-email/tailwind'

interface LoginEmailProps {
  url: string
  host: string
}

function LoginEmail({ url, host }: LoginEmailProps) {
  const previewText = `Sign in to ${host}`

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>

      <Tailwind>
        <Body className='m-auto bg-white font-sans text-black'>
          <Container className='mx-auto max-w-xl p-4'>
            <Heading className='my-4 text-3xl font-bold'>
              Sign in to{' '}
              <Link
                href=''
                className='pointer-events-none text-black no-underline'
              >
                {host}
              </Link>
            </Heading>

            <Text className='m-0 text-zinc-500'>
              You are receiving this email because you (or someone else) has
              requested to sign in to your account on{' '}
              <Link
                href=''
                className='pointer-events-none font-semibold text-zinc-500 no-underline'
              >
                {host}
              </Link>
              .
            </Text>

            <Section className='my-8 text-center'>
              <Link
                className='rounded-md bg-black px-5 py-3 text-center text-[12px] font-semibold text-white no-underline'
                href={url}
              >
                Verify your email
              </Link>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
LoginEmail.PreviewProps = {
  host: 'natchi.fr',
  url: 'https://natchi.fr'
} as LoginEmailProps

function LoginEmailText({ url, host }: LoginEmailProps) {
  return `Sign in to ${host}\n${url}`
}

export { LoginEmail, LoginEmailText }

export default LoginEmail
