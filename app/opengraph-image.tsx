import { ImageResponse } from 'next/og'

export const runtime = 'edge'

// Image metadata
export const alt = 'Next.js Starter'
export const size = {
  width: 1200,
  height: 630
}

export const contentType = 'image/png'

export default async function Image() {
  const interSemiBold = fetch(
    new URL('../assets/fonts/Inter-SemiBold.ttf', import.meta.url)
  ).then(res => res.arrayBuffer())

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        Next.js Starter
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Inter',
          data: await interSemiBold,
          style: 'normal',
          weight: 400
        }
      ]
    }
  )
}
