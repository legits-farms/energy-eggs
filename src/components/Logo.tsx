import { LocaleLink as Link } from './LocaleLink'
import logo from '../assets/logo.webp'
import logoLight from '../assets/logo-light.webp'

type LogoProps = { light?: boolean }

export default function Logo({ light = false }: LogoProps) {
  return (
    <Link to="/" className={`logo ${light ? 'logo-light' : ''}`} aria-label="Energy Eggs — The B2B Desi Poultry Ecosystem">
      <img src={light ? logoLight : logo} alt="Energy Eggs" width={480} height={light ? 269 : 241} />
    </Link>
  )
}
