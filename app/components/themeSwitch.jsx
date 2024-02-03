'use client';
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import Image from "next/image"

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() =>  setMounted(true), [])

  const handleToggle = () => {
    if (resolvedTheme === 'dark') {
      setTheme('light');
    } else if (resolvedTheme === 'light') {
      setTheme('dark');
    }
  }

  if (!mounted) return (
    <Image
      src="data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=="
      width={36}
      height={36}
      sizes="36x36"
      alt="Loading Light/Dark Toggle"
      priority={false}
      title="Loading Light/Dark Toggle"
    />
  )

  return (
    <label htmlFor="check" className={`relative w-16 h-8 cursor-pointer rounded-full ${resolvedTheme === 'light' ? 'bg-[#dde0e4]' : 'dark:bg-[#303134]'}`}>
      <input type="checkbox" id="check" className="sr-only" onChange={handleToggle} checked={resolvedTheme === 'light'} />
      <span className={`w-2/5 h-4/5 absolute rounded-full duration-500 bg-[#0095ff] ${resolvedTheme === 'light' ? 'left-1 top-[3px]' : 'left-[34px] top-[3px]'}`}></span>
    </label>
  );

}