import { useState } from 'react';

const [arrString, setArrString] = useState<string[]>([]);

export default function useCompareString(idx: number, value: string) {
    const tempArr = [...arrString];
    tempArr[idx] = value;
    setArrString(tempArr);
}