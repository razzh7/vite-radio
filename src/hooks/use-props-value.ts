import { useRef, useCallback } from 'react'
import { useForceUpdate } from './use-force-update'

interface UsePropsValue<T> {
  value: T;
  defaultValue: T;
  finalValue: T;
  onChange: (value: T) => void;
}

export function usePropsValue<T>({
  value,
  defaultValue,
  finalValue,
  onChange = (_value: T) => {}
}: Partial<UsePropsValue<T>>) {
  const forceUpdate = useForceUpdate();
  const dfValue = (defaultValue !== undefined ? defaultValue : finalValue) as T;
  const stateRef = useRef<T>(value !== undefined ? value : dfValue);

  // 受控模式下修正stateRef.current的value值
  if (value !== undefined) {
    stateRef.current = value;
  }
  const setState = useCallback(
    (v: T) => {
      const prevState = stateRef.current;
      stateRef.current = v;
      if (prevState !== v) {
        forceUpdate();
        onChange && onChange(v);
      }
    },
    [value, onChange]
  );

  return [stateRef.current, setState] as const;
}