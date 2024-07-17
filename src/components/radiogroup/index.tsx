import type { FC } from "react";
import { usePropsValue } from "../../hooks";
import RadioContext from './context';

export interface RadioGroupProps {
  // 受控模式，需要依赖父组件的外部状态，配合onChange使用
  value: string | number;
  // 非受控模式，不需要依赖父组件的外部状态
  defaultValue: string | number;
  onChange: (value: string | number) => void;
}

const RadioGroup: FC<
Partial<RadioGroupProps> & Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>
> = (props) => {
  const {
    className,
    style,
    onChange
  } = props;
  const [val2State, setVal2State] = usePropsValue<string | number>({
    value: props.value,
    defaultValue: props.defaultValue,
    finalValue: '',
    onChange,
  });

  return (
    <RadioContext.Provider
      value={{
        value: val2State,
        check: (value: string | number) => {
          setVal2State(value);
        },
        uncheck: () => {
          setVal2State('');
        },
      }}
    >
      <div className={className} style={style}>
        {props.children}
      </div>
    </RadioContext.Provider>
  );
}

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;