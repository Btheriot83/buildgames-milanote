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
