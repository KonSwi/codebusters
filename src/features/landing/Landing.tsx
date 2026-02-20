import { SocialMediaBar } from '@/components'
import { Footer } from '@/features/signOutLayout/components/Footer'

import { SignOutTopBar } from '../signOutLayout/components/SignOutTopBar'
import { HeroImage } from './components/HeroImage'
import { Content } from './components/Content'
import { Trust } from './components/Trust'


export const Landing = () => {
  const VIDEO_ID = 'fBGhBP476zE'

  return (
    <>
      <div className='min-h-dvh'>
        <SocialMediaBar />
        <SignOutTopBar />
        <main className='pb-15'>
          <HeroImage />
          <Content variant='videoRight' videoId={VIDEO_ID} />
          <Trust />
        </main>
      </div>
      <Footer />
    </>
  )
}
