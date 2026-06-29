export type OptionChipState = 'idle' | 'selected' | 'correct' | 'wrong'
export type OptionChipProps = {
  label: string
  state?: OptionChipState
  onClick?: () => void
  disabled?: boolean
}
