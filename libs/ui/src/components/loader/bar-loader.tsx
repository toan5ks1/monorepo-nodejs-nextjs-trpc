import { useTheme } from 'next-themes'
import { BarLoader as BarLoaderPrimitive } from 'react-spinners'
import { LoaderHeightWidthProps } from 'react-spinners/helpers/props'

export const BarLoader = ({
  cssOverride,
  ...props
}: LoaderHeightWidthProps) => {
  const { theme } = useTheme()
  let bgColor, color

  switch (theme) {
    case 'light':
      bgColor = 'rgba(0, 0, 0, 0.2)'
      color = 'hsl(240 5.9% 10%)'
      break
    case 'dark':
      bgColor = 'rgba(0, 0, 0, 0.2)'
      color = 'hsl(0 0% 98%)'
      break
    default:
      bgColor = 'rgba(0, 0, 0, 0.2)'
      break
  }

  return (
    <BarLoaderPrimitive
      cssOverride={{ backgroundColor: bgColor, ...cssOverride }}
      color={color}
      {...props}
    />
  )
}
