import RSwitch, { type ReactSwitchProps } from 'react-switch'

const Switch = (props: ReactSwitchProps) => (
  <RSwitch
    checkedIcon={<></>}
    uncheckedIcon={<></>}
    onColor="#022A9A"
    offColor="#606882"
    handleDiameter={16}
    height={24}
    width={44}
    {...props}
  />
)

export default Switch
