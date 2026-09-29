import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Splash from './components/Splash'
import Layout from './components/Layout'
import LangGate from './components/LangGate'
import Home from './pages/Home'
import Birds from './pages/Birds'
import Eggs from './pages/Eggs'
import Equipment from './pages/Equipment'
import Feed from './pages/Feed'
import FarmDevelopment from './pages/FarmDevelopment'
import ContractFarming from './pages/ContractFarming'
import B2BSupply from './pages/B2BSupply'
import RateCard from './pages/RateCard'
import Shop from './pages/Shop'
import About from './pages/About'
import Contact from './pages/Contact'

// path is relative to the language root ('' = index route)
const ROUTES: [path: string, Component: React.ComponentType][] = [
  ['', Home],
  ['birds', Birds],
  ['eggs', Eggs],
  ['equipment', Equipment],
  ['feed', Feed],
  ['farm-development', FarmDevelopment],
  ['contract-farming', ContractFarming],
  ['b2b-supply', B2BSupply],
  ['rate-card', RateCard],
  ['shop', Shop],
  ['about', About],
  ['contact', Contact],
]

export default function App() {
  return (
    <BrowserRouter>
      <Splash />
      <Routes>
        {/* English — no prefix, keeps every existing indexed URL as-is */}
        <Route element={<LangGate lang="en" />}>
          <Route element={<Layout />}>
            {ROUTES.map(([path, Component]) =>
              path === '' ? (
                <Route key="home" index element={<Component />} />
              ) : (
                <Route key={path} path={`/${path}`} element={<Component />} />
              ),
            )}
          </Route>
          <Route path="/farmer-partners" element={<Navigate to="/contract-farming" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>

        {/* Hindi — same page tree under /hi */}
        <Route path="/hi" element={<LangGate lang="hi" />}>
          <Route element={<Layout />}>
            {ROUTES.map(([path, Component]) => (
              <Route key={path || 'home'} index={path === ''} path={path || undefined} element={<Component />} />
            ))}
          </Route>
          <Route path="*" element={<Navigate to="/hi" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
