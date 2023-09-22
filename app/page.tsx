import Button from '@mui/material/Button';
import { Slider, TextField } from '@mui/material';

export default function Home() {
  return (
    <main>
      <Slider defaultValue={30} />
      <Slider defaultValue={30} className='text-teal-600' />
    </main >
  )
}
