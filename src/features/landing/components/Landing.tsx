import { SocialMediaBar } from '@/components'
import { Footer } from '@/features/signOutLayout/components/Footer'
import { SignOutTopBar } from '@/features/signOutLayout/components/SignOutTopBar'

import { HeroImage } from './HeroImage'
import { Content } from './Content'
import { Trust } from './Trust'

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
