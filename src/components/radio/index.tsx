import type { FC } from 'react';
import { useState, useCallback, useRef, isValidElement, cloneElement } from 'react';
import clsx from 'clsx';
import { IonIosCheckmark } from '@twist-space/react-icons/ion';
import { TiRound } from '@twist-space/react-icons/ti';
import './index.scss';

export interface RadioProps {
  onChange: (checked: boolean) => void;
  checked: boolean;
  defaultChecked: boolean;
  // 图标名称，选中前
  icon: React.ReactNode;
  // 图标名称，选中后
  activeIcon: React.ReactNode;
}

export function useForceUpdate() {
  const [, updateState] = useState();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useCallback(() => updateState({} as any), []);
}


const Radio: FC<
Partial<RadioProps> & Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>
> = (props) => {
  const {
    onChange,
    checked,
    defaultChecked,
    className,
    style
  } = props;
  const _finalValue = false;
  const dfChecked = defaultChecked ? defaultChecked : _finalValue;
  const checkedStateRef = useRef(checked !== undefined ? checked : dfChecked);
  const [, updateState] = useState();
  const setCheckedStatement = (value: boolean) => {
    const prevState = checkedStateRef.current;
    checkedStateRef.current = value;
    if (prevState !== checkedStateRef.current) {
      updateState({} as any);
      onChange && onChange(value);
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
      'radio-icon': !checkedStateRef,
      'icon-checked': checkedStateRef
    };
  };

  const renderIcon = () => {
    const { icon, activeIcon } = props;
    console.log('ref', checkedStateRef)
    if (checkedStateRef.current) {
      return isValidElement(activeIcon) ? (
        cloneElement(activeIcon, {
          ...activeIcon.props,
          className: clsx(color())
        })
      ) : (
        <IonIosCheckmark className={clsx(color())} />
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
    if (checkedStateRef.current) return;
    setCheckedStatement(!checkedStateRef.current);
  }

  return (
    <div
    className={className}
    style={style}
    onClick={handleClick}
    >
      <>
        {renderLabel()}
        {renderIcon()}
      </>
    </div>
  );
};
export default Radio;