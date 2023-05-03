import styled from 'styled-components'

type Option = { label: string; value: string }

type Options = Option[]

type SelectProps = {
  label: string
  value: string
  options: Options
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

export const Select: React.FC<SelectProps> = ({
  label,
  value,
  options,
  onChange,
}) => {
  return (
    <LabelUi>
      <Title>{label}</Title>
      <SelectUi value={value} onChange={(e) => onChange(e)}>
        {options.map((option) => (
          <option key={option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </SelectUi>
    </LabelUi>
  )
}

const LabelUi = styled.label`
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 10px;
`

const Title = styled.p`
  font-size: 18px;
  font-family: ${({ theme }) => theme.roboto400};
`

const SelectUi = styled.select`
  padding: 10px;
  font-size: 18px;
  font-family: ${({ theme }) => theme.roboto400};
  border-radius: 5px;
`
