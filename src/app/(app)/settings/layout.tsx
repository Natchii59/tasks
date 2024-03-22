type SettingsLayoutProps = React.PropsWithChildren

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className='py-4'>
      <h1 className='mb-2 text-3xl font-bold'>My account settings</h1>

      {children}
    </div>
  )
}
