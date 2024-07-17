import type { FC } from 'react';
import { useState, useCallback, isValidElement, cloneElement, useContext } from 'react';
import clsx from 'clsx';
import { TaCircleCheck } from '@twist-space/react-icons/ta';
import { TiRound } from '@twist-space/react-icons/ti';
import { usePropsValue } from '../../hooks';
import RadioContext from '../radiogroup/context'
import RadioGroup from '../radiogroup';
import './index.scss';

export interface RadioProps {
  onChange: (checked: boolean) => void;
  checked: boolean;
  defaultChecked: boolean;
  // 图标名称，选中前
  icon: React.ReactNode;
  // 图标名称，选中后
  activeIcon: React.ReactNode;
  // 配合Group模式使用
  value: string | number;
}

export function useForceUpdate() {
  const [, updateState] = useState();
  return useCallback(() => updateState({} as any), []);
}


const Radio: FC<
Partial<RadioProps> & Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>
> & { Group: typeof RadioGroup } = (props) => {
  const {
    onChange,
    checked,
    defaultChecked,
    className,
    style,
  } = props;
  let [checkedStatement, setCheckedStatement] = usePropsValue<boolean>({
    value: checked,
    defaultValue: defaultChecked,
    finalValue: false,
    onChange
  });

  const context = useContext(RadioContext);
  if (context) {
    // Group的value和radio的value相等说明当前的radio是被选中的状态
    checkedStatement = context.value === props.value;

    setCheckedStatement = (value: boolean) => {
      if (value) {
        context.check(props.value === undefined ? '' : props.value);
      } else {
        context.uncheck();
      }
    }
  }
  const renderLabel = () => {
    return (
      <div className='radio-label'>
        {props.children}
      </div>
    );
  };

  const color = () => {
    return {
      'radio-icon': !checkedStatement,
      'icon-checked': checkedStatement
    };
  };

  const renderIcon = () => {
    const { icon, activeIcon } = props;
    if (checkedStatement) {
      return isValidElement(activeIcon) ? (
        cloneElement(activeIcon, {
          ...activeIcon.props,
          className: clsx(color())
        })
      ) : (
        <TaCircleCheck className={clsx(color())} />
      );
    }

    return isValidElement(icon) ? (
      cloneElement(icon, {
        ...icon.props,
        className: clsx(color())
      })
    ) : (
      <TiRound className={clsx(color())} />
    );
  };

  const handleClick = () => {
    if (checkedStatement) return;
    setCheckedStatement(!checkedStatement);
  }

  return (
    <div
    className={clsx('radio', className)}
    style={style}
    onClick={handleClick}
    >
      <>
        {renderIcon()}
        {renderLabel()}
      </>
    </div>
  );
};

Radio.Group = RadioGroup;
Radio.displayName = 'Radio';

export default Radio;