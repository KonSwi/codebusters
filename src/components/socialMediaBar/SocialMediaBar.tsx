import Link from 'next/link'
import { SOCIAL_LINKS } from '@/features/landing/constants/socialLinks'
import { SocialMediaIconPicker } from './SocialMediaIconPicker'

export const SocialMediaBar = () => {
  return (
    <div className='bg-dark'>
      <div className='container flex justify-end gap-8 py-2.5 pr-10'>
        {SOCIAL_LINKS.map(({ name, href, src, w, h }) => (
          <Link
            key={name}
            href={href}
            aria-label={name}
            target='_blank'
            rel='noreferrer'
            className='inline-flex items-center justify-center rounded-md'
            title={name}
          >
            <SocialMediaIconPicker src={src} alt={name} width={w} height={h} />
          </Link>
        ))}
      </div>
    </div>
  )
}
