import * as React from 'react'
import { CloseDialog, OpenDialog } from './use_dialogs'

const DialogsContext = React.createContext<{
  open: OpenDialog
  close: CloseDialog
} | null>(null)

export default DialogsContext
