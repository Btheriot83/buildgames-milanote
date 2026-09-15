import { useEffect } from 'react'
import { BoardCanvas } from './components/BoardCanvas'
import { CaptureBar } from './components/CaptureBar'
import { Inspector } from './components/Inspector'
import { LoadingShell } from './components/LoadingShell'
import { ShellChrome } from './components/ShellChrome'
import { Sidebar } from './components/Sidebar'
import { SuccessOverlay } from './components/SuccessOverlay'
import { Toast } from './components/Toast'
import { WallBg } from './components/WallBg'
import { useBoard } from './store/boardStore'

export default function App() {
  const boot = useBoard((s) => s.boot)
  const loadStatus = useBoard((s) => s.loadStatus)

  useEffect(() => {
    void boot()
  }, [boot])

  const booting = loadStatus === 'boot' || loadStatus === 'loading'
  const ready = loadStatus === 'ready' || loadStatus === 'error'

  return (
    <div className="app-shell">
      <WallBg />
      <LoadingShell revealed={!booting} />
      {ready && (
        <div className="app-frame t-texts-reveal" data-state="in">
          <div className="atelier-tape" aria-hidden>
            <span>Atelier Pinwall</span>
            <span>Cork + kraft</span>
            <span>Brief in · Wall out</span>
            <span>Ochre pins</span>
          </div>
          <nav className="job-rail" aria-label="Core job">
            <ol>
              <li className="job-step on">
                <span className="job-num">1</span>
                <span className="job-label">Pin notes &amp; links</span>
              </li>
              <li className="job-arrow" aria-hidden>
                →
              </li>
              <li className="job-step">
                <span className="job-num">2</span>
                <span className="job-label">Search the wall</span>
              </li>
              <li className="job-arrow" aria-hidden>
                →
              </li>
              <li className="job-step">
                <span className="job-num">3</span>
                <span className="job-label">Export MD / JSON</span>
              </li>
            </ol>
          </nav>
          <ShellChrome />
          <div className="workspace">
            <Sidebar />
            <div className="stage">
              <CaptureBar />
              <BoardCanvas />
            </div>
            <Inspector />
          </div>
        </div>
      )}
      <Toast />
      <SuccessOverlay />
    </div>
  )
}
